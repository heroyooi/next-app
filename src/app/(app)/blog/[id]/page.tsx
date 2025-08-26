import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import CoverImage from '../_components/CoverImage';

type PageProps = { params: { id: string } };
type Post = { id: string; title: string; content: string; cover?: string };
const MAP: Record<string, Post> = {
  'next-101': {
    id: 'next-101',
    title: 'Next.js란?',
    content: 'App Router 입문 강좌입니다.',
  },
  'routing-quick': {
    id: 'routing-quick',
    title: '파일 라우팅 빠르게 훑기',
    content: '세그먼트/중첩/동적 라우팅.',
  },
  'scss-setup': {
    id: 'scss-setup',
    title: 'SCSS 적용 가이드',
    content: '전역 SCSS + 모듈 SCSS.',
  },
};

export async function generateStaticParams() {
  return Object.keys(MAP).map((id) => ({ id }));
}

// 라우트 파일 전체에 ISR 적용 (선택)
// export const revalidate = 60;

export default function BlogDetailPage({ params }: PageProps) {
  // 실제로는 fetch + revalidate/tags 조합
  const post = MAP[params.id];
  if (!post) return notFound();

  return (
    <main style={{ padding: 24 }}>
      <h2 style={{ marginBottom: 6 }}>{post.title}</h2>
      <small style={{ opacity: 0.7 }}>id: {params.id}</small>
      <p style={{ marginTop: 14, whiteSpace: 'pre-wrap' }}>{post.content}</p>
    </main>
  );
}
