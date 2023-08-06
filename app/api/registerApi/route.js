import { PrismaClient, Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(request) {
  const { email, password, name } = await request.json();

  try { 
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
   const user = await prisma.user.create({
    data :{
      name,
      email,
      password:hashedPassword
    },
  })
    return NextResponse.json({ message: "User created successfully", user});
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ message: "Internal server error"}, { status: 500 });
  }
}