/*
  Warnings:

  - You are about to drop the column `入サー人数` on the `MemberChart` table. All the data in the column will be lost.
  - Added the required column `member` to the `MemberChart` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MemberChart" DROP COLUMN "入サー人数",
ADD COLUMN     "member" INTEGER NOT NULL;
