'use client';

import { useEffect, useState } from 'react';

export default function Comments({ postId }: { postId: string }) {
  const [list, setList] = useState<string[]>([]);

  useEffect(() => {
    // 실제로는 API 호출
    setTimeout(() => setList(['좋아요!', '유익합니다.']), 400);
  }, [postId]);

  return (
    <div>
      <h3>댓글</h3>
      {list.length === 0 ? <p>불러오는 중…</p> : (
        <ul>{list.map((c, i) => <li key={i}>{c}</li>)}</ul>
      )}
    </div>
  );
}