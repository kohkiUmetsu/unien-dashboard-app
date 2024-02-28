/*
  Warnings:

  - You are about to drop the column `member` on the `MemberChart` table. All the data in the column will be lost.
  - You are about to drop the column `memberNum` on the `MemberChart` table. All the data in the column will be lost.
  - Added the required column `members` to the `MemberChart` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MemberChart" DROP COLUMN "member",
DROP COLUMN "memberNum",
ADD COLUMN     "members" INTEGER NOT NULL;
