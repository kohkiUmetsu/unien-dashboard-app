import { NextResponse } from "next/server"
import { main } from "../route"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient

// ユーザー情報取得
export const GET = async (req: Request, res: NextResponse ) => {
    try {
      await main()
      const fees = await prisma.fee.findMany()
      return NextResponse.json({ message: "Success", fees }, {status: 200})
    } catch (err) {
      return NextResponse.json({ message: "Error", err }, {status: 500})
    } finally {
      await prisma.$disconnect()
    }
  }

// 投稿用API

export const POST = async (req: Request, res: NextResponse ) => {
    try {
      const { inputFee, inputPeople, feeResult, userId } = await req.json()

      await main()
      const post = await prisma.fee.create({ data: { inputFee, inputPeople, feeResult, userId } })
      return NextResponse.json({ message: "Success", post }, {status: 201})
    } catch (err) {
      return NextResponse.json({ message: "Error", err }, {status: 500})
    } finally {
      await prisma.$disconnect()
    }
  }