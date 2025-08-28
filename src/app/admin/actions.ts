'use server';

import { auth } from '@/auth';

export async function createCourse(formData: FormData) {
  const session = await auth();
  if (!session) {
    throw new Error('Unauthorized');
  }

  const title = formData.get('title')?.toString().trim();
  if (!title) {
    return { ok: false, error: '제목은 필수입니다.' };
  }

  console.log('[ADMIN][CREATE]', { title, by: session.user?.email });

  return { ok: true };
}
