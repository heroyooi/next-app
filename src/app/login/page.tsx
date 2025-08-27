'use client';

import { signIn } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function LoginPage() {
  const { data: session, status } = useSession(); // "loading" | "authenticated" | "unauthenticated"

  if (status === 'loading')
    return (
      <main style={{ padding: 24 }}>
        <p>로딩 중…</p>
      </main>
    );

  if (status === 'authenticated') {
    return (
      <main style={{ padding: 24 }}>
        <h1>이미 로그인됨</h1>
        <p>안녕하세요, {session.user?.name}</p>
        <p>
          <Link href="/dashboard">대시보드로 이동</Link>
        </p>
      </main>
    );
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>로그인</h1>
      <button className="btn btn--primary" onClick={() => signIn('github')}>
        GitHub로 로그인
      </button>
    </main>
  );
}
