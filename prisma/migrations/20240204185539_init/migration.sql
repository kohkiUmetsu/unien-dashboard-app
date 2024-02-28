/*
  Warnings:

  - Added the required column `member` to the `MemberChart` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MemberChart" ADD COLUMN     "member" INTEGER NOT NULL;
