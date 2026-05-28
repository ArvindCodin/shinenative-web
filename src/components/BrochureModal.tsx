import { useState } from "react";
import { X, Download, MessageCircle, CheckCircle } from "lucide-react";
import { WHATSAPP_NUMBER, COMPANY_BROCHURE_URL } from "../lib/data";

interface BrochureModalProps {
  projectName?: string;
  projectId?: string;
  brochureUrl?: string;
  onClose: () => void;
}

export function BrochureModal({ projectName, projectId, brochureUrl, onClose }: BrochureModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const effectiveBrochureUrl = brochureUrl || COMPANY_BROCHURE_URL;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    setSubmitting(true);
    setError("");

    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          leadType: "brochure_download",
          projectName: projectName ?? undefined,
          projectId: projectId ?? undefined,
          source: "website",
        }),
      });
    } catch {
      // silent — WhatsApp still opens
    }

    const subject = projectName ? `the ${projectName} brochure` : "your company brochure";
    const message = `Hi Shine Native! I'm ${name.trim()} and I'd like to receive ${subject}. My number is ${phone.trim()}.`;
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");

    if (effectiveBrochureUrl) {
      const a = document.createElement("a");
      a.href = effectiveBrochureUrl;
      a.download = projectName ? `${projectName}-brochure.pdf` : "shine-native-brochure.pdf";
      a.target = "_blank";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }

    setSubmitting(false);
    setDone(true);
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {done ? (
          <div className="p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="text-green-600 w-9 h-9" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">WhatsApp Opened!</h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-1">
              Your message to Shine Native is ready to send.
            </p>
            {effectiveBrochureUrl && (
              <p className="text-gray-500 text-sm mb-1">The brochure is also downloading.</p>
            )}
            <p className="text-green-700 text-sm font-medium mt-2">
              Just hit Send on WhatsApp — and you're done.
            </p>
            <button
              onClick={onClose}
              className="mt-6 w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition-colors text-sm"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-gray-100">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {effectiveBrochureUrl ? "Get the Brochure" : "Request Brochure via WhatsApp"}
                </h2>
                <p className="text-gray-500 text-sm mt-0.5">
                  {effectiveBrochureUrl
                    ? "Sent instantly — straight to your WhatsApp."
                    : "We'll send it to you on WhatsApp right away."}
                </p>
              </div>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600 ml-4 mt-0.5">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Your Name</label>
                <input
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">WhatsApp Number</label>
                <input
                  type="tel"
                  placeholder="e.g. 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder-gray-400"
                />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button
                type="submit"
                disabled={submitting || !name.trim() || !phone.trim()}
                className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl transition-colors text-sm"
              >
                {submitting ? (
                  "Opening WhatsApp..."
                ) : (
                  <>
                    <MessageCircle size={17} />
                    {effectiveBrochureUrl ? "Send via WhatsApp & Download" : "Send Message on WhatsApp"}
                  </>
                )}
              </button>

              {effectiveBrochureUrl && (
                <p className="text-center text-xs text-gray-400 flex items-center justify-center gap-1">
                  <Download size={11} /> PDF downloads immediately after
                </p>
              )}

              <p className="text-center text-xs text-gray-400">
                By continuing, you agree to be contacted by Shine Native.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
