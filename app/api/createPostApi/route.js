import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

const prisma = new PrismaClient();

export async function POST(request) {
  const { title,category,price,color,size, description, image,user} = await request.json();
  try {
    // Save the image to the server (optional, you can skip this step if not needed)
    const imageData = image ? Buffer.from(image, "base64") : null;
    const imageName = Date.now() + ".jpg"; // You can use a unique name here
    const imagePath = path.join("uploads", imageName); // Change the imagePath format here

    if (imageData) {
      const fullPath = path.join(process.cwd(), "public", imagePath);
      await fs.promises.mkdir(path.dirname(fullPath), { recursive: true });
      await fs.promises.writeFile(fullPath, imageData);
    }

    // Save the post data to the database
    const post = await prisma.post.create({
      data: {
        title,
        category,
        price: parseFloat(price), 
          color,
          size,
        description,
        image: `/${imagePath}`,// Change the image path format here
        user
      },
    });

    return NextResponse.json({ message: "Post created successfully", post });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
