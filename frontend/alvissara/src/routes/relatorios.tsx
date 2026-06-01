import { createFileRoute } from "@tanstack/react-router";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/relatorios")({
  component: RelatoriosPage,
  head: () => ({
    meta: [{ title: "Relatórios — Alvissara" }],
  }),
});

function RelatoriosPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Relatórios</h1>
        <Button size="sm" variant="outline"><Download className="h-4 w-4" /> Exportar</Button>
      </div>

      <div className="flex flex-wrap gap-3">
        <select className="input-field w-auto">
          <option>Período</option><option>Últimos 7 dias</option><option>Último mês</option><option>Último trimestre</option>
        </select>
        <select className="input-field w-auto">
          <option>Todas as especialidades</option><option>Cardiologia</option><option>Pediatria</option><option>Oftalmologia</option><option>Clínica Geral</option><option>Ginecologia</option>
        </select>
        <select className="input-field w-auto">
          <option>Todos os médicos</option><option>Dr. Michael Banze</option><option>Dr. João Mucavele</option><option>Dra. Helena Sitoe</option>
        </select>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="text-sm font-semibold mb-4">Consultas por Semana</h2>
          <div className="flex h-40 items-end gap-3">
            {[60, 80, 45, 90, 70, 85].map((h, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-1">
                <div className="w-full rounded-t bg-primary hover:opacity-80 transition-all" style={{ height: `${h}%` }} />
                <span className="text-[10px] text-muted-foreground">{["Sem 1", "Sem 2", "Sem 3", "Sem 4", "Sem 5", "Sem 6"][i]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="text-sm font-semibold mb-4">Especialidades Mais Procuradas</h2>
          <div className="space-y-3">
            {[
              { name: "Clínica Geral", pct: 35 },
              { name: "Cardiologia", pct: 24 },
              { name: "Pediatria", pct: 18 },
              { name: "Ginecologia", pct: 14 },
              { name: "Oftalmologia", pct: 9 },
            ].map((p) => (
              <div key={p.name} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{p.name}</span>
                  <span className="text-muted-foreground">{p.pct}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-muted">
                  <div className="h-1.5 rounded-full bg-primary transition-all" style={{ width: `${p.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="text-sm font-semibold mb-4">Novos Pacientes</h2>
        <div className="flex h-32 items-end gap-3">
          {[3, 5, 2, 8, 6, 4, 7, 9, 5, 6, 8, 10].map((h, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-1">
              <div className="w-full rounded-t bg-foreground/15 hover:bg-foreground/25 transition-all" style={{ height: `${h * 10}%` }} />
              <span className="text-[10px] text-muted-foreground">
                {["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"][i]}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="text-sm font-semibold mb-4">Estado das Consultas</h2>
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Agendadas", value: 42, pct: 60 },
            { label: "Concluídas", value: 24, pct: 34 },
            { label: "Canceladas", value: 4, pct: 6 },
          ].map((s) => (
            <div key={s.label} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{s.label}</span>
                <span className="font-medium">{s.value}</span>
              </div>
              <div className="h-1.5 rounded-full bg-muted">
                <div className="h-1.5 rounded-full bg-primary" style={{ width: `${s.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
