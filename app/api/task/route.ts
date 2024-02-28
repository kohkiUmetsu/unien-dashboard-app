import { NextResponse } from "next/server"
import { main } from "../route"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient

// タスク情報取得
export const GET = async (req: Request, res: NextResponse ) => {
    try {
      await main()
      const tasks = await prisma.task.findMany()
      return NextResponse.json({ message: "Success", tasks }, {status: 200})
    } catch (err) {
      return NextResponse.json({ message: "Error", err }, {status: 500})
    } finally {
      await prisma.$disconnect()
    }
  }

// 投稿用API

export const POST = async (req: Request, res: NextResponse ) => {
    try {
      const { date, description, check, userId } = await req.json()

      await main()
      const post = await prisma.task.create({ data: { userId, date, description, check } })
      return NextResponse.json({ message: "Success", post }, {status: 201})
    } catch (err) {
      console.error('Error in POST method:', err);
      return NextResponse.json({ message: "Internal Server Error", err }, {status: 500})
    } finally {
      await prisma.$disconnect()
    }
  }