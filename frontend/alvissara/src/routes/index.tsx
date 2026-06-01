import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Users, Stethoscope, CalendarDays, Clock, Plus, ArrowUpRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: Dashboard,
  head: () => ({
    meta: [
      { title: "Dashboard — Alvissara" },
      { name: "description", content: "Painel de gestão clínica Alvissara" },
    ],
  }),
});

const stats = [
  { label: "Consultas Hoje", value: "15", icon: CalendarDays, change: "+3 vs ontem" },
  { label: "Pacientes", value: "248", icon: Users, change: "+12 este mês" },
  { label: "Médicos", value: "8", icon: Stethoscope, change: "5 especialidades" },
  { label: "Consultas Pendentes", value: "5", icon: Clock, change: "Para hoje" },
];

const todayAgenda = [
  { time: "08:30", patient: "Fátima Nhaca", doctor: "Dr. Michael Banze", specialty: "Oftalmologia", status: "Agendada" },
  { time: "09:00", patient: "Carlos Mondlane", doctor: "Dr. João Mucavele", specialty: "Cardiologia", status: "Agendada" },
  { time: "10:00", patient: "Ana Cossa", doctor: "Dra. Helena Sitoe", specialty: "Pediatria", status: "Concluída" },
  { time: "11:00", patient: "Pedro Macuácua", doctor: "Dr. António Macamo", specialty: "Clínica Geral", status: "Agendada" },
  { time: "14:30", patient: "Rosa Tembe", doctor: "Dra. Lúcia Mabunda", specialty: "Ginecologia", status: "Agendada" },
];

function Dashboard() {
  const [showNewAppointment, setShowNewAppointment] = useState(false);
  const [showNewClient, setShowNewClient] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Visão geral da clínica</p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" onClick={() => setShowNewAppointment(true)}>
            <Plus className="h-4 w-4" /> Nova Consulta
          </Button>
          <Button size="sm" variant="outline" onClick={() => setShowNewClient(true)}>
            <Plus className="h-4 w-4" /> Novo Paciente
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{s.label}</span>
              <s.icon className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="mt-2 text-2xl font-semibold">{s.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{s.change}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="text-sm font-semibold mb-4">Consultas por Mês</h2>
        <div className="flex h-44 items-end gap-2">
          {[42, 58, 65, 72, 80, 88, 75, 90, 82, 95, 78, 85].map((h, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-1">
              <div
                className="w-full rounded-t bg-primary transition-all hover:opacity-80"
                style={{ height: `${h}%` }}
              />
              <span className="text-[10px] text-muted-foreground">
                {["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"][i]}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 className="text-sm font-semibold">Agenda de Hoje</h2>
          <Link to="/consultas" className="flex items-center gap-1 text-xs text-primary hover:underline">
            Ver todas as consultas <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="px-6 py-3 text-xs font-medium text-muted-foreground">Hora</th>
              <th className="px-6 py-3 text-xs font-medium text-muted-foreground">Paciente</th>
              <th className="px-6 py-3 text-xs font-medium text-muted-foreground">Médico</th>
              <th className="px-6 py-3 text-xs font-medium text-muted-foreground">Especialidade</th>
              <th className="px-6 py-3 text-xs font-medium text-muted-foreground">Estado</th>
            </tr>
          </thead>
          <tbody>
            {todayAgenda.map((a, i) => (
              <tr key={i} className="border-b border-border last:border-0">
                <td className="px-6 py-3 font-medium">{a.time}</td>
                <td className="px-6 py-3">{a.patient}</td>
                <td className="px-6 py-3 text-muted-foreground">{a.doctor}</td>
                <td className="px-6 py-3 text-muted-foreground">{a.specialty}</td>
                <td className="px-6 py-3">
                  <StatusBadge status={a.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showNewAppointment && (
        <Modal title="Nova Consulta" onClose={() => setShowNewAppointment(false)}>
          <div className="space-y-4">
            <Field label="Paciente">
              <select className="input-field">
                <option>Selecionar paciente</option>
                <option>Fátima Nhaca</option>
                <option>Carlos Mondlane</option>
                <option>Ana Cossa</option>
              </select>
            </Field>
            <Field label="Médico">
              <select className="input-field">
                <option>Selecionar médico</option>
                <option>Dr. Michael Banze — Oftalmologia</option>
                <option>Dr. João Mucavele — Cardiologia</option>
                <option>Dra. Helena Sitoe — Pediatria</option>
              </select>
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Data">
                <input type="date" className="input-field" />
              </Field>
              <Field label="Hora">
                <input type="time" min="08:00" max="17:00" className="input-field" />
              </Field>
            </div>
            <Field label="Observações">
              <textarea rows={3} className="input-field resize-none" />
            </Field>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" size="sm" onClick={() => setShowNewAppointment(false)}>Cancelar</Button>
              <Button size="sm" onClick={() => setShowNewAppointment(false)}>Agendar</Button>
            </div>
          </div>
        </Modal>
      )}

      {showNewClient && (
        <Modal title="Novo Paciente" onClose={() => setShowNewClient(false)}>
          <div className="space-y-4">
            <Field label="Nome Completo">
              <input type="text" placeholder="Nome do paciente" className="input-field" />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Contacto">
                <input type="text" placeholder="+258 84 000 0000" className="input-field" />
              </Field>
              <Field label="Idade">
                <input type="number" placeholder="0" className="input-field" />
              </Field>
            </div>
            <Field label="Localização">
              <input type="text" placeholder="Ex: Maputo, Matola, Beira..." className="input-field" />
            </Field>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" size="sm" onClick={() => setShowNewClient(false)}>Cancelar</Button>
              <Button size="sm" onClick={() => setShowNewClient(false)}>Salvar Paciente</Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles =
    status === "Concluída"
      ? "bg-success/10 text-success-foreground"
      : status === "Agendada"
        ? "bg-primary/10 text-primary"
        : status === "Cancelada"
          ? "bg-muted text-muted-foreground"
        : "bg-muted text-muted-foreground";
  return (
    <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${styles}`}>
      {status}
    </span>
  );
}

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20" onClick={onClose}>
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-semibold">{title}</h2>
          <button onClick={onClose} className="rounded p-1 hover:bg-accent transition-colors">
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-muted-foreground">{label}</label>
      {children}
    </div>
  );
}
