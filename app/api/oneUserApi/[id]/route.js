import { PrismaClient, Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export const GET = async (request, { params }) => {
  try {
    const { id } = params;
    console.log(id);
    const User = await prisma.User.findUnique({
      where: {
        id: id,
      },
    });
    if (!User) {
      return NextResponse.json({
        message: "user not found",
      });
    }
    return NextResponse.json({
      message: "success",
      data: User,
    });
  } catch (error) {
    console.log("error in fetching users", error);
    return NextResponse.json({
      message: "failed",
      error: error,
    });
  }
};
