import { NextResponse } from "next/server"
import { main } from "../route"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient

// イベント情報取得
export const GET = async (req: Request, res: NextResponse ) => {
    try {
      await main()
      const events = await prisma.event.findMany()
      return NextResponse.json({ message: "Success", events }, {status: 200})
    } catch (err) {
      return NextResponse.json({ message: "Error", err }, {status: 500})
    } finally {
      await prisma.$disconnect()
    }
  }

// 投稿用API

export const POST = async (req: Request, res: NextResponse ) => {
    try {
      const { date, description, title, people, fee, place, userId } = await req.json()

      await main()
      const post = await prisma.event.create({ data: { date, description, title, people, fee, place, userId } })
      return NextResponse.json({ message: "Success", post }, {status: 201})
    } catch (err) {
      console.error('Error in POST method:', err);
      return NextResponse.json({ message: "Error", err }, {status: 500})
    } finally {
      await prisma.$disconnect()
    }
  }