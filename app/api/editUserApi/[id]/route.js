import { PrismaClient, Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const PUT = async (request, { params }) => {
  try {
    const { id } = params;
    const { email, password } = await request.json();
    
    const updatedUser = await prisma.User.update({
      where: {
        id: id,
      },
      data: {
        email: email,
        password: password,
      },
    });
    
    return NextResponse.json({
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({
      message: "Internal server error",
      error: error,
    }, { status: 500 });
  }
};
