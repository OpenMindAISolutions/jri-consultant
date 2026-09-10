import { supabase } from './supabase';
import type { Database } from './database.types';

type RpcName = keyof Database['public']['Functions'];

async function call<T>(fn: RpcName, args?: Record<string, unknown>): Promise<T> {
  const { data, error } = await supabase.rpc(fn, args as never);
  if (error) throw new Error(error.message);
  return data as T;
}

/**
 * The WhatsApp conversations.
 *
 * ★ THE 24-HOUR WINDOW IS THE ONE THING THIS MODULE EXISTS TO SURFACE. Meta lets you reply in
 * plain text for 24 hours after the client's last message; after that only an approved template
 * may be sent. It is not a soft rule — the API refuses — so a screen that offers a text box to a
 * consultant whose window has closed is a screen that promises a reply it cannot deliver.
 *
 * `window.open` therefore decides what the composer is, not merely what it says. The server sends
 * the state back on every thread and every list row so the UI never computes it from a timestamp
 * and never disagrees with the database about whether a message can go.
 */

export interface WindowState {
  open: boolean;
  expires_at: string | null;
  minutes_left: number;
}

export interface InboxThread {
  id: string;
  connection_id: string;
  phone_e164: string;
  display_name: string | null;
  client_id: string | null;
  client_name: string | null;
  workplace_id: string | null;
  workplace_name: string | null;
  status: 'open' | 'closed';
  unread_count: number;
  last_message_at: string | null;
  last_inbound_at: string | null;
  window: WindowState;
  last_message: {
    direction: 'in' | 'out';
    at: string | null;
    snippet: string | null;
    message_type: string | null;
    status: string | null;
  } | null;
}

export interface ThreadEntry {
  direction: 'in' | 'out';
  /** Collision-free across the two source tables — inbound ids and message ids both start at 1. */
  key: string;
  id: number;
  at: string;
  body: string | null;
  snippet: string | null;
  message_type: string | null;
  status: string | null;
  provider_message_id: string | null;
  template_name?: string | null;
  template?: boolean;
  purpose?: string | null;
  error?: string | null;
  delivered_at?: string | null;
  read_at?: string | null;
  delivery?: unknown;
  media_id?: string | null;
  media_mime?: string | null;
}

export interface ThreadDetail {
  thread: InboxThread;
  window: WindowState;
  entries: ThreadEntry[];
}

export const inbox = () => call<{ threads: InboxThread[] } | InboxThread[]>('consultant_inbox')
  .then((r) => (Array.isArray(r) ? r : r.threads ?? []));

export const thread = (threadId: string) =>
  call<ThreadDetail>('consultant_thread', { p_thread_id: threadId });

export const markThreadRead = (threadId: string) =>
  call<null>('consultant_mark_thread_read', { p_thread_id: threadId });

export const linkThreadClient = (threadId: string, clientId: string | null) =>
  call<null>('consultant_link_thread_client', { p_thread_id: threadId, p_client_id: clientId });

/**
 * A free-form reply. Refused by the database when the window has closed, which is the behaviour
 * this app relies on rather than duplicating: the UI hides the box, and the server is what makes
 * hiding it true.
 */
export const replyToThread = (threadId: string, body: string) =>
  call<number>('consultant_queue_whatsapp_reply', { p_thread_id: threadId, p_body: body });
