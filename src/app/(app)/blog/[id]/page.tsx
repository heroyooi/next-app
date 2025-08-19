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
];

// ✅ 빌드 시 프리렌더링할 동적 경로 목록
export async function generateStaticParams() {
  return POSTS.map((p) => ({ id: p.id }));
}

export default async function BlogDetailPage({ params }: PageProps) {
  const post = POSTS.find((p) => p.id === params.id);

  if (!post) {
    // 6회차에서 not-found.tsx로 개선 예정
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
    </main>
  );
}
