import { useState, useEffect, useCallback } from "react";
import {
  LogOut, Users, Phone, Mail, Calendar, MessageSquare,
  RefreshCw, CheckCircle, Clock, XCircle, TrendingUp, Filter
} from "lucide-react";
import { api, type Lead, type LeadStatus } from "../lib/api";

const statusConfig: Record<LeadStatus, { label: string; color: string; icon: React.ReactNode }> = {
  new: { label: "New", color: "bg-blue-100 text-blue-800", icon: <Clock size={12} /> },
  contacted: { label: "Contacted", color: "bg-yellow-100 text-yellow-800", icon: <Phone size={12} /> },
  in_progress: { label: "In Progress", color: "bg-purple-100 text-purple-800", icon: <TrendingUp size={12} /> },
  converted: { label: "Converted", color: "bg-green-100 text-green-800", icon: <CheckCircle size={12} /> },
  not_interested: { label: "Not Interested", color: "bg-red-100 text-red-800", icon: <XCircle size={12} /> },
};

const leadTypeLabels: Record<string, string> = {
  enquiry: "Enquiry",
  book_visit: "Site Visit",
  nri_desk: "NRI Desk",
  brochure_download: "Brochure",
};

function LoginForm({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      await api.login(username, password);
      onLogin();
    } catch {
      setError("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-amber-600 rounded-sm flex items-center justify-center">
            <span className="text-white font-bold text-sm">SN</span>
          </div>
          <span className="font-bold text-xl text-gray-900">Admin Panel</span>
        </div>
        <p className="text-gray-500 text-sm mb-6">Sign in to manage your leads and enquiries.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

function LeadCard({ lead, onUpdate }: { lead: Lead; onUpdate: (id: number, status: LeadStatus, notes: string) => void }) {
  const [notes, setNotes] = useState(lead.notes ?? "");
  const [status, setStatus] = useState<LeadStatus>(lead.status);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await onUpdate(lead.id, status, notes);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const sc = statusConfig[status];

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold text-gray-900">{lead.name}</h3>
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
              {leadTypeLabels[lead.leadType] ?? lead.leadType}
            </span>
          </div>
          {lead.projectName && (
            <p className="text-xs text-amber-700 font-medium mt-0.5">{lead.projectName}</p>
          )}
        </div>
        <span className={`text-xs px-2.5 py-1 rounded-full font-medium flex items-center gap-1 whitespace-nowrap ${sc.color}`}>
          {sc.icon} {sc.label}
        </span>
      </div>

      <div className="space-y-1.5 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Phone size={13} className="text-gray-400" />
          <a href={`tel:${lead.phone}`} className="hover:text-amber-600">{lead.phone}</a>
        </div>
        {lead.email && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Mail size={13} className="text-gray-400" />
            <a href={`mailto:${lead.email}`} className="hover:text-amber-600">{lead.email}</a>
          </div>
        )}
        {lead.visitDate && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar size={13} className="text-gray-400" />
            <span>Visit: {lead.visitDate}</span>
          </div>
        )}
        {lead.message && (
          <div className="flex items-start gap-2 text-sm text-gray-600">
            <MessageSquare size={13} className="text-gray-400 mt-0.5" />
            <span className="line-clamp-2">{lead.message}</span>
          </div>
        )}
        <p className="text-xs text-gray-400">
          {new Date(lead.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
        </p>
      </div>

      <div className="space-y-2">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as LeadStatus)}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
        >
          {Object.entries(statusConfig).map(([key, val]) => (
            <option key={key} value={key}>{val.label}</option>
          ))}
        </select>
        <textarea
          placeholder="Add notes (follow-up details, etc.)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={2}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
        />
        <button
          onClick={handleSave}
          disabled={saving}
          className={`w-full py-2 rounded-lg text-sm font-semibold transition-colors ${
            saved ? "bg-green-500 text-white" : "bg-amber-600 hover:bg-amber-700 text-white"
          } disabled:opacity-60`}
        >
          {saved ? "✓ Saved" : saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}

export function AdminPage() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [username, setUsername] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [total, setTotal] = useState(0);
  const [stats, setStats] = useState<{ total: number; byStatus: Record<string, number>; byType: Record<string, number> } | null>(null);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [page, setPage] = useState(1);

  const checkAuth = useCallback(async () => {
    try {
      const me = await api.getMe();
      setUsername(me.username);
      setAuthed(true);
    } catch {
      setAuthed(false);
    }
  }, []);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.getLeads({
        status: statusFilter || undefined,
        leadType: typeFilter || undefined,
        page,
        limit: 20,
      });
      setLeads(res.leads);
      setTotal(res.total);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, [statusFilter, typeFilter, page]);

  const fetchStats = useCallback(async () => {
    try {
      const s = await api.getLeadStats();
      setStats(s);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => { void checkAuth(); }, [checkAuth]);
  useEffect(() => { if (authed) { void fetchLeads(); void fetchStats(); } }, [authed, fetchLeads, fetchStats]);

  const handleLogout = async () => {
    await api.logout();
    setAuthed(false);
  };

  const handleUpdate = async (id: number, status: LeadStatus, notes: string) => {
    await api.updateLead(id, { status, notes });
    setLeads((prev) => prev.map((l) => l.id === id ? { ...l, status, notes } : l));
    void fetchStats();
  };

  if (authed === null) {
    return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-amber-600 border-t-transparent rounded-full animate-spin" /></div>;
  }

  if (!authed) {
    return <LoginForm onLogin={() => { setAuthed(true); void checkAuth(); }} />;
  }

  const newCount = stats?.byStatus?.new ?? leads.filter((l) => l.status === "new").length;
  const visitCount = stats?.byType?.book_visit ?? leads.filter((l) => l.leadType === "book_visit").length;
  const convertedCount = stats?.byStatus?.converted ?? leads.filter((l) => l.status === "converted").length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={`${import.meta.env.BASE_URL}shine-native-logo.png`} alt="Shine Native" className="h-8 w-auto" />
            <span className="font-bold text-gray-900 hidden sm:block">Lead Dashboard</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500 hidden sm:block">{username}</span>
            <button onClick={handleLogout} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-500 transition-colors">
              <LogOut size={15} /> Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats — accurate counts from the full database */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Leads", value: stats?.total ?? total, color: "bg-blue-600", icon: <Users size={20} className="text-white" /> },
            { label: "New / Unread", value: newCount, color: "bg-amber-500", icon: <Clock size={20} className="text-white" /> },
            { label: "Site Visits", value: visitCount, color: "bg-purple-600", icon: <Calendar size={20} className="text-white" /> },
            { label: "Converted", value: convertedCount, color: "bg-green-600", icon: <CheckCircle size={20} className="text-white" /> },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg ${s.color} flex items-center justify-center shrink-0`}>{s.icon}</div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{s.value}</p>
                <p className="text-xs text-gray-500">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Filter size={14} /> Filters:
          </div>
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="">All Statuses</option>
            {Object.entries(statusConfig).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
          </select>
          <select
            value={typeFilter}
            onChange={(e) => { setTypeFilter(e.target.value); setPage(1); }}
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="">All Types</option>
            {Object.entries(leadTypeLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
          <button
            onClick={() => void fetchLeads()}
            className="ml-auto flex items-center gap-1.5 text-sm text-gray-600 hover:text-amber-600 border border-gray-200 rounded-lg px-3 py-1.5 hover:border-amber-300 transition-colors"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} /> Refresh
          </button>
        </div>

        {/* Leads Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-amber-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : leads.length === 0 ? (
          <div className="text-center py-20">
            <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-400 text-lg">No leads yet</p>
            <p className="text-gray-300 text-sm mt-1">Leads from the website will appear here.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {leads.map((lead) => (
                <LeadCard key={lead.id} lead={lead} onUpdate={handleUpdate} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">Showing {leads.length} of {total}</p>
              <div className="flex gap-2">
                <button
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm disabled:opacity-40 hover:border-amber-400 transition-colors"
                >
                  Previous
                </button>
                <button
                  disabled={page * 20 >= total}
                  onClick={() => setPage(page + 1)}
                  className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm disabled:opacity-40 hover:border-amber-400 transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
