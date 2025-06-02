/*
  Warnings:

  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "email",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "dob" TIMESTAMP(3),
ADD COLUMN     "phone" TEXT;
