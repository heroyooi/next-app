import { auth, signOut } from '@/auth';
import Link from 'next/link';

export default async function DashboardPage() {
  const session = await auth(); // ✅ 서버에서 세션 확인
  // 미들웨어가 막아주므로 여기선 세션이 있다고 가정해도 됨

  return (
    <main style={{ padding: 24 }}>
      <h1>대시보드</h1>
      <p>안녕하세요, {session?.user?.name ?? '사용자'} 님</p>
      <form
        action={async () => {
          'use server';
          await signOut();
        }}
      >
        <button className="btn">로그아웃</button>
      </form>
      <p style={{ marginTop: 12 }}>
        <Link href="/">홈으로</Link>
      </p>
    </main>
  );
}
