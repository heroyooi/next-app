import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';

// 필요 시 DBAdapter, callbacks 등 추가
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  // session: { strategy: "jwt" }, // 필요 시
  // callbacks: { async jwt({ token, account, profile }) { ... }; async session({ session, token }) { ... } }
});
