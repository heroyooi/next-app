import type { Metadata } from "next";
import "./globals.scss";

export const metadata: Metadata = {
  title: 'FE 스쿨 - Next.js 기초',
  description: 'App Router 입문 과정',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
