import { readFileSync } from "fs";
import NextAuth, { User } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import * as jose from 'jose'
import { JWT } from "next-auth/jwt";

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
        async jwt({ token, user }): Promise<JWT> {
            if (user) {
                return {
                    ...token,
                    accessToken: user.accessToken,
                    refreshToken: user.refreshToken,
                    role: user.role,
                    expires_at: user.expires_at,
                }
            } else if (Date.now() / 1000 < token.expires_at) {
                return token;
            } else {
                try {
                    const response = await fetch(process.env.MY_TASK_REFRESH_TOKEN, {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ refreshToken: token.refreshToken }),
                    });

                    const newTokens = await response.json();

                    if (!response.ok) throw newTokens;

                    const expiresAt = await getExpireDate(newTokens.accessToken);

                    return {
                        ...token,
                        accessToken: newTokens.accessToken,
                        refreshToken: newTokens.refreshToken,
                        expires_at: expiresAt,
                    }
                } catch (error) {
                    console.error("Error refreshing access token", error);
                    return { ...token, error: "RefreshAccessTokenError" as const }
                }
            }
        },
        session({ session, token }) {
            if (session.user) {
                session.user.accessToken = token.accessToken;
                session.user.refreshToken = token.refreshToken;
                session.user.role = token.role;
            }
            session.error = token.error;
            return session;
        }
    },
    pages: {
        signIn: '/login',
    },
})

async function getPayload(accessToken: string) {
    let key = readFileSync(process.env.PUBLIC_KEY_FILE).toString();
    let header = jose.decodeProtectedHeader(accessToken);
    const publicKey = await jose.importSPKI(key, header.alg!)
    return jose.jwtVerify<{ id: string, lastName: string, firstName: string, role: 'ADMIN' | 'USER', img: string, expires_at: number }>(accessToken, publicKey);
}

async function extractUser(accessToken: string): Promise<User> {
    const { payload } = await getPayload(accessToken);
    return {
        id: payload.id,
        email: payload.sub,
        accessToken: accessToken,
        role: payload.role,
        name: payload.firstName + " " + payload.lastName,
        image: payload.img,
        expires_at: payload.exp!,
        refreshToken: '',
    }
}
async function getExpireDate(accessToken: string) {
    const result = jose.decodeJwt(accessToken).exp;
    return result ?? Date.now() / 1000;
}

