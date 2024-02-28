/*
  Warnings:

  - You are about to drop the column `actual` on the `EventChart` table. All the data in the column will be lost.
  - Added the required column `actualNum` to the `EventChart` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EventChart" RENAME COLUMN "actual" TO "actualNum";