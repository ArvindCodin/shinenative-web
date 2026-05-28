const BASE = "https://d707fe43-f159-49ff-ba05-34dbdb912dee-00-vid7aajvjnyd.spock.replit.dev/api";

async function apiFetch<T>(path: string, opts?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json", ...opts?.headers },
    ...opts,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `HTTP ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export type LeadType = "enquiry" | "book_visit" | "nri_desk" | "brochure_download";
export type LeadStatus = "new" | "contacted" | "in_progress" | "converted" | "not_interested";

export interface Lead {
  id: number;
  name: string;
  email?: string | null;
  phone: string;
  message?: string | null;
  projectName?: string | null;
  projectId?: string | null;
  leadType: LeadType;
  status: LeadStatus;
  notes?: string | null;
  visitDate?: string | null;
  source?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateLeadPayload {
  name: string;
  email?: string;
  phone: string;
  message?: string;
  projectName?: string;
  projectId?: string;
  leadType: LeadType;
  visitDate?: string;
  source?: string;
}

export interface LeadsListResponse {
  leads: Lead[];
  total: number;
  page: number;
  limit: number;
}

export interface LeadStatsResponse {
  total: number;
  byStatus: Record<string, number>;
  byType: Record<string, number>;
}

export const api = {
  createLead: (data: CreateLeadPayload) =>
    apiFetch<Lead>("/leads", { method: "POST", body: JSON.stringify(data) }),

  getLeads: (params?: { status?: string; leadType?: string; page?: number; limit?: number }) => {
    const q = new URLSearchParams();
    if (params?.status) q.set("status", params.status);
    if (params?.leadType) q.set("leadType", params.leadType);
    if (params?.page) q.set("page", String(params.page));
    if (params?.limit) q.set("limit", String(params.limit));
    return apiFetch<LeadsListResponse>(`/leads?${q}`);
  },

  getLeadStats: () => apiFetch<LeadStatsResponse>("/leads/stats"),

  updateLead: (id: number, data: { status?: LeadStatus; notes?: string }) =>
    apiFetch<Lead>(`/leads/${id}`, { method: "PATCH", body: JSON.stringify(data) }),

  login: (username: string, password: string) =>
    apiFetch<{ ok: boolean }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    }),

  logout: () => apiFetch<{ ok: boolean }>("/auth/logout", { method: "POST" }),

  getMe: () => apiFetch<{ username: string }>("/auth/me"),
};
