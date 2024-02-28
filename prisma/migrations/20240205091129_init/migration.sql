/*
  Warnings:

  - You are about to drop the column `参加した人数` on the `EventChart` table. All the data in the column will be lost.
  - You are about to drop the column `参加予定人数` on the `EventChart` table. All the data in the column will be lost.
  - Added the required column `actual` to the `EventChart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expected` to the `EventChart` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EventChart" DROP COLUMN "参加した人数",
DROP COLUMN "参加予定人数",
ADD COLUMN     "actual" INTEGER NOT NULL,
ADD COLUMN     "expected" INTEGER NOT NULL;
