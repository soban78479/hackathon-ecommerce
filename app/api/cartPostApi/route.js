import { PrismaClient, Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function POST(request) {
  // Extract the user ID from the request query parameters
  // const { id } = params;
  // console.log(id);
  const { user,id} = await request.json();
  console.log(id,user);
  try {
    // Use Prisma to find the cart associated with the provided user ID
    const cart = await prisma.cart.create({
      data: {
        userId: String(user), 
        postIds:String(id)// Assuming the user ID is numeric
        // Other fields of the cart, if any
      },
    });

   
    return NextResponse.json({ message: "Post added to cart successfully", cart });
  } catch (error) {
    console.error("Error adding to cart :", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
