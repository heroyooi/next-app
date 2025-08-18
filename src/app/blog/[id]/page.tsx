import GoToListButton from '../_components/GoToListButton';

type PageProps = { params: { id: string } };

async function getPostById(id: string) {
  const map: Record<string, { title: string; content: string }> = {
    'next-101': { title: 'Next.js란?', content: 'App Router로 배우는 입문 강좌입니다.' },
    'routing-quick': { title: '파일 라우팅 빠르게 훑기', content: '세그먼트/중첩/동적/그룹.' },
    'scss-setup': { title: 'SCSS 적용 가이드', content: '전역 SCSS + 모듈 SCSS 활용.' },
  };
  return map[id] ?? null;
}

export default async function BlogDetailPage({ params }: PageProps) {
  const post = await getPostById(params.id);

  if (!post) {
    // 6회차에서 not-found.tsx를 다루지만, 지금은 간단히 처리
    return (
      <main style={{ padding: 24 }}>
        <h1>게시글을 찾을 수 없습니다.</h1>
      </main>
    );
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>{post.title}</h1>
      <p style={{ whiteSpace: 'pre-wrap' }}>{post.content}</p>
    </main>
  );
}

