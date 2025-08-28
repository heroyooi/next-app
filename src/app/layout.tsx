import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import './globals.scss';
import Providers from './Providers';
import { auth } from '@/auth';

export const metadata: Metadata = {
  title: 'FE 스쿨 - Next.js 기초',
  description: 'App Router 입문 과정',
};

const noto = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <html lang='ko'>
      <body className={noto.className}>
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  );
}
