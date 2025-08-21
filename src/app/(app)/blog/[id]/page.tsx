import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';

type PageProps = { params: { id: string } };

const POSTS = [
  {
    id: 'next-101',
    title: 'Next.js란?',
    content: 'App Router 입문 강좌입니다.',
  },
  {
    id: 'routing-quick',
    title: '파일 라우팅 빠르게 훑기',
    content: '세그먼트/중첩/동적/그룹.',
  },
  {
    id: 'scss-setup',
    title: 'SCSS 적용 가이드',
    content: '전역 SCSS + 모듈 SCSS.',
  },
  {
    id: 'metadata-og',
    title: 'Metadata & OG 이미지',
    content: 'generateMetadata 활용',
  },
];

function getPostById(id: string) {
  return POSTS.find((p) => p.id === id) ?? null;
}

export async function generateStaticParams() {
  return POSTS.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const post = getPostById(params.id);
  const title = post?.title ?? `게시글 ${params.id}`;
  const og = `https://og.example.com/api/title?text=${encodeURIComponent(
    title
  )}`;
  return {
    title: `${title} | FE 스쿨 블로그`,
    description: `${title} 상세 페이지`,
    openGraph: {
      title: `${title} | FE 스쿨 블로그`,
      description: `${title} 상세 페이지`,
      images: [{ url: og, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | FE 스쿨 블로그`,
      description: `${title} 상세 페이지`,
      images: [og],
    },
  };
}

const Comments = dynamic(() => import('./_components/Comments'), {
  loading: () => <p>댓글 위젯 로딩 중…</p>,
  // ssr: false, // 필요 시: 서버 렌더 비활성화
});

export default async function BlogDetailPage({ params }: PageProps) {
  // if (params.id === 'fail') {
  //   // 서버 컴포넌트에서 에러를 던져 error.tsx로 흐름 위임
  //   throw new Error('임의 에러 발생: fail 아이디는 허용되지 않습니다.');
  // }
  const post = getPostById(params.id);
  if (!post) return notFound();

  if (!post) {
    return (
      <main style={{ padding: 24 }}>
        <h1>게시글을 찾을 수 없습니다.</h1>
        <small>요청 id: {params.id}</small>
      </main>
    );
  }

  return (
    <main style={{ padding: 24 }}>
      <h2 style={{ marginBottom: 6 }}>{post.title}</h2>
      <small style={{ opacity: 0.7 }}>id: {params.id}</small>
      <p style={{ marginTop: 14, whiteSpace: 'pre-wrap' }}>{post.content}</p>

      {/* 접속 후 한 템포 뒤 로딩 → 초기 번들 부담 완화 */}
      <section style={{ marginTop: 24 }}>
        <Comments postId={params.id} />
      </section>
    </main>
  );
}
