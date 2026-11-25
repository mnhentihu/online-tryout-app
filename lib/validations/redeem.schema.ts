import { z } from "zod";

export const redeemSchema = z.object({
  code: z
    .string()
    .trim()
    .min(1, "Kode redeem wajib diisi.")
    .max(100, "Kode redeem tidak valid."),
});

export type RedeemInput = z.infer<typeof redeemSchema>;
