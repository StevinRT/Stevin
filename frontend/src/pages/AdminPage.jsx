import { useAuth } from "@/context/AuthContext";
import AdminLogin from "@/components/admin/AdminLogin";
import AdminDashboard from "@/components/admin/AdminDashboard";

export default function AdminPage() {
  const { isAuthed, checking } = useAuth();

  if (checking) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-sm text-muted-foreground" data-testid="admin-loading">
        Checking authentication…
      </div>
    );
  }
  return isAuthed ? <AdminDashboard /> : <AdminLogin />;
}
