import { NextResponse } from "next/server"
import { main } from "../../route"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient

// 削除用API

export const DELETE = async (req: Request, res: NextResponse ) => {
    try {
      const id: number = parseInt(req.url.split("/event/")[1])

      await main()
      const deletePost = await prisma.event.delete({
        where: { id }
      })
      return NextResponse.json({ message: "Success", deletePost }, {status: 200})
    } catch (err) {
      return NextResponse.json({ message: "Error", err }, {status: 500})
    } finally {
      await prisma.$disconnect()
    }
  }