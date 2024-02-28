import { NextResponse } from "next/server"
import { main } from "../route"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient

// メンバー情報取得
export const GET = async (req: Request, res: NextResponse ) => {
    try {
      await main()
      const memberData = await prisma.memberChart.findMany({
        select: {
          userId: true,
          year: true,
          member: true,
        }
      })
      return NextResponse.json({ message: "Success", memberData }, {status: 200})
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
      const { userId, year, member } = await req.json()

      await main()
      const post = await prisma.memberChart.create({ data: { userId, year, member } })
      return NextResponse.json({ message: "Success", post }, {status: 201})
    } catch (err) {
      console.error('Error in POST method:', err);
      return NextResponse.json({ message: "Error", err }, {status: 500})
    } finally {
      await prisma.$disconnect()
    }
  }