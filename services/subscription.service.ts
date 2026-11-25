import { prisma } from "@/lib/prisma";

export async function getActiveSubscription(userId: string) {
  const now = new Date();

  return prisma.subscription.findFirst({
    where: {
      userId,
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
}

export async function hasActiveSubscription(userId: string) {
  const subscription = await getActiveSubscription(userId);

  return Boolean(subscription);
}
