import BlogListClientLazy from './_components/BlogListClientLazy';

export type Post = { id: string; title: string; excerpt: string };

async function getPosts(): Promise<Post[]> {
  // 실제로는 DB/API 호출
  return [
    { id: 'next-101', title: 'Next.js란?', excerpt: 'App Router 기초 정리' },
    {
      id: 'routing-quick',
      title: '파일 라우팅 빠르게 훑기',
      excerpt: '세그먼트/중첩/동적',
    },
    { id: 'scss-setup', title: 'SCSS 적용 가이드', excerpt: '전역/모듈 SCSS' },
    {
      id: 'metadata-og',
      title: 'Metadata & OG 이미지',
      excerpt: 'generateMetadata 활용',
    },
  ];
}

export const metadata = {
  title: '블로그 | FE 스쿨',
  description: 'FE 스쿨 블로그 목록',
};

export default async function BlogListPage() {
  const posts = await getPosts();
  return (
    <main style={{ padding: 24 }}>
      <h1>블로그</h1>
      <BlogListClientLazy posts={posts} />
    </main>
  );
}
