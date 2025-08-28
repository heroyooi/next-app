import { auth, signOut } from '@/auth';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/dashboard');
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>대시보드</h1>
      <p>안녕하세요, {session.user?.name ?? '사용자'} 님</p>

      <form
        action={async () => {
          'use server';
          await signOut();
        }}
      >
        <button className="btn">로그아웃</button>
      </form>
    </main>
  );
}
