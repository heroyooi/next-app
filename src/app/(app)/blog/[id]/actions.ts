'use server';

export async function addComment(
  postId: string,
  prev: string[],
  formData: FormData
): Promise<string[]> {
  const comment = formData.get('comment')?.toString().trim() ?? '';
  if (!comment) return prev;

  // 👉 DB 저장 로직 자리
  console.log(`[COMMENT][${postId}]`, comment);

  // 서버가 최신 목록을 돌려주는 형태로 가정(여기선 단순 append)
  return [...prev, comment];
}
