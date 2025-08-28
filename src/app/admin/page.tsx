import { createCourse } from './actions';

export default function AdminPage() {
  return (
    <main style={{ padding: 24, maxWidth: 480 }}>
      <h1>관리자: 강좌 생성</h1>

      <form action={createCourse} style={{ display: 'grid', gap: 12 }}>
        <input name="title" placeholder="강좌 제목" style={{ padding: 8 }} />
        <button type="submit" className="btn btn--primary">
          등록
        </button>
      </form>
    </main>
  );
}
