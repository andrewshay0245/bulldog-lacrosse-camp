import { redirect } from 'next/navigation';
import { verifySession } from '@/lib/auth';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = await verifySession();

  if (!isAuthenticated) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-[#00356b] text-white px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold">Bulldog Lacrosse - Admin</h1>
          <form action="/api/admin/logout" method="POST">
            <button
              type="submit"
              className="text-sm bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition"
            >
              Logout
            </button>
          </form>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  );
}
