import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request) {
  const { user, id, rating,description} = await request.json();
  console.log(user);
  try {
       // Save the post data to the database
    const postRating = await prisma.rating.create({
      data: {
        userId: user,
        postId:id,
        description:description,
        rating:rating
      },
    });

    return NextResponse.json({ message: "Post created successfully", postRating });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
