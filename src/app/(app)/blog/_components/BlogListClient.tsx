'use client';

import { useDeferredValue, useMemo, useTransition } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import type { Post } from '../page';
import styles from '@/app/(app)/blog/BlogList.module.scss';

export default function BlogListClient({ posts }: { posts: Post[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const qParam = searchParams.get('q') ?? '';
  const [isPending, startTransition] = useTransition();

  const onChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set('q', value);
    else params.delete('q');
    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  const q = useDeferredValue(qParam.trim().toLowerCase());

  const filtered = useMemo(() => {
    if (!q) return posts;
    return posts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q)
    );
  }, [q, posts]);

  return (
    <section>
      <div className={styles.searchRow}>
        <input
          className={styles.input}
          placeholder='검색어를 입력하세요 (제목/요약/id)'
          defaultValue={qParam}
          onChange={(e) => onChange(e.target.value)}
        />
        {isPending && <span className={styles.hint}>검색 중…</span>}
      </div>

      <div className={styles.grid}>
        {filtered.length === 0 && (
          <p className={styles.muted}>검색 결과가 없습니다.</p>
        )}
        {filtered.map((p) => (
          <article key={p.id} className={styles.card}>
            <h3 className={styles.title}>
              <Link href={`/blog/${p.id}`}>{p.title}</Link>
            </h3>
            <p className={styles.excerpt}>{p.excerpt}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
