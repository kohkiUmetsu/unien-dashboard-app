/*
  Warnings:

  - Added the required column `actualNum` to the `EventChart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expectedNum` to the `EventChart` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EventChart" ADD COLUMN     "actualNum" INTEGER NOT NULL,
ADD COLUMN     "expectedNum" INTEGER NOT NULL;
