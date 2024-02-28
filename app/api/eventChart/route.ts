import { NextResponse } from "next/server"
import { main } from "../route"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient

// イベント情報取得

export const GET = async (req: Request, res: NextResponse ) => {
    try {
      await main()
      const eventData = await prisma.eventChart.findMany({
        select: {
          date: true,
          userId: true,
          actual: true,
          expected: true,
        }
      })
      return NextResponse.json({ message: "Success", eventData }, {status: 200})
    } catch (err) {
      console.error('Error in GET method:', err);
      return NextResponse.json({ message: "Error", err }, {status: 500})
    } finally {
      await prisma.$disconnect()
    }
  }

// 投稿用API

export const POST = async (req: Request, res: NextResponse ) => {
    try {
      const { date, expected, actual, userId } = await req.json()

      await main()
      const post = await prisma.eventChart.create({ data: { date, expected, actual, userId } })
      return NextResponse.json({ message: "Success", post }, {status: 201})
    } catch (err) {
      console.error('Error in POST method:', err);
      return NextResponse.json({ message: "Error", err }, {status: 500})
    } finally {
      await prisma.$disconnect()
    }
  }