/*
  Warnings:

  - Changed the type of `memberNum` on the `MemberChart` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "MemberChart" DROP COLUMN "memberNum",
ADD COLUMN     "memberNum" INTEGER NOT NULL;
