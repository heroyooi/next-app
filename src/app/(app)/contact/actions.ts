'use server';

export async function sendContact(prevState: any, formData: FormData) {
  const name = formData.get('name')?.toString() ?? '';
  const email = formData.get('email')?.toString() ?? '';
  const message = formData.get('message')?.toString() ?? '';

  if (!name || !email || !message) {
    return { ok: false, error: '모든 필드를 입력해주세요.' };
  }

  console.log('[CONTACT]', { name, email, message });
  return { ok: true, error: null };
}
