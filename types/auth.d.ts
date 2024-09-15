import NextAuth from "next-auth"
import { DefaultJWT } from "next-auth/jwt"

declare module "next-auth" {
    interface User {
        accessToken: string
        refreshToken: string
        role: 'USER' | 'ADMIN'
        expires_at: number
    }

    interface Session {
        error?: "RefreshAccessTokenError"
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        accessToken: string
        refreshToken: string
        role: 'USER' | 'ADMIN',
        expires_at: number
        error?: "RefreshAccessTokenError"
    }
}