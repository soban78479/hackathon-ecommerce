import { PrismaClient, Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function DELETE(request) {
  const { id } = await request.json();
  try {
    await prisma.User.delete({
      where: {
        id
      },
    })
    return NextResponse.json({
      message: "User deleted",
    });
  } catch (error) {
    console.log("error in deleting users", error);
    return NextResponse.json({
      message: "failed",
      error: error,
    });
  }
}
