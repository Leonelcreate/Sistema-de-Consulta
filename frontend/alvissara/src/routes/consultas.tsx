import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect, useMemo } from "react";
import { Plus, X, MoreHorizontal, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/consultas")({
  component: ConsultasPage,
  head: () => ({ meta: [{ title: "Consultas — Alvissara" }] }),
});

type Status = "Agendada" | "Concluída" | "Cancelada";

const patients = ["Fátima Nhaca", "Carlos Mondlane", "Ana Cossa", "Pedro Macuácua", "Rosa Tembe"];
const doctors = [
  { name: "Dr. Michael Banze", specialty: "Oftalmologia" },
  { name: "Dr. João Mucavele", specialty: "Cardiologia" },
  { name: "Dra. Helena Sitoe", specialty: "Pediatria" },
  { name: "Dr. António Macamo", specialty: "Clínica Geral" },
  { name: "Dra. Lúcia Mabunda", specialty: "Ginecologia" },
];

const initialAppointments = [
  { patient: "Fátima Nhaca", doctor: "Dr. Michael Banze", specialty: "Oftalmologia", date: "2026-06-01", time: "08:30", status: "Agendada" as Status },
  { patient: "Carlos Mondlane", doctor: "Dr. João Mucavele", specialty: "Cardiologia", date: "2026-06-01", time: "09:00", status: "Agendada" as Status },
  { patient: "Ana Cossa", doctor: "Dra. Helena Sitoe", specialty: "Pediatria", date: "2026-06-01", time: "10:00", status: "Concluída" as Status },
  { patient: "Pedro Macuácua", doctor: "Dr. António Macamo", specialty: "Clínica Geral", date: "2026-06-01", time: "11:00", status: "Agendada" as Status },
  { patient: "Rosa Tembe", doctor: "Dra. Lúcia Mabunda", specialty: "Ginecologia", date: "2026-06-02", time: "08:00", status: "Agendada" as Status },
  { patient: "Fátima Nhaca", doctor: "Dr. João Mucavele", specialty: "Cardiologia", date: "2026-05-30", time: "14:00", status: "Concluída" as Status },
  { patient: "Carlos Mondlane", doctor: "Dr. Michael Banze", specialty: "Oftalmologia", date: "2026-05-29", time: "15:30", status: "Cancelada" as Status },
];

const statusStyles: Record<Status, string> = {
  "Agendada": "bg-primary/10 text-primary",
  "Concluída": "bg-success/10 text-success-foreground",
  "Cancelada": "bg-muted text-muted-foreground line-through",
};

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

