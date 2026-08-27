import { prisma } from "@/lib/prisma";

export async function getAdminReservationStats() {
  const [total, groupedCounts] = await Promise.all([
    prisma.tableBooking.count(),
    prisma.tableBooking.groupBy({
      by: ["status"],
      _count: {
        _all: true,
      },
    }),
  ]);

  const countsByStatus = groupedCounts.reduce(
    (acc, group) => {
      acc[group.status] = group._count._all;
      return acc;
    },
    {} as Record<string, number>
  );

  return {
    total,
    pending: countsByStatus["PENDING"] ?? 0,
    confirmed: countsByStatus["CONFIRMED"] ?? 0,
    cancelled: countsByStatus["CANCELLED"] ?? 0,
    completed: countsByStatus["COMPLETED"] ?? 0,
  };
}

const RESTAURANT_TIME_ZONE = "Asia/Kolkata";

export async function getTodayReservations() {
  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: RESTAURANT_TIME_ZONE,
  }).format(new Date());

  return prisma.tableBooking.findMany({
    where: {
      bookingDate: today,
    },

    orderBy: {
      startTime: "asc",
    },

    select: {
      id: true,
      bookingDate: true,
      startTime: true,
      endTime: true,
      guests: true,
      status: true,

      table: {
        select: {
          number: true,
        },
      },

      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });
}

export async function getAllReservations() {
  return prisma.tableBooking.findMany({
    orderBy: {
      startTime: "desc",
    },
    select: {
      id: true,
      bookingDate: true,
      startTime: true,
      endTime: true,
      guests: true,
      status: true,
      table: {
        select: {
          number: true,
          capacity: true,
        },
      },
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });
}