import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

// 간단한 보호 (실서비스에선 토큰/세션 필수!)
export async function POST(req: Request) {
  try {
    const { tag } = await req.json();
    if (!tag)
      return NextResponse.json(
        { ok: false, error: 'tag required' },
        { status: 400 }
      );

    revalidateTag(tag);
    return NextResponse.json({ ok: true, revalidated: tag });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
