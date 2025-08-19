type PageProps = { params: { category: string; id: string } };

export default function BlogCategoryDetailPage({ params }: PageProps) {
  const { category, id } = params;

  return (
    <main style={{ padding: 24 }}>
      <h1>카테고리별 게시글 상세</h1>
      <ul style={{ lineHeight: 1.8 }}>
        <li>
          <strong>category:</strong> {category}
        </li>
        <li>
          <strong>id:</strong> {id}
        </li>
      </ul>

      <p style={{ marginTop: 12, opacity: 0.85 }}>
        예시 URL: <code>/blog/next/next-101</code>
      </p>
    </main>
  );
}
