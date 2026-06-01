import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { Plus, Search, X, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/clientes")({
  component: ClientesPage,
  head: () => ({
    meta: [{ title: "Pacientes — Alvissara" }],
  }),
});

const clients = [
  { name: "Fátima Nhaca", age: 42, contact: "+258 84 123 4567", location: "Maputo", date: "10/03/2026" },
  { name: "Carlos Mondlane", age: 35, contact: "+258 82 345 6789", location: "Matola", date: "22/02/2026" },
  { name: "Ana Cossa", age: 28, contact: "+258 84 567 8901", location: "Maputo", date: "15/01/2026" },
  { name: "Pedro Macuácua", age: 51, contact: "+258 86 789 0123", location: "Beira", date: "05/04/2026" },
  { name: "Rosa Tembe", age: 33, contact: "+258 84 901 2345", location: "Nampula", date: "01/04/2026" },
];

const clientHistory: Record<string, { date: string; notes: string }[]> = {
  "Fátima Nhaca": [
    { date: "14/04/2026", notes: "Consulta de rotina. Paciente em bom estado geral." },
    { date: "01/04/2026", notes: "Queixas de dores de cabeça. Recomendado repouso." },
    { date: "15/03/2026", notes: "Acompanhamento mensal. Sem alterações." },
  ],
  "Carlos Mondlane": [
    { date: "13/04/2026", notes: "Primeira consulta. Histórico familiar de hipertensão." },
    { date: "28/03/2026", notes: "Exames laboratoriais solicitados." },
  ],
  "Ana Cossa": [
    { date: "12/04/2026", notes: "Paciente estável. Continuar com suplementação." },
  ],
  "Pedro Macuácua": [
    { date: "11/04/2026", notes: "Queixas de fadiga. Ajuste na suplementação." },
    { date: "25/03/2026", notes: "Acompanhamento pós-início de tratamento." },
  ],
  "Rosa Tembe": [
    { date: "10/04/2026", notes: "Consulta de rotina. Tudo normal." },
  ],
};

function ClientesPage() {
  const [showModal, setShowModal] = useState(false);
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpenMenu(null);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Pacientes</h1>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input type="text" placeholder="Pesquisar paciente..." className="input-field pl-9 w-56" />
          </div>
          <Button size="sm" onClick={() => setShowModal(true)}><Plus className="h-4 w-4" /> Novo Paciente</Button>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="px-6 py-3 text-xs font-medium text-muted-foreground">Nome</th>
              <th className="px-6 py-3 text-xs font-medium text-muted-foreground">Idade</th>
              <th className="px-6 py-3 text-xs font-medium text-muted-foreground">Contacto</th>
              <th className="px-6 py-3 text-xs font-medium text-muted-foreground">Localização</th>
              <th className="px-6 py-3 text-xs font-medium text-muted-foreground">Data de Registo</th>
              <th className="px-6 py-3 text-xs font-medium text-muted-foreground">Ações</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((c, i) => (
              <tr key={i} className="border-b border-border last:border-0">
                <td
                  className="px-6 py-3 font-medium text-primary cursor-pointer hover:underline"
                  onClick={() => setSelectedClient(c.name)}
                >
                  {c.name}
                </td>
                <td className="px-6 py-3 text-muted-foreground">{c.age}</td>
                <td className="px-6 py-3 text-muted-foreground">{c.contact}</td>
                <td className="px-6 py-3 text-muted-foreground">{c.location}</td>
                <td className="px-6 py-3 text-muted-foreground">{c.date}</td>
                <td className="px-6 py-3">
                  <div className="relative" ref={openMenu === i ? menuRef : undefined}>
                    <button onClick={() => setOpenMenu(openMenu === i ? null : i)} className="rounded p-1 hover:bg-accent">
                      <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                    </button>
                    {openMenu === i && (
                      <div className="absolute right-0 top-8 z-20 w-40 rounded-lg border border-border bg-card py-1">
                        <button onClick={() => { setSelectedClient(c.name); setOpenMenu(null); }} className="w-full px-4 py-2 text-left text-sm hover:bg-accent">Ver Histórico</button>
                        <button onClick={() => setOpenMenu(null)} className="w-full px-4 py-2 text-left text-sm hover:bg-accent">Editar</button>
                        <button onClick={() => setOpenMenu(null)} className="w-full px-4 py-2 text-left text-sm text-destructive hover:bg-accent">Excluir</button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* New Patient Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20" onClick={() => setShowModal(false)}>
          <div className="w-full max-w-md rounded-xl border border-border bg-card p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-semibold">Novo Paciente</h2>
              <button onClick={() => setShowModal(false)} className="rounded p-1 hover:bg-accent"><X className="h-4 w-4 text-muted-foreground" /></button>
            </div>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-muted-foreground">Nome Completo</label>
                <input type="text" placeholder="Nome do paciente" className="input-field" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-muted-foreground">Contacto</label>
                  <input type="text" placeholder="+258 84 000 0000" className="input-field" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-muted-foreground">Idade</label>
                  <input type="number" placeholder="0" className="input-field" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-muted-foreground">Localização</label>
                <input type="text" placeholder="Ex: Maputo, Matola, Beira..." className="input-field" />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" size="sm" onClick={() => setShowModal(false)}>Cancelar</Button>
                <Button size="sm" onClick={() => setShowModal(false)}>Salvar</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Client History Modal */}
      {selectedClient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20" onClick={() => setSelectedClient(null)}>
          <div className="w-full max-w-lg rounded-xl border border-border bg-card p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-semibold">Histórico — {selectedClient}</h2>
              <button onClick={() => setSelectedClient(null)} className="rounded p-1 hover:bg-accent"><X className="h-4 w-4 text-muted-foreground" /></button>
            </div>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {(clientHistory[selectedClient] || []).map((entry, i) => (
                <div key={i} className="rounded-lg border border-border p-4">
                  <p className="text-xs text-muted-foreground mb-1">{entry.date}</p>
                  <p className="text-sm">{entry.notes}</p>
                </div>
              ))}
              {!(clientHistory[selectedClient]?.length) && (
                <p className="text-sm text-muted-foreground">Nenhum registo encontrado.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
