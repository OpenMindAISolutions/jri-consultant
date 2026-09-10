/**
 * Everything this app can ask the server for — which is deliberately very little.
 *
 * A consultant reads through four SECURITY DEFINER functions, each of which re-checks the grant
 * itself rather than trusting this client. There are NO table reads here and there should never be
 * one: if a screen needs something new, the right move is a function that decides what a consultant
 * may see, not a query that assumes it.
 */
import { supabase } from './supabase';

import type { Database } from './database.types';

/** Every function the database actually exposes. A typo in a name is now a build error. */
type RpcName = keyof Database['public']['Functions'];

/**
 * One call, one place to decide what a failure means.
 *
 * THE NAME IS CHECKED, THE ARGUMENTS ARE CAST, AND THAT IS A DELIBERATE SPLIT. A mistyped function
 * name is the failure worth catching at build time — it is invisible until a consultant clicks the
 * thing and gets "function does not exist". Argument shapes are cast because the generated types
 * describe a jsonb return as `Json`, while the interfaces below say what the JSON actually contains;
 * accepting the generated shape would mean throwing away the more precise type in exchange for a
 * weaker one. The generated names give the safety; the hand-written interfaces give the meaning.
 */
async function call<T>(fn: RpcName, args?: Record<string, unknown>): Promise<T> {
  const { data, error } = await supabase.rpc(fn, args as never);
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

export interface MyFirm {
  id: string;
  name: string;
  owner_profile_id: string;
  is_owner: boolean;
  members: { profile_id: string; name: string; email: string; role: string; added_at: string }[];
  /** Client links already handed to the firm, so a list can render its toggle from one call. */
  firm_link_ids: string[];
}

/**
 * The firm you own or belong to, or null.
 *
 * Until this existed, `firmId` lived only in the component state that `createFirm` set — so a
 * reload lost it, the add-colleague block behind it disappeared, and nothing could ever learn a
 * firm id to hand a client to a junior with.
 */
export const myFirm = () => call<MyFirm | null>('consultant_my_firm');

// ── WhatsApp: the consultant's OWN account ──────────────────────────────────
// Never workplace-scoped. Their number, their Meta account, their consent obligation.

export interface WaTemplate {
  id: string; template_name: string; purpose: string;
  language_code: string; approved: boolean; body_preview: string | null;
}
export interface WaOptin {
  phone_e164: string; display_name: string | null;
  workplace_id: string | null; active: boolean;
}
export interface WaMessage {
  phone_e164: string; purpose: string | null; status: string;
  error: string | null; created_at: string;
}
export type WhatsAppOverview =
  | { connected: false }
  | {
      connected: true;
      connection: {
        id: string; provider: 'meta_direct' | 'bsp'; display_name: string | null;
        phone_e164: string | null; status: string; last_error: string | null;
        owned_by_firm: boolean;
      };
      templates: WaTemplate[];
      optins: WaOptin[];
      recent: WaMessage[];
    };

export const whatsappOverview = () => call<WhatsAppOverview>('consultant_whatsapp_overview');

/** The access token is written straight into the database and encrypted there — it is never read back. */
export const connectWhatsApp = (p: {
  provider: 'meta_direct' | 'bsp';
  displayName?: string; phoneE164?: string;
  phoneNumberId?: string; businessAccountId?: string; accessToken?: string;
  bspName?: string; bspReference?: string; firmId?: string | null;
}) => call<string>('connect_consultant_whatsapp', {
  p_provider: p.provider, p_display_name: p.displayName ?? null, p_phone_e164: p.phoneE164 ?? null,
  p_phone_number_id: p.phoneNumberId ?? null, p_business_account_id: p.businessAccountId ?? null,
  p_access_token: p.accessToken ?? null, p_bsp_name: p.bspName ?? null,
  p_bsp_reference: p.bspReference ?? null, p_firm_id: p.firmId ?? null,
});

export const disconnectWhatsApp = (connectionId: string) =>
  call<null>('disconnect_consultant_whatsapp', { p_connection_id: connectionId });

export const saveWhatsAppTemplate = (
  connectionId: string, templateName: string, purpose: string,
  language = 'en', bodyPreview: string | null = null, approved = false,
) => call<string>('upsert_consultant_whatsapp_template', {
  p_connection_id: connectionId, p_template_name: templateName, p_purpose: purpose,
  p_language_code: language, p_body_preview: bodyPreview, p_approved: approved,
});

export const recordOptin = (
  connectionId: string, phone: string, displayName: string | null, workplaceId: string | null = null,
) => call<string>('record_whatsapp_optin', {
  p_connection_id: connectionId, p_phone_e164: phone,
  p_display_name: displayName, p_workplace_id: workplaceId,
});

export const recordOptout = (connectionId: string, phone: string) =>
  call<null>('record_whatsapp_optout', { p_connection_id: connectionId, p_phone_e164: phone });
