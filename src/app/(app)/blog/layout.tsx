import Link from 'next/link';
import styles from '@/app/(app)/blog/blog-layout.module.scss';

export const metadata = {
  title: '블로그 | FE 스쿨',
  description: 'FE 스쿨 블로그 섹션',
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className={styles.wrap}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          <Link href='/blog'>FE 스쿨 블로그</Link>
        </h1>
        <nav className={styles.nav}>
          <Link href='/blog'>리스트</Link>
          <Link href='/about'>소개</Link>
        </nav>
      </header>
      <div className={styles.content}>{children}</div>
    </section>
  );
}
