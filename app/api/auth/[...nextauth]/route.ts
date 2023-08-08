import { PrismaClient, Prisma } from "@prisma/client";
import { compare } from 'bcrypt'
import NextAuth, { type NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
const prisma = new PrismaClient();
export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt'
  },
  providers: [
    CredentialsProvider({
      name: 'email',
      credentials: {
        image: {
          // Add custom style for the "image" field
          label: " ",
          type: "image",
          src: "/icons8-user-100.png",
          style: {
            width: "90px", // Set the desired width for the image
            height: "80px", // Set the desired height for the image
            border:"none",
            marginLeft:"100px"
          },
        },
        LoginHeading:{
          label: ' ',
          readonly:true,
          value:"Login your account",
          style: {
           border:"none",
           marginTop: "10px",
           textAlign: "center",
           fontSize:'1.5rem',
           fontWeight: "bold",
           fontbold:'700',
           color: "#000000",
          },
        },
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'hello@example.com',
          style: {
          inputFocus:{
              borderColor:"red",
            }
           },
        },
        password: { 
          label: 'Password',
           type: 'password',
        }
      },
      async authorize(credentials) {

        if (!credentials?.email || !credentials.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        })

        if (!user) {
          return null
        }

        const isPasswordValid = await compare(
          credentials.password,
          user.password
        )

        if (!isPasswordValid) {
          return null
        }
        // if (user) {
        //   alert('Sign-in successful!');
        // }
        return {
          id: user.id + '',
          email: user.email,
          name: user.name,
          randomKey: 'Hey cool'
        }
      }
    })
  ],
  callbacks: {
    session: ({ session, token }) => {
      console.log('Session Callback', { session, token })
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          randomKey: token.randomKey
        }
      }
    },
    jwt: ({ token, user }) => {
      console.log('JWT Callback', { token, user })
      if (user) {
        const u = user as unknown as any
        return {
          ...token,
          id: u.id,
          randomKey: u.randomKey
        }
      }
      return token
    }
  }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }