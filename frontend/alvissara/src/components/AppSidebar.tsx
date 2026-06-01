import { Link, useLocation } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Users,
  Stethoscope,
  CalendarDays,
  Activity,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";
import logoIcon from "@/assets/logo-icon.png";

const mainNav = [
  { label: "Dashboard", to: "/", icon: LayoutDashboard },
  { label: "Pacientes", to: "/clientes", icon: Users },
  { label: "Médicos", to: "/medicos", icon: Stethoscope },
  { label: "Consultas", to: "/consultas", icon: CalendarDays },
  { label: "Histórico", to: "/historico", icon: Activity },
  { label: "Relatórios", to: "/relatorios", icon: BarChart3 },
];

export function AppSidebar() {
  const location = useLocation();
  const isActive = (path: string) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  return (
    <aside className="flex h-screen w-56 flex-col border-r border-sidebar-border bg-sidebar shrink-0">
      <div className="flex items-center gap-2.5 px-5 py-5">
        <img src={logoIcon} alt="Alvissara" className="h-7 w-7" />
        <span className="text-base font-semibold text-foreground tracking-tight">Alvissara</span>
      </div>

      <nav className="flex-1 space-y-0.5 px-3 mt-2">
        {mainNav.map((item) => {
          const active = isActive(item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                active
                  ? "bg-sidebar-accent text-primary"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-foreground"
              }`}
            >
              <item.icon className="h-[18px] w-[18px]" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-sidebar-border px-3 py-3 space-y-0.5">
        <Link
          to="/configuracoes"
          className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
            isActive("/configuracoes")
              ? "bg-sidebar-accent text-primary"
              : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-foreground"
          }`}
        >
          <Settings className="h-[18px] w-[18px]" />
          Configurações
        </Link>
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent hover:text-foreground transition-colors">
          <LogOut className="h-[18px] w-[18px]" />
          Sair
        </button>
      </div>
    </aside>
  );
}
