// Client Component
'use client';
import type { Session } from 'next-auth';
import { signIn, signOut } from 'next-auth/react';

export default function UserMenu({ session }: { session: Session | null }) {
  if (!session) {
    return (
      <button onClick={() => signIn('github')} className="btn btn--primary">
        로그인
      </button>
    );
  }
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <span>{session.user?.name}</span>
      <button onClick={() => signOut()} className="btn">
        로그아웃
      </button>
    </div>
  );
}
