/*
  Warnings:

  - You are about to drop the column `actualNum` on the `EventChart` table. All the data in the column will be lost.
  - You are about to drop the column `expectedNum` on the `EventChart` table. All the data in the column will be lost.
  - You are about to drop the `EventAreaChart` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "EventAreaChart" DROP CONSTRAINT "EventAreaChart_userId_fkey";

-- AlterTable
ALTER TABLE "EventChart" DROP COLUMN "actualNum",
DROP COLUMN "expectedNum";

-- DropTable
DROP TABLE "EventAreaChart";
