type PageProps = { params: Promise<{ mode: 'no-store' | 'reval' }> };

const RAW_MD_URL =
  'https://raw.githubusercontent.com/nodejs/node/main/CHANGELOG.md';

async function fetchMarkdown(mode: 'no-store' | 'reval') {
  const t0 = Date.now();
  const opt =
    mode === 'no-store'
      ? ({ cache: 'no-store' } as const)
      : ({ next: { revalidate: 120 } } as const);

  const res = await fetch(RAW_MD_URL, opt);
  const text = await res.text();

  // 서버 로그로 비교
  console.log(
    `[MD][${mode}] at ${new Date().toISOString()} (${Date.now() - t0}ms) len=${
      text.length
    }`
  );

  return text.slice(0, 1200); // 데모: 길면 앞부분만
}

export const revalidate = 0; // 이 라우트 자체는 캐시 X (비교 용이)

export default async function MarkdownDemoPage({ params }: PageProps) {
  const { mode } = await params;
  if (mode !== 'no-store' && mode !== 'reval') {
    return (
      <main style={{ padding: 24 }}>
        <h1>잘못된 mode</h1>
        <p>`/md/no-store` 또는 `/md/reval` 로 접속하세요.</p>
      </main>
    );
  }

  const md = await fetchMarkdown(mode);

  return (
    <main style={{ padding: 24 }}>
      <h1>원격 마크다운 – {mode}</h1>
      <pre
        style={{
          background: '#f6f8fa',
          border: '1px solid rgba(0,0,0,.06)',
          borderRadius: 8,
          padding: 16,
          overflowX: 'auto',
          whiteSpace: 'pre-wrap',
        }}
      >
        {md}
      </pre>
      <p style={{ opacity: 0.75 }}>
        서버 터미널에 출력된 로그(`[MD][...]`)에서 응답 시간/캐싱 차이를
        비교해보세요.
      </p>
    </main>
  );
}
