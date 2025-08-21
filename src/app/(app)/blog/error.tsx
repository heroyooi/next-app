'use client';

export default function BlogError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main style={{ padding: 24 }}>
      <h1>문제가 발생했습니다 😥</h1>
      <p style={{ opacity: 0.8 }}>{error.message}</p>
      <button className="btn btn--primary" onClick={() => reset()}>
        다시 시도
      </button>
    </main>
  );
}