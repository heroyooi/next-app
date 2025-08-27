'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { sendContact } from './actions';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type='submit' className='btn btn--primary' disabled={pending}>
      {pending ? '제출 중…' : '보내기'}
    </button>
  );
}

export default function ContactPage() {
  const [state, formAction] = useActionState(sendContact, {
    ok: false,
    error: null,
  });

  return (
    <main style={{ padding: 24, maxWidth: 520 }}>
      <h1>문의하기</h1>
      <form action={formAction} style={{ display: 'grid', gap: 12 }}>
        <input
          name='name'
          placeholder='이름'
          required
          style={{ padding: 10 }}
        />
        <input
          name='email'
          type='email'
          placeholder='이메일'
          required
          style={{ padding: 10 }}
        />
        <textarea
          name='message'
          placeholder='내용'
          rows={4}
          required
          style={{ padding: 10 }}
        />
        <SubmitButton />
      </form>

      {state.error && (
        <p style={{ color: 'crimson', marginTop: 10 }}>{state.error}</p>
      )}
      {state.ok && (
        <p style={{ color: 'seagreen', marginTop: 10 }}>✅ 전송 완료!</p>
      )}
    </main>
  );
}
