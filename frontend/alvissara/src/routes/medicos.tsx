import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { Plus, Search, X, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/medicos")({
  component: MedicosPage,
  head: () => ({ meta: [{ title: "Médicos — Alvissara" }] }),
});

const specialties = [
  "Clínica Geral",
  "Cardiologia",
  "Pediatria",
  "Ginecologia",
  "Oftalmologia",
  "Dermatologia",
  "Ortopedia",
  "Psiquiatria",
];

const doctors = [
  { name: "Dr. Michael Banze", specialty: "Oftalmologia", email: "michael@alvissara.co.mz", contact: "+258 84 111 2233", status: "Ativo" },
  { name: "Dr. João Mucavele", specialty: "Cardiologia", email: "joao@alvissara.co.mz", contact: "+258 82 444 5566", status: "Ativo" },
  { name: "Dra. Helena Sitoe", specialty: "Pediatria", email: "helena@alvissara.co.mz", contact: "+258 84 777 8899", status: "Ativo" },
  { name: "Dr. António Macamo", specialty: "Clínica Geral", email: "antonio@alvissara.co.mz", contact: "+258 86 222 3344", status: "Ativo" },
  { name: "Dra. Lúcia Mabunda", specialty: "Ginecologia", email: "lucia@alvissara.co.mz", contact: "+258 84 555 6677", status: "Inativo" },
];

function MedicosPage() {
  const [showModal, setShowModal] = useState(false);
  const [openMenu, setOpenMenu] = useState<number | null>(null);
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
        <h1 className="text-xl font-semibold">Médicos</h1>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input type="text" placeholder="Pesquisar médico..." className="input-field pl-9 w-56" />
          </div>
          <Button size="sm" onClick={() => setShowModal(true)}><Plus className="h-4 w-4" /> Novo Médico</Button>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="px-6 py-3 text-xs font-medium text-muted-foreground">Nome</th>
              <th className="px-6 py-3 text-xs font-medium text-muted-foreground">Especialidade</th>
              <th className="px-6 py-3 text-xs font-medium text-muted-foreground">Email</th>
              <th className="px-6 py-3 text-xs font-medium text-muted-foreground">Contacto</th>
              <th className="px-6 py-3 text-xs font-medium text-muted-foreground">Estado</th>
              <th className="px-6 py-3 text-xs font-medium text-muted-foreground">Ações</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((d, i) => (
              <tr key={i} className="border-b border-border last:border-0">
                <td className="px-6 py-3 font-medium">{d.name}</td>
                <td className="px-6 py-3 text-muted-foreground">{d.specialty}</td>
                <td className="px-6 py-3 text-muted-foreground">{d.email}</td>
                <td className="px-6 py-3 text-muted-foreground">{d.contact}</td>
                <td className="px-6 py-3">
                  <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                    d.status === "Ativo" ? "bg-success/10 text-success-foreground" : "bg-muted text-muted-foreground"
                  }`}>{d.status}</span>
                </td>
                <td className="px-6 py-3">
                  <div className="relative" ref={openMenu === i ? menuRef : undefined}>
                    <button onClick={() => setOpenMenu(openMenu === i ? null : i)} className="rounded p-1 hover:bg-accent">
                      <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                    </button>
                    {openMenu === i && (
                      <div className="absolute right-0 top-8 z-20 w-40 rounded-lg border border-border bg-card py-1">
                        <button onClick={() => setOpenMenu(null)} className="w-full px-4 py-2 text-left text-sm hover:bg-accent">Ver agenda</button>
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

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20" onClick={() => setShowModal(false)}>
          <div className="w-full max-w-md rounded-xl border border-border bg-card p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-semibold">Novo Médico</h2>
              <button onClick={() => setShowModal(false)} className="rounded p-1 hover:bg-accent"><X className="h-4 w-4 text-muted-foreground" /></button>
            </div>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-muted-foreground">Nome Completo</label>
                <input type="text" placeholder="Dr. ..." className="input-field" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-muted-foreground">Especialidade</label>
                <select className="input-field">
                  {specialties.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <input type="email" placeholder="email@alvissara.co.mz" className="input-field" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-muted-foreground">Contacto</label>
                  <input type="text" placeholder="+258 84 000 0000" className="input-field" />
                </div>
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