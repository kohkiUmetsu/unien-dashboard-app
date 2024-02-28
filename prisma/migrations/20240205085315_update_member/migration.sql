/*
  Warnings:

  - You are about to drop the column `members` on the `MemberChart` table. All the data in the column will be lost.
  - Added the required column `member` to the `MemberChart` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MemberChart" RENAME COLUMN "members" TO "member";
