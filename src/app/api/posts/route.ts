import { NextResponse } from 'next/server';

const POSTS = [
  {
    id: 'next-101',
    title: 'Next.js란?',
    excerpt: 'App Router 기초 정리',
    cover: '/covers/next.png',
  },
  {
    id: 'routing-quick',
    title: '파일 라우팅 빠르게 훑기',
    excerpt: '세그먼트/중첩/동적',
    cover: '/covers/routing.png',
  },
  {
    id: 'scss-setup',
    title: 'SCSS 적용 가이드',
    excerpt: '전역/모듈 SCSS',
    cover: '/covers/scss.png',
  },
];

export const revalidate = 0;
// 주의: route handler 자체 캐시는 보수적으로 (API는 즉시 반영을 원할 때가 많습니다).

export async function GET() {
  // 실제로는 DB 호출/외부 API 호출
  return NextResponse.json(POSTS, { status: 200 });
}
