import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';

type PageProps = { params: Promise<{ id: string }> };

const MAP = {
  'next-101': { title: 'Next.js란?', content: 'App Router 입문 강좌입니다.' },
  'routing-quick': {
    title: '파일 라우팅 빠르게 훑기',
    content: '세그먼트/중첩/동적.',
  },
  'scss-setup': { title: 'SCSS 적용 가이드', content: '전역/모듈 SCSS.' },
};

// 댓글 폼은 클라이언트 컴포넌트 → 필요 시 지연 로드
const CommentForm = dynamic(() => import('./_components/CommentForm'), {
  loading: () => <p>댓글 UI 로딩 중…</p>,
  // ssr: false,
});

export default async function BlogDetailPage({ params }: PageProps) {
  const { id } = await params;
  const post = MAP[id as keyof typeof MAP];
  if (!post) return notFound();

  return (
    <main style={{ padding: 24 }}>
      <h2>{post.title}</h2>
      <p style={{ marginTop: 12 }}>{post.content}</p>
      <CommentForm postId={id} />
    </main>
  );
}
