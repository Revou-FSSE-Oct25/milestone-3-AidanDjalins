import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { SessionUser, User } from "@/types/product";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;    
                }

                try {
                    // fetch user from platzi
                    const response = await fetch("https://api.escuelajs.co/api/v1/users")
                    const users: User[] = await response.json();

                    // find user with matching credentials
                    const user = users.find(
                        (u) =>
                            u.email == credentials.email && 
                            u.password == credentials.password  
                    );

                    if (user) {
                        return {
                            id: user.id.toString(),
                            email: user.email,
                            name: user.name,
                            role: user.role,
                            image: user.avatar
                        };
                    }

                    return null;
                } catch (error) {
                    console.error("Auth error", error);
                    return null;
                }
            },  
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = (user as SessionUser).role;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as SessionUser).role = token.role as "admin" | "customer";
            }
            return session;
        },
    },
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt",
    },
}); 

export { handler as GET, handler as POST };