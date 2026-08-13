/**
 * Frontend API client for the Fireflies Clone backend.
 *
 * Design decisions:
 * - All mutations send JSON request bodies (never query params for data).
 * - Search uses URLSearchParams so special characters are safely encoded.
 * - 204 No Content responses have no body — we check ok and return void.
 * - Each function throws with a descriptive message so callers can surface
 *   the error in the UI without parsing response bodies themselves.
 */

const API_BASE = "http://127.0.0.1:8000";

// ── Types ──────────────────────────────────────────────────────────────────────

export interface TranscriptSegment {
  id: number;
  meeting_id: number;
  speaker_name: string;
  start_time: number;
  end_time: number;
  text: string;
}

export interface ActionItem {
  id: number;
  meeting_id: number;
  description: string;
  is_completed: boolean;
  assignee: string | null;
}

export interface Participant {
  id: number;
  meeting_id: number;
  name: string;
}

export interface Meeting {
  id: number;
  title: string;
  meeting_date: string;
  duration_seconds: number;
  audio_url: string | null;
  summary: string | null;
  status: string;
  created_at: string;
  updated_at: string | null;
  participants: Participant[];
  transcript_segments: TranscriptSegment[];
  action_items: ActionItem[];
}

export interface CreateMeetingPayload {
  title: string;
  meeting_date: string;
  duration_seconds: number;
  audio_url?: string;
  summary?: string;
  participants?: { name: string }[];
  transcript_segments?: {
    speaker_name: string;
    start_time: number;
    end_time: number;
    text: string;
  }[];
  action_items?: { description: string; is_completed?: boolean; assignee?: string }[];
}

// ── Meetings ───────────────────────────────────────────────────────────────────

/** List all meetings, optionally filtered by search term (searches title, summary, participant names). */
export async function getMeetings(search?: string): Promise<Meeting[]> {
  const params = new URLSearchParams();
  if (search?.trim()) params.set("search", search.trim());
  const url = `${API_BASE}/meetings/${params.toString() ? `?${params}` : ""}`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch meetings (${res.status})`);
  return res.json();
}

/** Fetch a single meeting by ID with all nested data. */
export async function getMeetingById(id: string | number): Promise<Meeting> {
  const res = await fetch(`${API_BASE}/meetings/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`Meeting ${id} not found (${res.status})`);
  return res.json();
}

/** Create a new meeting with all nested resources in one call. */
export async function createMeeting(payload: CreateMeetingPayload): Promise<Meeting> {
  const res = await fetch(`${API_BASE}/meetings/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail ?? `Failed to create meeting (${res.status})`);
  }
  return res.json();
}

/**
 * Partially update a meeting (PATCH semantics).
 * Only fields you include in `updates` are changed on the server.
 */
export async function updateMeeting(
  id: string | number,
  updates: { title?: string; meeting_date?: string; duration_seconds?: number; summary?: string }
): Promise<Meeting> {
  const res = await fetch(`${API_BASE}/meetings/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail ?? `Failed to update meeting (${res.status})`);
  }
  return res.json();
}

/** Convenience wrapper — only update the title. */
export async function updateMeetingTitle(id: string | number, title: string): Promise<Meeting> {
  return updateMeeting(id, { title });
}

/**
 * Delete a meeting. The server returns 204 No Content on success.
 * All child records (participants, segments, action items) are cascade-deleted.
 */
export async function deleteMeeting(id: string | number): Promise<void> {
  const res = await fetch(`${API_BASE}/meetings/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(`Failed to delete meeting (${res.status})`);
}

// ── Action Items ───────────────────────────────────────────────────────────────

/** Add an action item to a meeting via JSON body (not query params). */
export async function createActionItem(meetingId: number, description: string): Promise<ActionItem> {
  const res = await fetch(`${API_BASE}/meetings/${meetingId}/action_items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ description }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail ?? `Failed to create action item (${res.status})`);
  }
  return res.json();
}

/**
 * Toggle (or update) an action item via PATCH with a JSON body.
 * meetingId is required because the route is nested under /meetings/{id}.
 */
export async function toggleActionItem(
  meetingId: number,
  actionItemId: number,
  isCompleted: boolean
): Promise<ActionItem> {
  const res = await fetch(`${API_BASE}/meetings/${meetingId}/action_items/${actionItemId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ is_completed: isCompleted }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail ?? `Failed to update action item (${res.status})`);
  }
  return res.json();
}

/** Delete an action item. Returns 204 No Content. */
export async function deleteActionItem(meetingId: number, actionItemId: number): Promise<void> {
  const res = await fetch(`${API_BASE}/meetings/${meetingId}/action_items/${actionItemId}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error(`Failed to delete action item (${res.status})`);
}

// ── Participants ───────────────────────────────────────────────────────────────

/** Add a participant to an existing meeting. */
export async function addParticipant(meetingId: number, name: string): Promise<Participant> {
  const res = await fetch(`${API_BASE}/meetings/${meetingId}/participants`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  if (!res.ok) throw new Error(`Failed to add participant (${res.status})`);
  return res.json();
}

/** Remove a participant from a meeting. */
export async function removeParticipant(meetingId: number, participantId: number): Promise<void> {
  const res = await fetch(`${API_BASE}/meetings/${meetingId}/participants/${participantId}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error(`Failed to remove participant (${res.status})`);
}