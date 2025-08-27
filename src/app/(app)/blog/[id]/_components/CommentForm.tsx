'use client';

import { useActionState, useOptimistic, useState } from 'react';
import { addComment } from '../actions';

export default function CommentForm({ postId }: { postId: string }) {
  const [serverList, formAction] = useActionState(
    addComment.bind(null, postId),
    [] as string[]
  );
  const [list, setList] = useState<string[]>([]);
  const [optimistic, addOptimistic] = useOptimistic(
    list,
    (state, c: string) => [...state, c]
  );

  // 서버 상태가 갱신되면 로컬에도 반영
  if (serverList !== list) setList(serverList);

  return (
    <section style={{ marginTop: 20 }}>
      <h3>댓글</h3>
      {optimistic.length === 0 ? (
        <p>아직 댓글이 없습니다.</p>
      ) : (
        <ul>
          {optimistic.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
      )}

      <form
        action={(fd) => {
          const c = fd.get('comment')?.toString().trim() ?? '';
          if (!c) return;
          addOptimistic(c); // ✅ 낙관적 반영
          return formAction(fd); // 서버 액션
        }}
        style={{ display: 'flex', gap: 8, marginTop: 8 }}
      >
        <input
          name='comment'
          placeholder='댓글 입력'
          style={{ flex: 1, padding: 8 }}
        />
        <button className='btn'>등록</button>
      </form>
    </section>
  );
}
