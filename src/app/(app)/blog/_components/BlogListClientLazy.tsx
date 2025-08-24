'use client';

import dynamic from 'next/dynamic';
import type { Post } from '../page';

// 스켈레톤(간단)
function Skeleton() {
  return (
    <div style={{ display:'grid', gap:12 }}>
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} style={{
          height: 64, borderRadius: 10, background: 'linear-gradient(90deg,#f3f3f3,#eaeaea,#f3f3f3)',
          animation: 'pulse 1.2s infinite',
        }} />
      ))}
      <style>{`
        @keyframes pulse {
          0% { opacity: .85; } 50% { opacity: .6; } 100% { opacity: .85; }
        }
      `}</style>
    </div>
  );
}

// BlogListClient를 클라이언트에서만 지연 로드
const BlogListClient = dynamic(() => import('./BlogListClient'), {
  loading: () => <Skeleton />,
  ssr: false,
});

export default function BlogListClientLazy({ posts }: { posts: Post[] }) {
  return <BlogListClient posts={posts} />;
}

