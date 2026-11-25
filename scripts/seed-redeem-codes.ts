import "dotenv/config";
import { createHash } from "node:crypto";
import { prisma } from "../lib/prisma";

const redeemCodes = [
  { code: "TRYOUT-1BULAN-K7Q9M2", durationDays: 30 },
  { code: "TRYOUT-1BULAN-P4X8N6", durationDays: 30 },
  { code: "TRYOUT-2BULAN-R9T3W5", durationDays: 60 },
  { code: "TRYOUT-2BULAN-H6C2V8", durationDays: 60 },
  { code: "TRYOUT-3BULAN-Z8M4K7", durationDays: 90 },
];

async function main() {
  for (const item of redeemCodes) {
    const normalizedCode = item.code.trim().toUpperCase();

    const codeHash = createHash("sha256").update(normalizedCode).digest("hex");

    await prisma.redeemCode.upsert({
      where: {
        codeHash,
      },
      update: {},
      create: {
        codeHash,
        durationDays: item.durationDays,
        isActive: true,
        expiresAt: null,
      },
    });

    console.log(`Redeem code created: ${item.code}`);
  }

  console.log("Redeem code seeding completed!");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
