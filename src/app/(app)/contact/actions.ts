'use server';

type ContactState = { ok: boolean; error: string | null };

export async function sendContact(
  prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  const name = formData.get('name')?.toString().trim() ?? '';
  const email = formData.get('email')?.toString().trim() ?? '';
  const message = formData.get('message')?.toString().trim() ?? '';

  if (!name || !email || !message) {
    return { ok: false, error: '모든 필드를 입력해주세요.' };
  }
  // 간단한 이메일 포맷 체크(엄격 X)
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: '이메일 형식이 올바르지 않습니다.' };
  }

  // 👉 여기서 DB 저장 / 메일 전송 / 슬랙 웹훅 등 처리
  console.log('[CONTACT]', { name, email, message });

  return { ok: true, error: null };
}
