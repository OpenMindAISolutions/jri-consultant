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
