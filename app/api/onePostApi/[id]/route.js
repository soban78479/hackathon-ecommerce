import { PrismaClient, Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export const GET = async (request, { params }) => {
  try {
    const { id } = params;
    console.log(id);
    const Post = await prisma.post.findUnique({
      where: {
        id: id,
      },
    });
    if (!Post) {
      return NextResponse.json({
        message: "post not found",
      });
    }
    return NextResponse.json({
      message: "success",
      data: Post,
    });
  } catch (error) {
    console.log("error in fetching post", error);
    return NextResponse.json({
      message: "failed",
      error: error,
    });
  }
};
