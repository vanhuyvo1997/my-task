import { readFileSync } from "fs";
import NextAuth, { User } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import * as jose from 'jose'

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                const response = await fetch(process.env.MY_TASK_LOGIN_API, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: 'POST',
                    body: JSON.stringify(credentials),
                })

                if (response.ok) {
                    const data = await response.json();
                    const user = await extractUser(data.accessToken);
                    user.refreshToken = data.refreshToken;
                    return user;
                }

                return null
            },
        }),
    ],
    callbacks: {
        jwt({ token, user }) {
            if (user) {
                token.accessToken = user.accessToken;
                token.refreshToken = user.refreshToken;
            }

            return token;
        },
        session({ session, token }) {
            if (session.user) {
                session.user.accessToken = token.accessToken;
                session.user.refreshToken = token.refreshToken;
            }
            return session;
        }
    },
    pages: {
        signIn: '/login',
    },
})



async function extractUser(accessToken: string): Promise<User> {
    let key = readFileSync(process.env.PUBLIC_KEY_FILE).toString();
    let header = jose.decodeProtectedHeader(accessToken);
    const publicKey = await jose.importSPKI(key, header.alg!)
    const { payload } = await jose.jwtVerify<{ id?: string, lastName?: string, firstName?: string, role?: string, img?: string }>(accessToken, publicKey)

    return {
        id: payload.id,
        email: payload.sub,
        accessToken: accessToken,
        role: payload.role,
        name: payload.firstName + " " + payload.lastName,
        image: payload.img,
    }
}
