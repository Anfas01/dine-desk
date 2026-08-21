import { prisma } from "@/lib/prisma";

export async function getAdminReservationStats() {
  const [total, confirmed, cancelled, completed] =
    await Promise.all([
      prisma.tableBooking.count(),
      prisma.tableBooking.count({
        where: {
          status: "CONFIRMED",
        },
      }),
      prisma.tableBooking.count({
        where: {
          status: "CANCELLED",
        },
      }),
      prisma.tableBooking.count({
        where: {
          status: "COMPLETED",
        },
      }),
    ]);

  return {
    total,
    confirmed,
    cancelled,
    completed,
  };
}

export async function getTodayReservations() {
  const now = new Date();

  const startOfDay = new Date(now);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(now);
  endOfDay.setHours(23, 59, 59, 999);

  return prisma.tableBooking.findMany({
    where: {
      bookingDate: {
        gte: startOfDay,
        lte: endOfDay,
      },
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