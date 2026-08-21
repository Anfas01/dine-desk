import { requireAdmin } from "@/lib/auth/require-admin";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <AdminSidebar />

      <div className="md:pl-60">
        {children}
      </div>
    </div>
  );
}