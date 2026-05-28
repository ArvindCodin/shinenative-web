import { useState } from "react";
import { api, type LeadType } from "../lib/api";
import { CheckCircle, Loader2 } from "lucide-react";

interface LeadFormProps {
  leadType: LeadType;
  projectName?: string;
  projectId?: string;
  title?: string;
  subtitle?: string;
  showVisitDate?: boolean;
  dark?: boolean;
  onSuccess?: () => void;
}

export function LeadForm({
  leadType,
  projectName,
  projectId,
  title,
  subtitle,
  showVisitDate = false,
  dark = false,
  onSuccess,
}: LeadFormProps) {
  const inputCls = dark
    ? "w-full bg-white/10 border border-white/20 text-white placeholder-white/50 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
    : "w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent";
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "", visitDate: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) { setError("Name and phone are required."); return; }
    setLoading(true); setError("");
    try {
      await api.createLead({
        ...form,
        leadType,
        projectName,
        projectId,
        source: "website",
      });
      setSuccess(true);
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center gap-3">
        <CheckCircle className="text-green-500 w-12 h-12" />
        <h3 className={`text-lg font-semibold ${dark ? "text-white" : "text-gray-900"}`}>Thank you!</h3>
        <p className={`text-sm ${dark ? "text-white/70" : "text-gray-500"}`}>Our team will get in touch with you shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {title && <h3 className={`text-xl font-bold ${dark ? "text-white" : "text-gray-900"}`}>{title}</h3>}
      {subtitle && <p className={`text-sm ${dark ? "text-white/70" : "text-gray-500"}`}>{subtitle}</p>}

      <div>
        <input
          type="text"
          placeholder="Full Name *"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className={inputCls}
          required
        />
      </div>
      <div>
        <input
          type="tel"
          placeholder="Phone Number *"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className={inputCls}
          required
        />
      </div>
      <div>
        <input
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className={inputCls}
        />
      </div>

      {showVisitDate && (
        <div>
          <label className={`text-xs mb-1 block ${dark ? "text-white/70" : "text-gray-500"}`}>Preferred Visit Date</label>
          <input
            type="date"
            value={form.visitDate}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setForm({ ...form, visitDate: e.target.value })}
            className={inputCls}
          />
        </div>
      )}

      <div>
        <textarea
          placeholder="Message (optional)"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          rows={3}
          className={`${inputCls} resize-none`}
        />
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
      >
        {loading ? <Loader2 className="animate-spin w-4 h-4" /> : null}
        {loading ? "Sending..." : "Submit Enquiry"}
      </button>

      <p className={`text-xs text-center ${dark ? "text-white/40" : "text-gray-400"}`}>
        By submitting, you agree to be contacted by Shine Native.
      </p>
    </form>
  );
}
