import { useState } from "react";
import { Search, Bell, ChevronDown, User, LogOut } from "lucide-react";

export function Topbar() {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <header className="flex h-14 items-center justify-between border-b border-border bg-card px-6">
      {/* Search */}
      <div className="relative w-72">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Pesquisar..."
          className="h-9 w-full rounded-lg border border-input bg-background pl-9 pr-4 text-sm outline-none focus:ring-1 focus:ring-ring transition-shadow"
        />
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        <button className="relative rounded-lg p-2 text-muted-foreground hover:bg-accent transition-colors">
          <Bell className="h-[18px] w-[18px]" />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-destructive" />
        </button>

        <div className="relative">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-accent transition-colors"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-semibold">
              A
            </div>
            <span className="text-sm font-medium">Admin</span>
            <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
          </button>

          {showProfile && (
            <div className="absolute right-0 top-full mt-1 w-40 rounded-lg border border-border bg-card py-1 z-50">
              <button className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-accent transition-colors">
                <User className="h-4 w-4" /> Ver perfil
              </button>
              <button className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-accent transition-colors">
                <LogOut className="h-4 w-4" /> Sair
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
