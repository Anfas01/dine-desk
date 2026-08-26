-- AlterEnum
ALTER TYPE "BookingStatus" ADD VALUE 'PENDING';

-- AlterTable
ALTER TABLE "TableBooking" ALTER COLUMN "status" SET DEFAULT 'PENDING';
