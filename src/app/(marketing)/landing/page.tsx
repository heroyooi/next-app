import styles from './landing.module.scss';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <section className={styles.hero}>
      <h1 className={styles.title}>FE 스쿨 – 프론트엔드로 가는 가장 빠른 길</h1>
      <p className={styles.subtitle}>
        실무 중심 커리큘럼으로 React · Next.js · Vue · Remix까지 한 번에.
      </p>
      <div className={styles.actions}>
        <Link href='/blog' className={styles.btnPrimary}>
          블로그 보기
        </Link>
        <Link href='/about' className={styles.btn}>
          과정 소개
        </Link>
      </div>
    </section>
  );
}
