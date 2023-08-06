import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function POST(request) {
  const { email, password } = await request.json();

  try {
    const user = await prisma.User.findUnique({
      where: {
        email: email,
      },
    });
console.log(email);
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      console.log(passwordMatch)
      if (passwordMatch) {
        const token = await jwt.sign(
          {
            email: user.email,
            password: user.password,
          },
          process.env.secretkey
        );
        return NextResponse.json({ message: "User login successfully", user, token});
      } else {
        return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
      }
    } else {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
    }
  } catch (error) {
    console.error("Error login user:", error);
    return NextResponse.json({ message: "Error in login" }, { status: 500 });
  }
}


// export async function generateToken(email, password) {
//   try {
//     const user = await prisma.User.findUnique({
//       where: {
//         email: email,
//       },
//     });

//     if (user) {
//       const passwordMatch = await bcrypt.compare(password, user.password);

//       if (passwordMatch) {
//         const token = await jwt.sign(
//           {
//             email: user.email,
//             password: user.password,
//           },
//           process.env.secretkey
//         );

//         return token;
//       } else {
//         return null;
//       }
//     } else {
//       return null;
//     }
//   } catch (error) {
//     console.error("Error generating token:", error);
//     return null;
//   }
// }