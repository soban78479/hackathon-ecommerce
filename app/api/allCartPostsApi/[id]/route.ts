import { PrismaClient, Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET(request,{params}) {
   
    
  try {
    const userId= params;
    console.log(userId);
    // Step 1:Fetch the carts associated with the given userId
    const carts = await prisma.cart.findMany({
      where: {
        userId: userId.id,
      },
    });

    // Step 2: Extract the postIds from each cart
    const postIds = carts.map((cart) => cart.postIds);
    let posts = []
    // Step 3: Fetch all posts that match the extracted postIds
     posts = await prisma.post.findMany({
      where: {
        id: {
          in: postIds,
        },
      },
    });

    return NextResponse.json({data: posts });
} catch (error) {
  console.error("Error fetching posts:", error);
  return NextResponse.json({ message: "Internal server error" }, { status: 500 });
}
}

// Call the function with the user ID to fetch the posts
// const userId = "64cf2ca0dfc8b558531cb24a";
// const posts =  fetchPostsForUser(userId);


