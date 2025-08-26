import BlogListClientLazy from './_components/BlogListClientLazy';

export type Post = {
  id: string;
  title: string;
  excerpt: string;
  cover: string;
};

async function getPosts(): Promise<Post[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`, {
    // 60초 주기로 ISR
    next: { revalidate: 60, tags: ['posts'] },
  });
  if (!res.ok) throw new Error('목록을 불러오지 못했습니다.');
  return res.json();
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
