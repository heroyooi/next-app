export { auth as middleware } from '@/auth';

// 로그인 필요 경로 지정
export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*'],
};
