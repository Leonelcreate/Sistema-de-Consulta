import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { User, Settings as SettingsIcon, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/configuracoes")({
  component: ConfiguracoesPage,
  head: () => ({
    meta: [{ title: "Configurações — Alvissara" }],
  }),
});

function ConfiguracoesPage() {
  const [activeTab, setActiveTab] = useState<"perfil" | "sistema">("perfil");
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleTheme = (t: "light" | "dark") => {
    setTheme(t);
    document.documentElement.classList.toggle("dark", t === "dark");
  };

  const tabs = [
    { id: "perfil" as const, label: "Perfil", icon: User },
    { id: "sistema" as const, label: "Sistema", icon: SettingsIcon },
  ];

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-xl font-semibold">Configurações</h1>

      <div className="flex gap-1 border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.id
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "perfil" && (
        <div className="rounded-xl border border-border bg-card p-6 space-y-5">
          <h2 className="text-sm font-semibold">Informações do Usuário</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-muted-foreground">Nome</label>
              <input defaultValue="Administrador" className="input-field" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-muted-foreground">Email</label>
              <input defaultValue="admin@alvissara.co.mz" className="input-field" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-muted-foreground">Telefone</label>
              <input defaultValue="+258 84 000 0000" className="input-field" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-muted-foreground">Função</label>
              <input defaultValue="Administrador" disabled className="input-field opacity-60" />
            </div>
          </div>

          <div className="border-t border-border pt-5 space-y-4">
            <h2 className="text-sm font-semibold">Alterar Senha</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-muted-foreground">Senha Actual</label>
                <input type="password" className="input-field" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-muted-foreground">Nova Senha</label>
                <input type="password" className="input-field" />
              </div>
            </div>
          </div>

          <Button size="sm">Salvar Alterações</Button>
        </div>
      )}

      {activeTab === "sistema" && (
        <div className="space-y-5">
          <div className="rounded-xl border border-border bg-card p-6 space-y-5">
            <h2 className="text-sm font-semibold">Preferências do Sistema</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-muted-foreground">Moeda</label>
                <select className="input-field">
                  <option>Metical (MT)</option>
                  <option>USD ($)</option>
                  <option>EUR (€)</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-muted-foreground">Idioma</label>
                <select className="input-field">
                  <option>Português</option>
                  <option>English</option>
                </select>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 space-y-4">
            <h2 className="text-sm font-semibold">Tema</h2>
            <div className="flex gap-3">
              <button
                onClick={() => toggleTheme("light")}
                className={`flex items-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium transition-colors ${
                  theme === "light" ? "border-primary bg-primary/5 text-primary" : "border-border text-muted-foreground hover:border-foreground/20"
                }`}
              >
                <Sun className="h-4 w-4" />
                Claro
              </button>
              <button
                onClick={() => toggleTheme("dark")}
                className={`flex items-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium transition-colors ${
                  theme === "dark" ? "border-primary bg-primary/5 text-primary" : "border-border text-muted-foreground hover:border-foreground/20"
                }`}
              >
                <Moon className="h-4 w-4" />
                Escuro
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
