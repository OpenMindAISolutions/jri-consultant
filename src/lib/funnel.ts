/**
 * The off-platform side of the practice: businesses a consultant manages that are NOT on JRI.
 *
 * WHY THIS IS A SEPARATE MODULE FROM api.ts. Everything in api.ts reads a business's OWN data
 * through a grant that business gave — the consultant is a guest there, and the copy on those
 * screens says so. Nothing here involves a grant at all: these are the consultant's private records
 * about somebody who has no JRI account and cannot see any of it. Two different trust stories, two
 * different files, so a future reader cannot mistake one for the other.
 *
 * The same discipline as api.ts otherwise: no table reads, only SECURITY DEFINER functions that
 * re-check ownership themselves. Storage is the single exception, and it is not really one — the
 * bucket's own policies call the same `consultant_holds_client()` the functions do.
 */
import { supabase } from './supabase';

async function call<T>(fn: string, args?: Record<string, unknown>): Promise<T> {
  const { data, error } = await supabase.rpc(fn, args);
  if (error) throw new Error(error.message);
  return data as T;
}

/** The private bucket. Every object's first path segment IS the client id — the storage policies
 *  read authority out of that segment, so a path that does not start with it is unreachable bytes. */
const BUCKET = 'consultant-client-files';

export interface ManagedClient {
  id: string;
  name: string;
  contact_name: string | null;
  phone_e164: string | null;
  email: string | null;
  gstin: string | null;
  pan: string | null;
  entity_type: string | null;
  city: string | null;
  state: string | null;
  notes: string | null;
  status: 'active' | 'archived';
  firm_id: string | null;
  /** False when this client belongs to a colleague and reaches you through the firm. */
  is_owner: boolean;
  /** Non-null once this business signed up for JRI. THE funnel metric. */
  converted_workplace_id: string | null;
  converted_at: string | null;
  file_count: number;
  open_reminder_count: number;
  next_due_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface ClientFile {
  id: string;
  client_id: string;
  title: string;
  storage_path: string;
  mime_type: string | null;
  size_bytes: number | null;
  uploaded_by: string | null;
  created_at: string;
}

export interface ClientReminder {
  id: string;
  client_id: string;
  title: string;
  note: string | null;
  due_date: string;
  channel: 'whatsapp' | 'email' | 'none';
  status: 'scheduled' | 'sent' | 'cancelled';
  sent_at: string | null;
  created_at: string;
  /** Set only on reminders the compliance calendar generated; null on hand-written ones. */
  catalogue_key?: string | null;
  period_label?: string | null;
}

export interface ManagedClientDetail {
  client: Omit<ManagedClient, 'is_owner' | 'file_count' | 'open_reminder_count' | 'next_due_date'>;
  is_owner: boolean;
  converted_workplace_name: string | null;
  files: ClientFile[];
  reminders: ClientReminder[];
}

export interface SaveClientInput {
  clientId?: string | null;
  name: string;
  contactName?: string | null;
  phoneE164?: string | null;
  email?: string | null;
  gstin?: string | null;
  pan?: string | null;
  entityType?: string | null;
  city?: string | null;
  state?: string | null;
  notes?: string | null;
  firmId?: string | null;
}

export const myManagedClients = () => call<ManagedClient[]>('consultant_my_managed_clients');

/**
 * Insert or update. THE SAVE IS AN OVERWRITE, NOT A MERGE — an omitted field is written as null and
 * therefore CLEARS the stored value. That is the function's documented contract, which means every
 * caller must post the whole record, not a patch. A form that sends only what changed would quietly
 * wipe the rest of the client.
 */
export const saveClient = (i: SaveClientInput) =>
  call<string>('consultant_save_client', {
    p_name: i.name,
    p_client_id: i.clientId ?? null,
    p_contact_name: i.contactName ?? null,
    p_phone_e164: i.phoneE164 ?? null,
    p_email: i.email ?? null,
    p_gstin: i.gstin ?? null,
    p_pan: i.pan ?? null,
    p_entity_type: i.entityType ?? null,
    p_city: i.city ?? null,
    p_state: i.state ?? null,
    p_notes: i.notes ?? null,
    p_firm_id: i.firmId ?? null,
  });

export const managedClientDetail = (clientId: string) =>
  call<ManagedClientDetail>('consultant_client_detail', { p_client_id: clientId });

export const archiveClient = (clientId: string) =>
  call<null>('consultant_archive_client', { p_client_id: clientId });

export const addReminder = (
  clientId: string, title: string, dueDate: string,
  note: string | null = null, channel: 'whatsapp' | 'email' | 'none' = 'whatsapp',
) => call<string>('consultant_add_client_reminder', {
  p_client_id: clientId, p_title: title, p_due_date: dueDate, p_note: note, p_channel: channel,
});

export const cancelReminder = (id: string) =>
  call<null>('consultant_cancel_client_reminder', { p_id: id });

/** Records that this off-platform business is now a JRI workplace. `converted_at` is set once. */
export const convertClient = (clientId: string, workplaceId: string) =>
  call<{
    id: string; name: string; converted_workplace_id: string;
    converted_at: string; workplace_name: string | null;
  }>('consultant_convert_client', { p_client_id: clientId, p_workplace_id: workplaceId });

// ── Payment details ─────────────────────────────────────────────────────────

export interface PaymentDetails {
  owner_profile_id: string;
  firm_id: string | null;
  upi_id: string | null;
  bank_account_name: string | null;
  bank_account_number: string | null;
  bank_ifsc: string | null;
  payment_note: string | null;
  updated_at: string;
  /** `own` when these are yours; `firm` when you are reading the principal's published set. */
  source: 'own' | 'firm';
}

export const myPaymentDetails = () => call<PaymentDetails | null>('consultant_my_payment_details');

export const savePaymentDetails = (p: {
  upiId?: string | null; bankAccountName?: string | null; bankAccountNumber?: string | null;
  bankIfsc?: string | null; paymentNote?: string | null; firmId?: string | null;
}) => call<null>('consultant_save_payment_details', {
  p_upi_id: p.upiId ?? null,
  p_bank_account_name: p.bankAccountName ?? null,
  p_bank_account_number: p.bankAccountNumber ?? null,
  p_bank_ifsc: p.bankIfsc ?? null,
  p_payment_note: p.paymentNote ?? null,
  p_firm_id: p.firmId ?? null,
});

// ── Files ───────────────────────────────────────────────────────────────────

/**
 * A storage key that will not be rejected and will not collide.
 *
 * Supabase Storage keys are URL path segments: a `#` truncates the object name, and a file called
 * "Balance Sheet (final) ✓.pdf" either fails to upload or comes back unfetchable. The timestamp
 * prefix is not decoration — two people uploading "invoice.pdf" for the same client on the same day
 * would otherwise be one upload overwriting the other, and the row that pointed at the first would
 * silently start serving the second.
 */
function storageKey(clientId: string, fileName: string): string {
  const dot = fileName.lastIndexOf('.');
  const ext = dot > 0 ? fileName.slice(dot + 1).toLowerCase().replace(/[^a-z0-9]/g, '') : '';
  const stem = (dot > 0 ? fileName.slice(0, dot) : fileName)
    .normalize('NFKD')
    .replace(/[^a-zA-Z0-9._-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60) || 'file';
  return `${clientId}/${Date.now()}-${stem}${ext ? `.${ext}` : ''}`;
}

/**
 * Upload the bytes, then index them.
 *
 * ORDER MATTERS AND SO DOES THE CLEANUP. The row is written second because a row pointing at bytes
 * that are not there is a broken download for a consultant who thinks the document is filed. If the
 * row fails after the bytes landed, the object is removed again — an orphaned object in a private
 * bucket is invisible, unbilled to anybody's attention, and impossible to find later.
 */
export async function uploadClientFile(
  clientId: string, file: File, title?: string | null,
): Promise<string> {
  const path = storageKey(clientId, file.name);
  const { error: upErr } = await supabase.storage.from(BUCKET).upload(path, file, {
    contentType: file.type || 'application/octet-stream',
    upsert: false,
  });
  if (upErr) throw new Error(upErr.message);

  try {
    return await call<string>('consultant_add_client_file', {
      p_client_id: clientId,
      p_title: (title ?? '').trim() || file.name,
      p_storage_path: path,
      p_mime_type: file.type || null,
      p_size_bytes: file.size,
    });
  } catch (e) {
    await supabase.storage.from(BUCKET).remove([path]).catch(() => { /* nothing left to do */ });
    throw e;
  }
}

/**
 * A short-lived URL for one file.
 *
 * The bucket is private, so there is no permanent URL to hold — by design: these are somebody's
 * bank statements, held for a person who has no account here and cannot audit who read them. Sixty
 * seconds is long enough to open and not long enough to paste into a chat and forget.
 */
export async function signedFileUrl(path: string): Promise<string> {
  const { data, error } = await supabase.storage.from(BUCKET).createSignedUrl(path, 60);
  if (error) throw new Error(error.message);
  return data.signedUrl;
}

export function prettyBytes(n: number | null | undefined): string {
  if (n == null || !Number.isFinite(n)) return '—';
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(0)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}

// ── Phase 4: the compliance calendar ────────────────────────────────────────

/**
 * The tags that decide which statutory obligations apply.
 *
 * ONLY TWO OF THESE CAN BE DERIVED from what a client record holds — a GSTIN means GST-registered,
 * and the entity type separates a company from everybody else. The rest are facts nobody has told
 * us: whether they deduct TDS, whether they have employees on PF or ESI, whether they opted into
 * QRMP, whether they crossed the audit threshold. Generating a payroll calendar for a business with
 * no employees is precisely the noise that teaches a consultant to stop reading the calendar, so
 * these are asked for rather than assumed.
 */
export const OBLIGATION_TAGS = [
  { id: 'gst_regular', label: 'GST — monthly filer', hint: 'GSTR-1 and GSTR-3B every month' },
  { id: 'gst_qrmp', label: 'GST — QRMP (quarterly)', hint: 'Instead of monthly, not as well as' },
  { id: 'gst_composition', label: 'GST — composition', hint: 'CMP-08 each quarter' },
  { id: 'tds_deductor', label: 'Deducts TDS', hint: 'Monthly challan and quarterly returns' },
  { id: 'has_employees_pf', label: 'Has EPF employees', hint: 'ECR by the 15th' },
  { id: 'has_employees_esi', label: 'Has ESI employees', hint: 'Contribution by the 15th' },
  { id: 'company', label: 'Is a company', hint: 'AOC-4, MGT-7, DIR-3 KYC, DPT-3' },
  { id: 'individual_or_firm', label: 'Files a personal/firm return', hint: 'ITR by 31 July' },
  { id: 'audit_case', label: 'Under tax audit', hint: 'Form 3CD and a 31 October return' },
] as const;

export interface ObligationRow {
  key: string;
  label: string;
  authority: string;
  rule: 'month_plus' | 'quarter_plus' | 'fy_fixed';
  applies_when: string[];
  note: string | null;
}

export interface GeneratedCalendar {
  created: number;
  skipped: number;
  tags_used: string[];
  items: { key: string; title: string; period: string; due_date: string }[];
}

/**
 * Fill a client's calendar from the statutory catalogue.
 *
 * IDEMPOTENT BY DESIGN — a consultant will press this twice, because they cannot remember whether
 * they already did. The second run reports everything as `skipped` and writes nothing.
 *
 * The dates are STATUTORY. CBIC and CBDT extend deadlines by notification most years and nothing
 * here tracks an extension, which is why the screen says so next to the button rather than in a
 * help page nobody opens.
 */
export const generateCalendar = (
  clientId: string, from: string, to: string, tags: string[] | null = null,
) => call<GeneratedCalendar>('consultant_generate_client_calendar', {
  p_client_id: clientId, p_from: from, p_to: to, p_tags: tags,
});

export async function obligationCatalogue(): Promise<ObligationRow[]> {
  // The one direct table read in this app, and it is reference data: no client, no consultant, no
  // business in it — just the statute. RLS grants every authenticated user select and nobody insert.
  const { data, error } = await supabase
    .from('consultant_obligation_catalogue')
    .select('key, label, authority, rule, applies_when, note')
    .eq('active', true)
    .order('label');
  if (error) throw new Error(error.message);
  return (data ?? []) as ObligationRow[];
}

// ── Phase 4: practice reports ───────────────────────────────────────────────

export type ReportKind = 'book' | 'funnel' | 'reminders' | 'documents';

export interface BookReport {
  kind: 'book';
  window: string;
  totals: { clients: number; active: number; archived: number; converted: number; files: number };
  rows: {
    id: string; name: string; status: string; city: string | null; entity_type: string | null;
    has_gstin: boolean; file_count: number; open_reminders: number; next_due_date: string | null;
    converted: boolean; converted_at: string | null; created_at: string;
  }[];
}

export interface FunnelReport {
  kind: 'funnel';
  window: { from: string; to: string; applies_to: string };
  totals: {
    clients: number; converted: number; conversion_rate_pct: number;
    avg_days_to_convert: number | null; median_days_to_convert: number | null;
  };
  by_month: { month: string; converted: number }[];
  recent: { name: string; converted_at: string; days_to_convert: number | null }[];
}

export interface RemindersReport {
  kind: 'reminders';
  window: { from: string; to: string; applies_to: string };
  totals: {
    scheduled: number; sent: number; cancelled: number; overdue: number;
    generated: number; hand_written: number;
  };
  next_due: { client: string; title: string; due_date: string; period: string | null; overdue: boolean }[];
  by_obligation: {
    key: string; label: string; scheduled: number; sent: number; cancelled: number; overdue: number;
  }[];
}

export interface DocumentsReport {
  kind: 'documents';
  window: { from: string; to: string; applies_to: string };
  totals: { files: number; bytes: number; clients_with_files: number };
  by_client: { client: string; files: number; bytes: number }[];
  recent: { client: string; title: string; size_bytes: number | null; created_at: string }[];
}

export type PracticeReport = BookReport | FunnelReport | RemindersReport | DocumentsReport;

export const practiceReport = (kind: ReportKind, from?: string | null, to?: string | null) =>
  call<PracticeReport>('consultant_practice_report', {
    p_kind: kind, p_from: from ?? null, p_to: to ?? null,
  });
