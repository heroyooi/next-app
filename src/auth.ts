import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';

// v5 권장: AUTH_URL / AUTH_SECRET (NEXTAUTH_*도 함께 있어도 OK)
const authSetup = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  trustHost: true,
  // 필요 시 callback/session 커스터마이징
  callbacks: {
    async session({ session, token }) {
      (session.user as any).role = 'admin';
      // 임시 예시
      return session;
    },
  },
});

// 🔑 여기서 명시적으로 빼서 export (중간 변수 사용이 안전)
export const { handlers, auth, signIn, signOut } = authSetup;

// Route Handler에서 바로 쓸 수 있게 핸들러를 분해 export
export const { GET, POST } = handlers;
