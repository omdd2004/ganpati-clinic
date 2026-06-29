"use client";

import { useEffect, useMemo, useState } from "react";
import { Lock, Search, Trash2, Download, ArrowUpDown, Loader2, LogOut } from "lucide-react";

type Appointment = {
  id: string;
  patient_name: string;
  phone: string;
  age: number | null;
  gender: string | null;
  appointment_date: string;
  appointment_time: string;
  service: string;
  message: string | null;
  created_at: string;
};

type SortKey = keyof Appointment;

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("created_at");
  const [sortAsc, setSortAsc] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [fetchError, setFetchError] = useState("");

  async function fetchAppointments() {
    setFetching(true);
    setFetchError("");
    try {
      const res = await fetch("/api/admin/appointments");
      if (res.status === 401) {
        setAuthed(false);
        return;
      }
      const data = await res.json();
      if (!res.ok) {
        setFetchError(data.error || "Failed to load appointments.");
        return;
      }
      setAppointments(data.appointments || []);
    } catch {
      setFetchError("Network error while loading appointments.");
    } finally {
      setFetching(false);
    }
  }

  useEffect(() => {
    if (authed) fetchAppointments();
  }, [authed]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = await res.json();
        setLoginError(data.error || "Login failed.");
        return;
      }
      setAuthed(true);
      setPassword("");
    } catch {
      setLoginError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this appointment? This cannot be undone.")) return;
    const res = await fetch("/api/admin/appointments", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      setAppointments((prev) => prev.filter((a) => a.id !== id));
    }
  }

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortAsc((v) => !v);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let rows = appointments;
    if (q) {
      rows = rows.filter(
        (a) =>
          a.patient_name.toLowerCase().includes(q) ||
          a.phone.toLowerCase().includes(q) ||
          a.service.toLowerCase().includes(q)
      );
    }
    return [...rows].sort((a, b) => {
      const av = String(a[sortKey] ?? "");
      const bv = String(b[sortKey] ?? "");
      return sortAsc ? av.localeCompare(bv) : bv.localeCompare(av);
    });
  }, [appointments, query, sortKey, sortAsc]);

  function exportCSV() {
    const headers = [
      "Patient Name",
      "Phone",
      "Age",
      "Gender",
      "Date",
      "Time",
      "Service",
      "Message",
      "Created At",
    ];
    const rows = filtered.map((a) => [
      a.patient_name,
      a.phone,
      a.age ?? "",
      a.gender ?? "",
      a.appointment_date,
      a.appointment_time,
      a.service,
      a.message ?? "",
      a.created_at,
    ]);
    const csv = [headers, ...rows]
      .map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
      )
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `appointments-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (!authed) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-surface-soft px-4">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm rounded-2xl bg-white border border-slate-100 shadow-card p-8 space-y-5"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mx-auto">
            <Lock className="h-6 w-6" />
          </div>
          <h1 className="text-center font-heading text-xl font-semibold text-slate-900">
            Admin Login
          </h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-primary outline-none"
            autoFocus
          />
          {loginError && (
            <p className="text-sm font-medium text-accent text-center">{loginError}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-white hover:bg-primary-dark transition-colors disabled:opacity-60"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            Login
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-surface-soft">
      <div className="container-px mx-auto max-w-7xl py-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h1 className="font-heading text-2xl font-semibold text-slate-900">
            Appointments
          </h1>
          <button
            onClick={() => {
              document.cookie = "admin_session=; Max-Age=0; path=/;";
              setAuthed(false);
            }}
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-accent"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, phone, or service"
              className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-2.5 text-sm focus:border-primary outline-none"
            />
          </div>
          <button
            onClick={exportCSV}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal px-5 py-2.5 text-sm font-medium text-white hover:bg-teal-light transition-colors"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </button>
        </div>

        {fetchError && (
          <p className="mb-4 text-sm font-medium text-accent">{fetchError}</p>
        )}

        <div className="rounded-2xl border border-slate-100 bg-white shadow-card overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-left text-slate-500">
                {([
                  ["patient_name", "Patient Name"],
                  ["phone", "Phone"],
                  ["age", "Age"],
                  ["gender", "Gender"],
                  ["appointment_date", "Date"],
                  ["appointment_time", "Time"],
                  ["service", "Service"],
                  ["message", "Message"],
                  ["created_at", "Created At"],
                ] as [SortKey, string][]).map(([key, label]) => (
                  <th key={key} className="px-4 py-3 font-medium whitespace-nowrap">
                    <button
                      onClick={() => toggleSort(key)}
                      className="inline-flex items-center gap-1 hover:text-primary"
                    >
                      {label}
                      <ArrowUpDown className="h-3.5 w-3.5" />
                    </button>
                  </th>
                ))}
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {fetching ? (
                <tr>
                  <td colSpan={10} className="px-4 py-8 text-center text-slate-400">
                    Loading appointments...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={10} className="px-4 py-8 text-center text-slate-400">
                    No appointments found.
                  </td>
                </tr>
              ) : (
                filtered.map((a) => (
                  <tr key={a.id} className="border-b border-slate-50 last:border-0 hover:bg-surface-soft">
                    <td className="px-4 py-3 font-medium text-slate-800 whitespace-nowrap">
                      {a.patient_name}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">{a.phone}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{a.age ?? "—"}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{a.gender ?? "—"}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{a.appointment_date}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{a.appointment_time}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{a.service}</td>
                    <td className="px-4 py-3 max-w-xs truncate">{a.message || "—"}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-slate-500">
                      {new Date(a.created_at).toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleDelete(a.id)}
                        className="text-slate-400 hover:text-accent"
                        aria-label="Delete appointment"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
