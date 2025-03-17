-- AlterTable
ALTER TABLE "User" ADD COLUMN     "passwordResetToken" TEXT,
ADD COLUMN     "passwordResetTokenExp" TIMESTAMP(3);
