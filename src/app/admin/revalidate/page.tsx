'use client';

import { useState } from 'react';

export default function RevalidatePage() {
  const [msg, setMsg] = useState('');

  const revalidate = async () => {
    setMsg('요청 중…');
    const r = await fetch('/api/revalidate', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ tag: 'posts' }),
    }).then((r) => r.json());
    setMsg(JSON.stringify(r));
  };

  return (
    <main style={{ padding: 24 }}>
      <h1>Revalidate</h1>
      <button className='btn btn--primary' onClick={revalidate}>
        posts 태그 즉시 갱신
      </button>
      <p style={{ marginTop: 12 }}>{msg}</p>
    </main>
  );
}
