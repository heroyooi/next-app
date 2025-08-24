import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';

type PageProps = { params: { id: string } };
type Post = { id: string; title: string; content: string };

const POSTS: Post[] = [
  { id: 'next-101', title: 'Next.js란?', content: 'App Router 입문 강좌입니다.' },
  { id: 'routing-quick', title: '파일 라우팅 빠르게 훑기', content: '세그먼트/중첩/동적/그룹.' },
  { id: 'scss-setup', title: 'SCSS 적용 가이드', content: '전역 SCSS + 모듈 SCSS.' },
];

function getPostById(id: string) {
  return POSTS.find((p) => p.id === id) ?? null;
}

export async function generateStaticParams() {
  return POSTS.map((p) => ({ id: p.id }));
}

async function getPost(id: string): Promise<Post | null> {
  // 과제 1: slow일 때 1.2초 지연
  if (id === 'slow') {
    await new Promise((r) => setTimeout(r, 1200));
    // 예시용 콘텐츠
    return { id, title: '느린 글(slow) 테스트', content: 'loading.tsx 스트리밍 확인용' };
  }
  const post = POSTS.find(p => p.id === id);
  return post ?? null;
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
  try {
    // 예시: 특정 id에서 의도적 실패 유발
    if (params.id === 'fail' || params.id === 'error' || params.id === 'fail-fetch') {
      throw new Error('데이터를 불러오지 못했습니다.');
    }

    const post = await getPost(params.id);
    if (!post) return notFound();

    return (
      <main style={{ padding: 24 }}>
        <h2 style={{ marginBottom: 6 }}>{post.title}</h2>
        <small style={{ opacity: .7 }}>id: {params.id}</small>
        <p style={{ marginTop: 14, whiteSpace: 'pre-wrap' }}>{post.content}</p>
      </main>
    );
  } catch (e) {
    // 에러 바운더리로 전달
    throw e instanceof Error ? e : new Error('데이터를 불러오지 못했습니다.');
  }
}

