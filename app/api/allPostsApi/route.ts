import { PrismaClient, Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    let posts = []
  posts = await prisma.post.findMany();
  return NextResponse.json({
    message: "success",
    data: posts,
  });
} catch (error) {
  console.log("error in fetching posts", error);
  return NextResponse.json({
    message: "failed",
    error: error,
    data: [],
  });
} 
 
}