function ConsultasPage() {
  const [appointments] = useState(initialAppointments);
  const [filterDate, setFilterDate] = useState("");
  const [filterStatus, setFilterStatus] = useState<"Todas" | Status>("Todas");
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

  const filtered = useMemo(() => {
    return appointments
      .filter((a) => (filterDate ? a.date === filterDate : true))
      .filter((a) => (filterStatus === "Todas" ? true : a.status === filterStatus))
      .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
  }, [appointments, filterDate, filterStatus]);

  const stats = useMemo(() => {
    const today = "2026-06-01";
    return {
      today: appointments.filter((a) => a.date === today).length,
      pending: appointments.filter((a) => a.status === "Agendada").length,
      completed: appointments.filter((a) => a.status === "Concluída").length,
      cancelled: appointments.filter((a) => a.status === "Cancelada").length,
    };
  }, [appointments]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Consultas</h1>
          <p className="text-sm text-muted-foreground">Agenda de marcações</p>
        </div>
        <Button size="sm" onClick={() => setShowModal(true)}><Plus className="h-4 w-4" /> Nova Consulta</Button>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          { label: "Consultas hoje", value: stats.today },
          { label: "Agendadas", value: stats.pending },
          { label: "Concluídas", value: stats.completed },
          { label: "Canceladas", value: stats.cancelled },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className="mt-1 text-2xl font-semibold">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="relative">
          <CalendarDays className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="input-field pl-9 w-auto"
          />
        </div>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value as any)} className="input-field w-auto">
          <option>Todas</option>
          <option>Agendada</option>
          <option>Concluída</option>
          <option>Cancelada</option>
        </select>
        {(filterDate || filterStatus !== "Todas") && (
          <button onClick={() => { setFilterDate(""); setFilterStatus("Todas"); }} className="text-sm text-muted-foreground hover:text-foreground">
            Limpar filtros
          </button>
        )}
      </div>

      <div className="rounded-xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="px-6 py-3 text-xs font-medium text-muted-foreground">Paciente</th>
              <th className="px-6 py-3 text-xs font-medium text-muted-foreground">Médico</th>
              <th className="px-6 py-3 text-xs font-medium text-muted-foreground">Especialidade</th>
              <th className="px-6 py-3 text-xs font-medium text-muted-foreground">Data</th>
              <th className="px-6 py-3 text-xs font-medium text-muted-foreground">Hora</th>
              <th className="px-6 py-3 text-xs font-medium text-muted-foreground">Estado</th>
              <th className="px-6 py-3 text-xs font-medium text-muted-foreground">Ações</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((a, i) => (
              <tr key={i} className="border-b border-border last:border-0">
                <td className="px-6 py-3 font-medium">{a.patient}</td>
                <td className="px-6 py-3 text-muted-foreground">{a.doctor}</td>
                <td className="px-6 py-3 text-muted-foreground">{a.specialty}</td>
                <td className="px-6 py-3 text-muted-foreground">{formatDate(a.date)}</td>
                <td className="px-6 py-3 text-muted-foreground">{a.time}</td>
                <td className="px-6 py-3">
                  <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${statusStyles[a.status]}`}>{a.status}</span>
                </td>
                <td className="px-6 py-3">
                  <div className="relative" ref={openMenu === i ? menuRef : undefined}>
                    <button onClick={() => setOpenMenu(openMenu === i ? null : i)} className="rounded p-1 hover:bg-accent">
                      <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                    </button>
                    {openMenu === i && (
                      <div className="absolute right-0 top-8 z-20 w-44 rounded-lg border border-border bg-card py-1">
                        <button onClick={() => setOpenMenu(null)} className="w-full px-4 py-2 text-left text-sm hover:bg-accent">Marcar concluída</button>
                        <button onClick={() => setOpenMenu(null)} className="w-full px-4 py-2 text-left text-sm hover:bg-accent">Reagendar</button>
                        <button onClick={() => setOpenMenu(null)} className="w-full px-4 py-2 text-left text-sm text-destructive hover:bg-accent">Cancelar</button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={7} className="px-6 py-8 text-center text-sm text-muted-foreground">Nenhuma consulta encontrada.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20" onClick={() => setShowModal(false)}>
          <div className="w-full max-w-md rounded-xl border border-border bg-card p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-semibold">Nova Consulta</h2>
              <button onClick={() => setShowModal(false)} className="rounded p-1 hover:bg-accent"><X className="h-4 w-4 text-muted-foreground" /></button>
            </div>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-muted-foreground">Paciente</label>
                <select className="input-field">
                  <option value="">Selecionar paciente</option>
                  {patients.map((p) => <option key={p}>{p}</option>)}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-muted-foreground">Médico</label>
                <select className="input-field">
                  <option value="">Selecionar médico</option>
                  {doctors.map((d) => <option key={d.name}>{d.name} — {d.specialty}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-muted-foreground">Data</label>
                  <input type="date" className="input-field" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-muted-foreground">Hora</label>
                  <input type="time" min="08:00" max="17:00" className="input-field" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-muted-foreground">Observações</label>
                <textarea rows={3} placeholder="Motivo da consulta..." className="input-field resize-none" />
              </div>
              <p className="text-xs text-muted-foreground">Horário disponível: 08:00 às 17:00.</p>
              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" size="sm" onClick={() => setShowModal(false)}>Cancelar</Button>
                <Button size="sm" onClick={() => setShowModal(false)}>Agendar</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}