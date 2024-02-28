// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient

export async function main() {
  try {
    await prisma.$connect()
  } catch (err) {
    return Error("DB接続に失敗しました")
  }
}

// ユーザー情報取得
export const GET = async (req: Request, res: NextResponse ) => {
  try {
    await main()
    const data = await prisma.user.findMany()
    return NextResponse.json({ message: "Success", data }, {status: 200})
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, {status: 500})
  } finally {
    await prisma.$disconnect()
  }
}