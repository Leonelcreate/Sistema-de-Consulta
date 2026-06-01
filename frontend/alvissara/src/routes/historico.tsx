import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/historico")({
  component: HistoricoPage,
  head: () => ({
    meta: [{ title: "Histórico — Alvissara" }],
  }),
});

const records = [
  { client: "Fátima Nhaca", date: "14/04/2026", notes: "Consulta de rotina. Paciente em bom estado geral." },
  { client: "Carlos Mondlane", date: "13/04/2026", notes: "Primeira consulta. Histórico familiar de hipertensão." },
  { client: "Ana Cossa", date: "12/04/2026", notes: "Paciente estável. Continuar com suplementação." },
  { client: "Pedro Macuácua", date: "11/04/2026", notes: "Queixas de fadiga. Ajuste na suplementação." },
  { client: "Rosa Tembe", date: "10/04/2026", notes: "Consulta de rotina. Tudo normal." },
];

function HistoricoPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Histórico</h1>
        <Button size="sm" onClick={() => setShowModal(true)}><Plus className="h-4 w-4" /> Novo Registo</Button>
      </div>

      <div className="flex gap-3">
        <select className="input-field w-auto">
          <option>Selecionar paciente</option>
          <option>Fátima Nhaca</option>
          <option>Carlos Mondlane</option>
          <option>Ana Cossa</option>
          <option>Pedro Macuácua</option>
          <option>Rosa Tembe</option>
        </select>
        <input type="date" className="input-field w-auto" />
      </div>

      <div className="rounded-xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="px-6 py-3 text-xs font-medium text-muted-foreground">Paciente</th>
              <th className="px-6 py-3 text-xs font-medium text-muted-foreground">Data</th>
              <th className="px-6 py-3 text-xs font-medium text-muted-foreground">Observações</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r, i) => (
              <tr key={i} className="border-b border-border last:border-0">
                <td className="px-6 py-3 font-medium">{r.client}</td>
                <td className="px-6 py-3 text-muted-foreground">{r.date}</td>
                <td className="px-6 py-3 text-muted-foreground">{r.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20" onClick={() => setShowModal(false)}>
          <div className="w-full max-w-md rounded-xl border border-border bg-card p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-semibold">Novo Registo</h2>
              <button onClick={() => setShowModal(false)} className="rounded p-1 hover:bg-accent"><X className="h-4 w-4 text-muted-foreground" /></button>
            </div>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-muted-foreground">Paciente</label>
                <select className="input-field">
                  <option>Selecionar paciente</option>
                  <option>Fátima Nhaca</option><option>Carlos Mondlane</option><option>Ana Cossa</option><option>Pedro Macuácua</option><option>Rosa Tembe</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-muted-foreground">Observações</label>
                <textarea rows={4} placeholder="Notas sobre a consulta..." className="input-field resize-none" />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" size="sm" onClick={() => setShowModal(false)}>Cancelar</Button>
                <Button size="sm" onClick={() => setShowModal(false)}>Salvar</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
