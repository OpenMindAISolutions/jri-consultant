/**
 * Everything this app can ask the server for — which is deliberately very little.
 *
 * A consultant reads through four SECURITY DEFINER functions, each of which re-checks the grant
 * itself rather than trusting this client. There are NO table reads here and there should never be
 * one: if a screen needs something new, the right move is a function that decides what a consultant
 * may see, not a query that assumes it.
 */
import { supabase } from './supabase';

async function call<T>(fn: string, args?: Record<string, unknown>): Promise<T> {
  const { data, error } = await supabase.rpc(fn, args);
  if (error) throw new Error(error.message);
  return data as T;
}

export interface Client {
  link_id: string;
  workplace_id: string;
  workplace_name: string;
  entity_type: string | null;
  gstin: string | null;
  firm_name: string | null;
  status: string;
  accepted_at: string | null;
  report_count: number;
}

export interface SharedReport {
  grant_id: string;
  report_key: string;
  financial_year: string | null;
  granted_at: string;
  expires_at: string | null;
  /**
   * When the BUSINESS last opened this report. Surfaced everywhere it is shown, because a snapshot
   * is written when the business views a report — not when it is shared. Figures can be months old
   * and a consultant must never mistake a stale snapshot for today's position.
   */
  last_generated_at: string | null;
  snapshot_count: number;
}

export type OpenedReport =
  | { status: 'no_snapshot'; report_key: string }
  | {
      status: 'ok';
      report_key: string;
      report_name: string;
      period_start: string | null;
      period_end: string | null;
      financial_year: string | null;
      generated_at: string;
      report_data: unknown;
      pdf_url: string | null;
      excel_url: string | null;
    };

export const acceptInvite = (token?: string) =>
  call<{ linked: number }>('accept_consultant_invite', { p_token: token ?? null });

export const myClients = () => call<Client[]>('consultant_my_clients');

export const clientReports = (workplaceId: string) =>
  call<SharedReport[]>('consultant_client_reports', { p_workplace_id: workplaceId });

export const openReport = (workplaceId: string, reportKey: string, financialYear: string | null) =>
  call<OpenedReport>('consultant_open_report', {
    p_workplace_id: workplaceId,
    p_report_key: reportKey,
    p_financial_year: financialYear,
  });

// ── Collaboration ───────────────────────────────────────────────────────────
// Everything below is the consultant's own workspace: requests they made, conversations they are
// in, filings they recorded. None of it is business data, which is why it needs no extra grant.

export interface WorkItem {
  kind: 'document_request' | 'message' | 'obligation';
  link_id: string;
  workplace_id: string;
  workplace_name: string;
  ref_id: string;
  title: string;
  detail: string;
  due_date: string | null;
  created_at: string;
}

export interface DocRequest {
  id: string; title: string; note: string | null; due_date: string | null;
  status: 'open' | 'fulfilled' | 'cancelled';
  requested_at: string; fulfilled_at: string | null; document_path: string | null;
}

export interface ThreadMessage {
  id: number; body: string; created_at: string; author: string | null; mine: boolean;
}

export interface Thread {
  id: string; subject: string; context_type: string; context_key: string | null;
  closed: boolean; last_message_at: string; messages: ThreadMessage[];
}

export interface Filing {
  id: string; title: string; period_label: string | null; filed_at: string;
  acknowledgement_ref: string | null; notes: string | null;
}

export interface ClientActivity {
  link_id: string;
  requests: DocRequest[];
  threads: Thread[];
  filings: Filing[];
  /** False unless the business explicitly opted in — it is NOT implied by sharing a report. */
  share_compliance: boolean;
}

export const myWork = () => call<WorkItem[]>('consultant_my_work');

export const clientActivity = (workplaceId: string) =>
  call<ClientActivity>('consultant_client_activity', { p_workplace_id: workplaceId });

export const requestDocument = (
  linkId: string, title: string, note: string | null, dueDate: string | null,
) => call<string>('consultant_request_document', {
  p_link_id: linkId, p_title: title, p_note: note, p_due_date: dueDate,
});

export const cancelDocumentRequest = (id: string) =>
  call<null>('cancel_consultant_document_request', { p_request_id: id });

export const startThread = (
  linkId: string, subject: string, body: string,
  contextType = 'general', contextKey: string | null = null,
) => call<string>('start_consultant_thread', {
  p_link_id: linkId, p_subject: subject, p_body: body,
  p_context_type: contextType, p_context_key: contextKey,
});

export const postMessage = (threadId: string, body: string) =>
  call<number>('post_consultant_message', { p_thread_id: threadId, p_body: body });

export const recordFiling = (
  linkId: string, title: string, periodLabel: string | null,
  ackRef: string | null, notes: string | null,
) => call<string>('record_consultant_filing', {
  p_link_id: linkId, p_title: title, p_period_label: periodLabel,
  p_acknowledgement_ref: ackRef, p_evidence_path: null, p_notes: notes, p_instance_id: null,
});

// ── Firms ───────────────────────────────────────────────────────────────────

export interface Firm { id: string; name: string; owner_profile_id: string }

export const createFirm = (name: string) => call<string>('create_consultant_firm', { p_name: name });

export const addFirmMember = (firmId: string, email: string) =>
  call<{ status: 'added' | 'no_account'; email?: string }>('add_consultant_firm_member', {
    p_firm_id: firmId, p_email: email,
  });

export const assignLinkToFirm = (linkId: string, firmId: string | null) =>
  call<null>('assign_link_to_firm', { p_link_id: linkId, p_firm_id: firmId });
