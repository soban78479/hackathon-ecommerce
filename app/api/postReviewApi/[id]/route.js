import { PrismaClient, Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET(request,{params}) {
   
    
  try {
    const postId= params;
    console.log(postId);
    let reviews= [];
    // Step 1:Fetch the carts associated with the given userId
     reviews = await prisma.rating.findMany({
      where: {
        postId: postId.id,
      },
    });


    return NextResponse.json({data: reviews });
} catch (error) {
  console.error("Error fetching posts:", error);
  return NextResponse.json({ message: "Internal server error" }, { status: 500 });
}
}

// Call the function with the user ID to fetch the posts
// const userId = "64cf2ca0dfc8b558531cb24a";
// const posts =  fetchPostsForUser(userId);


