import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import AdminDashboard from '@/components/AdminDashboard';

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/');
    return null;
  }

  const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase();
  const userEmail = session.user?.email?.toLowerCase();

  if (userEmail !== adminEmail) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-white">
        <div className="text-center">
          <h1 className="text-4xl font-mono text-primary mb-4">Access Denied</h1>
          <p className="text-gray-300">You do not have permission to access this page.</p>
          <a href="/" className="text-primary hover:underline mt-4 inline-block">← Return Home</a>
        </div>
      </div>
    );
  }

  return <AdminDashboard />;
}