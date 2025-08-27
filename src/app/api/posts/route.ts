import { NextResponse } from 'next/server';

let POSTS = [
  { id: 'next-101', title: 'Next.js란?', excerpt: 'App Router 기초 정리' },
  {
    id: 'routing-quick',
    title: '파일 라우팅 빠르게 훑기',
    excerpt: '세그먼트/중첩/동적',
  },
  { id: 'scss-setup', title: 'SCSS 적용 가이드', excerpt: '전역/모듈 SCSS' },
];

export async function GET() {
  // 실제로는 DB 호출
  return NextResponse.json(POSTS, { status: 200 });
}

/** (참고) 테스트용 글 추가 (보안 없이 공개로 두지 마세요) */
export async function POST(req: Request) {
  const body = await req.json();
  if (!body?.id || !body?.title) {
    return NextResponse.json(
      { ok: false, error: 'id/title required' },
      { status: 400 }
    );
  }
  POSTS = [
    { id: body.id, title: body.title, excerpt: body.excerpt ?? '' },
    ...POSTS,
  ];
  return NextResponse.json({ ok: true }, { status: 201 });
}
