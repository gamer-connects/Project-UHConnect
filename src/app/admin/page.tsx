import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/authOptions';
import AdminClientPage from './AdminClientPage';

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  // Not logged in → redirect to sign in
  if (!session) {
    return redirect('/auth/signin');
  }

  // Logged in but NOT ADMIN
  const { role } = (session.user as any);

  if (role !== 'ADMIN') {
    return redirect('/home');
  }

  // ADMIN can enter
  return <AdminClientPage />;
}
