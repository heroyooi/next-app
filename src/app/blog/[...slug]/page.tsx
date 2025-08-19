type PageProps = { params: { slug: string[] } };

export default function BlogCatchAllPage({ params }: PageProps) {
  const { slug } = params;

  return (
    <main style={{ padding: 24 }}>
      <h1>Catch‑all 라우팅</h1>
      <p>현재 경로 세그먼트 배열:</p>
      <pre
        style={{
          background: '#f6f8fa',
          padding: 12,
          borderRadius: 8,
          overflowX: 'auto',
        }}
      >
        {JSON.stringify(slug, null, 2)}
      </pre>

      <p style={{ opacity: 0.85 }}>
        예: <code>/blog/a/b/c</code> → <code>["a","b","c"]</code>
      </p>
    </main>
  );
}
