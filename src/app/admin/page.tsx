import { redirect } from 'next/navigation';
import AdminDashboard from '@/components/AdminDashboard';
import { isAdminAuthenticated } from '@/lib/admin-session';

export default async function AdminPage() {
  const isAdmin = await isAdminAuthenticated();

  if (!isAdmin) {
    redirect('/admin/login');
  }

  return <AdminDashboard />;
}
