'use client';

import { useActionState } from 'react';
import { sendContact } from './actions';

export default function ContactPage() {
  // 초기 상태를 함께 전달
  const [state, formAction] = useActionState(sendContact, {
    ok: false,
    error: null,
  });

  return (
    <main style={{ padding: 24, maxWidth: 480 }}>
      <h1>문의하기</h1>

      <form action={formAction} style={{ display: 'grid', gap: 12 }}>
        <input name='name' placeholder='이름' style={{ padding: 8 }} />
        <input
          name='email'
          type='email'
          placeholder='이메일'
          style={{ padding: 8 }}
        />
        <textarea
          name='message'
          placeholder='내용'
          rows={4}
          style={{ padding: 8 }}
        />

        <button type='submit' className='btn btn--primary'>
          보내기
        </button>
      </form>

      {state?.error && <p style={{ color: 'red' }}>{state.error}</p>}
      {state?.ok && <p style={{ color: 'green' }}>✅ 전송 완료!</p>}
    </main>
  );
}
