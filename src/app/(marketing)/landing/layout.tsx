import type { Metadata } from 'next';
import styles from '../marketing-layout.module.scss';

export const metadata: Metadata = {
  title: 'FE 스쿨 랜딩',
  description: 'FE 스쿨 소개 랜딩 페이지',
};

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={styles.marketingWrap}>{children}</div>;
}
