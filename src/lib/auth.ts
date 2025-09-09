import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

/**
 * NextAuth (v5) – Credentials simples só para admin do .env
 */
export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "Login",
      credentials: {
        email: { label: "E-mail", type: "text" },
        password: { label: "Senha", type: "password" }
      },
      async authorize(c) {
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPass = process.env.ADMIN_PASSWORD;
        if (!c?.email || !c?.password) return null;
        if (c.email === adminEmail && c.password === adminPass) {
          return { id: "admin", email: c.email, name: "Admin", role: "admin" } as any;
        }
        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = (user as any).role || "reader";
      return token;
    },
    async session({ session, token }) {
      (session as any).user.role = (token as any).role || "reader";
      return session;
    }
  }
});
