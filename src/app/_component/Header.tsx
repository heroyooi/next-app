// Server Component
import { auth } from '@/auth';
import UserMenu from './UserMenu';

export default async function Header() {
  const session = await auth();
  return <UserMenu session={session} />;
}
