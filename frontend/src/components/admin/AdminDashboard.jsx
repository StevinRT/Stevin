import { useState } from "react";
import { LogOut, Store, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useData } from "@/context/DataContext";
import MenuManager from "@/components/admin/MenuManager";
import OutletManager from "@/components/admin/OutletManager";

export default function AdminDashboard() {
  const { logout } = useAuth();
  const { refresh } = useData();
  const [tab, setTab] = useState("menu");

  return (
    <div className="min-h-[80vh] bg-background" data-testid="admin-dashboard">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between gap-3 mb-8">
          <div>
            <div className="font-label text-[11px] text-primary mb-1">Dashboard</div>
            <h1 className="font-display text-3xl sm:text-4xl font-semibold">Admin</h1>
          </div>
          <Button
            variant="outline"
            onClick={() => { logout(); }}
            className="rounded-full font-sub"
            data-testid="admin-logout"
          >
            <LogOut className="h-4 w-4 mr-2" /> Sign out
          </Button>
        </div>

        <div className="flex gap-2 mb-8" data-testid="admin-tabs">
          <TabButton active={tab === "menu"} onClick={() => setTab("menu")} testId="tab-menu" icon={<Utensils className="h-4 w-4" />}>
            Menu
          </TabButton>
          <TabButton active={tab === "outlets"} onClick={() => setTab("outlets")} testId="tab-outlets" icon={<Store className="h-4 w-4" />}>
            Outlets
          </TabButton>
        </div>

        {tab === "menu" && <MenuManager onChange={refresh} />}
        {tab === "outlets" && <OutletManager onChange={refresh} />}
      </div>
    </div>
  );
}

function TabButton({ active, onClick, testId, icon, children }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full h-10 px-4 font-sub text-sm font-semibold inline-flex items-center gap-2 border transition-colors ${
        active
          ? "bg-secondary text-secondary-foreground border-secondary"
          : "bg-card text-foreground/70 border-border hover:text-foreground"
      }`}
      data-testid={testId}
    >
      {icon} {children}
    </button>
  );
}
