import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                const response = await fetch('https://a8025dac-e97f-4b23-a884-4d6442f85827.mock.pstmn.io/api/authentication/login', {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: 'POST',
                    body: JSON.stringify(credentials),
                })

                if (response.ok) {
                    const data = await response.json();
                    return {
                        id: data.id,
                        email: data.email,
                        name: data.name,
                        image: data.image,
                        accessToken: data.accessToken,
                        refreshToken: data.refreshToken,
                        role: data.role,
                    }
                } else return null
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