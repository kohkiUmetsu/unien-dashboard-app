import { NextResponse } from "next/server"
import { main } from "../../route"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient

// 削除用API

export const DELETE = async (req: Request, res: NextResponse ) => {
    try {
        console.log(req.url)
      const id: number = parseInt(req.url.split("/task/")[1])

      await main()
      const deletePost = await prisma.task.delete({
        where: { id }
      })
      return NextResponse.json({ message: "Success", deletePost }, {status: 200})
    } catch (err) {
      return NextResponse.json({ message: "Error", err }, {status: 500})
    } finally {
      await prisma.$disconnect()
    }
  }