"use server";

import { redirect } from "next/navigation";
import { registerSchema, loginSchema } from "@/lib/validations/auth.schema";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";

export type RegisterState = {
  error?: string;
  success?: string;
};

export async function registerAction(
  _prevState: RegisterState,
  formData: FormData,
): Promise<RegisterState> {
  const validatedFields = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.issues[0]?.message ?? "Data tidak valid",
    };
  }

  const { name, email, password } = validatedFields.data;

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email: email.toLowerCase(),
    password,
    options: {
      data: {
        name,
      },
    },
  });

  if (error) {
    return {
      error: error.message,
    };
  }

  if (!data.user) {
    return {
      error: "Gagal membuat akun. Silakan coba lagi.",
    };
  }

  try {
    await prisma.$transaction([
      prisma.user.upsert({
        where: {
          id: data.user.id,
        },
        update: {
          email: email.toLowerCase(),
        },
        create: {
          id: data.user.id,
          email: email.toLowerCase(),
        },
      }),

      prisma.userProfile.upsert({
        where: {
          userId: data.user.id,
        },
        update: {
          name,
        },
        create: {
          userId: data.user.id,
          name,
        },
      }),
    ]);
  } catch (error) {
    console.error("Register database error:", error);

    return {
      error:
        "Akun autentikasi berhasil dibuat, tetapi profil gagal disimpan. Silakan hubungi administrator.",
    };
  }

  if (!data.session) {
    return {
      success:
        "Akun berhasil dibuat. Silakan periksa email untuk menyelesaikan verifikasi.",
    };
  }

  redirect("/dashboard");
}

export async function loginAction(
  _prevState: RegisterState,
  formData: FormData,
): Promise<RegisterState> {
  const validatedFields = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.issues[0]?.message ?? "Data tidak valid",
    };
  }

  const { email, password } = validatedFields.data;

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: email.toLowerCase(),
    password,
  });

  if (error) {
    console.error("Supabase Login Error:", {
      message: error.message,
      code: error.code,
      status: error.status,
    });

    return {
      error: error.message,
    };
  }

  redirect("/dashboard");
}

export async function logoutAction() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Logout Error:", error.message);
  }

  redirect("/login");
}
