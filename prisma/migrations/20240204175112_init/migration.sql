/*
  Warnings:

  - You are about to drop the column `member` on the `MemberChart` table. All the data in the column will be lost.
  - Added the required column `memberNum` to the `MemberChart` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MemberChart" DROP COLUMN "member",
ADD COLUMN     "memberNum" INTEGER NOT NULL;
