-- CreateTable
CREATE TABLE "EventAreaChart" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "date" TEXT NOT NULL,
    "expected" INTEGER NOT NULL,
    "actual" INTEGER NOT NULL,

    CONSTRAINT "EventAreaChart_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EventAreaChart" ADD CONSTRAINT "EventAreaChart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
