import NextAuth from "next-auth"
import { DefaultJWT } from "next-auth/jwt"

declare module "next-auth" {
    interface User {
        accessToken: string
        refreshToken: string
        role: string
        expires_at: number
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        accessToken: string
        refreshToken: string
        expires_at: number
    }
}