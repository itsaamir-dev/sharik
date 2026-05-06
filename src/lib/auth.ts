import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize(credentials) {
                const adminEmail = process.env.ADMIN_EMAIL;
                const adminPassword = process.env.ADMIN_PASSWORD;

                if (!credentials?.email || !credentials?.password) return null;
                if (credentials.email !== adminEmail) return null;
                if (credentials.password !== adminPassword) return null;

                return { id: "1", email: adminEmail!, name: "Admin" };
            },
        }),
    ],
    pages: {
        signIn: "/admin/login",
    },
    session: { strategy: "jwt" },
    secret: process.env.NEXTAUTH_SECRET,
});
