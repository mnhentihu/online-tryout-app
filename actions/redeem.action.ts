"use server";

import { createHash } from "node:crypto";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { redeemSchema } from "@/lib/validations/redeem.schema";

export type RedeemState = {
  status: "idle" | "success" | "error";
  message: string;
};

export async function redeemAction(
  _prevState: RedeemState,
  formData: FormData,
): Promise<RedeemState> {
  // 1. Validasi input
  const parsed = redeemSchema.safeParse({
    code: formData.get("code"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0].message,
    };
  }

  // 2. Pastikan pengguna sudah login
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      status: "error",
      message: "Silakan login terlebih dahulu.",
    };
  }

  // 3. Normalisasi dan hash kode
  const normalizedCode = parsed.data.code.replace(/\s+/g, "").toUpperCase();

  const codeHash = createHash("sha256").update(normalizedCode).digest("hex");

  const now = new Date();

  try {
    // 4. Cari kode redeem
    const redeemCode = await prisma.redeemCode.findUnique({
      where: {
        codeHash,
      },
    });

    if (!redeemCode) {
      return {
        status: "error",
        message: "Kode redeem tidak ditemukan.",
      };
    }

    if (!redeemCode.isActive) {
      return {
        status: "error",
        message: "Kode redeem sudah tidak aktif.",
      };
    }

    if (redeemCode.usedAt) {
      return {
        status: "error",
        message: "Kode redeem sudah pernah digunakan.",
      };
    }

    if (redeemCode.expiresAt && redeemCode.expiresAt <= now) {
      return {
        status: "error",
        message: "Kode redeem sudah kedaluwarsa.",
      };
    }

    if (redeemCode.durationDays <= 0) {
      return {
        status: "error",
        message: "Durasi kode redeem tidak valid.",
      };
    }

    // 5. Proses redeem dalam satu transaksi
    await prisma.$transaction(async (tx) => {
      // Cari subscription yang masih aktif
      const activeSubscription = await tx.subscription.findFirst({
        where: {
          userId: user.id,
          startsAt: {
            lte: now,
          },
          endsAt: {
            gt: now,
          },
        },
        orderBy: {
          endsAt: "desc",
        },
      });

      // Jika masih aktif, perpanjangan dimulai setelah masa aktif berakhir
      const startsAt = activeSubscription?.endsAt ?? now;

      const endsAt = new Date(startsAt);
      endsAt.setDate(endsAt.getDate() + redeemCode.durationDays);

      // Klaim kode secara atomic agar tidak digunakan dua kali
      const claimedCode = await tx.redeemCode.updateMany({
        where: {
          id: redeemCode.id,
          usedAt: null,
          isActive: true,
          OR: [{ expiresAt: null }, { expiresAt: { gt: now } }],
        },
        data: {
          usedAt: now,
        },
      });

      if (claimedCode.count !== 1) {
        throw new Error("REDEEM_CODE_UNAVAILABLE");
      }

      // Buat subscription baru
      await tx.subscription.create({
        data: {
          userId: user.id,
          redeemCodeId: redeemCode.id,
          startsAt,
          endsAt,
        },
      });
    });

    // 6. Refresh halaman yang bergantung pada status premium
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/subscription");
    revalidatePath("/dashboard/materi");
    revalidatePath("/dashboard/tryout");

    return {
      status: "success",
      message: `Berhasil! Langganan premium aktif selama ${redeemCode.durationDays} hari.`,
    };
  } catch (error) {
    if (error instanceof Error && error.message === "REDEEM_CODE_UNAVAILABLE") {
      return {
        status: "error",
        message: "Kode redeem sudah digunakan atau tidak lagi tersedia.",
      };
    }

    console.error("Redeem Error:", error);

    return {
      status: "error",
      message: "Terjadi kesalahan saat memproses redeem. Silakan coba lagi.",
    };
  }
}
