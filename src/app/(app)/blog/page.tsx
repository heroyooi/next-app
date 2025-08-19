import Link from 'next/link';
import styles from '@/app/(app)/blog/BlogCard.module.scss';

type Post = { id: string; title: string; excerpt: string };

async function getPosts(): Promise<Post[]> {
  // 실제로는 DB/API 호출. 여기선 목업 데이터
  return [
    { id: 'next-101', title: 'Next.js란?', excerpt: 'App Router 기초 정리' },
    {
      id: 'routing-quick',
      title: '파일 라우팅 빠르게 훑기',
      excerpt: '세그먼트/중첩/동적',
    },
    { id: 'scss-setup', title: 'SCSS 적용 가이드', excerpt: '전역/모듈 SCSS' },
  ];
}

export default async function BlogListPage() {
  const posts = await getPosts();

  return (
    <main style={{ padding: 24 }}>
      <h1>블로그</h1>
      <div style={{ display: 'grid', gap: 12 }}>
        {posts.map((p) => (
          <article key={p.id} className={styles.card}>
            <h3 className={styles.title}>
              <Link href={`/blog/${p.id}`}>{p.title}</Link>
            </h3>
            <p className={styles.excerpt}>{p.excerpt}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
