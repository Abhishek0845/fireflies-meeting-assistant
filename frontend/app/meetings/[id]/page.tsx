"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  getMeetingById, Meeting, TranscriptSegment,
  toggleActionItem, deleteMeeting, createActionItem, updateMeetingTitle
} from "@/lib/api";

// ─── Icons ────────────────────────────────────────────────────────────────────
const PlayIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="5 3 19 12 5 21 5 3"/>
  </svg>
);
const PauseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>
  </svg>
);
const BackIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6"/>
  </svg>
);
const PencilIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);
const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
  </svg>
);
const SearchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);
const CheckIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);
const SparkleIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z"/>
  </svg>
);
const XIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const UserIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);
const ClockIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);
const Volume2Icon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
  </svg>
);
const SkipBackIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="19 20 9 12 19 4 19 20"/><line x1="5" y1="19" x2="5" y2="5"/>
  </svg>
);
const SkipForwardIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="5 4 15 12 5 20 5 4"/><line x1="19" y1="5" x2="19" y2="19"/>
  </svg>
);
const ShareIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
  </svg>
);
const DownloadIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);
const FirefliesLogoSmall = () => (
  <div className="w-6 h-6 rounded bg-[#6D1A75] flex items-center justify-center text-white text-[10px] font-bold shrink-0">F</div>
);

// ─── Helpers ──────────────────────────────────────────────────────────────────
const formatTime = (s: number) => {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec < 10 ? "0" : ""}${sec}`;
};

const formatDuration = (s: number) => {
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  return `${m} min`;
};

// Speaker color mapping
const SPEAKER_COLORS = [
  "#6D1A75", "#2563EB", "#059669", "#D97706", "#DC2626",
  "#7C3AED", "#0891B2", "#65A30D",
];
const speakerColorMap = new Map<string, string>();
let colorIdx = 0;
const getSpeakerColor = (name: string) => {
  if (!speakerColorMap.has(name)) {
    speakerColorMap.set(name, SPEAKER_COLORS[colorIdx % SPEAKER_COLORS.length]);
    colorIdx++;
  }
  return speakerColorMap.get(name)!;
};
const getInitial = (name: string) => name.charAt(0).toUpperCase();

// ─── Main Component ───────────────────────────────────────────────────────────
export default function MeetingDetail() {
  const { id } = useParams();
  const router = useRouter();

  const [meeting, setMeeting] = useState<Meeting | null>(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [activeTab, setActiveTab] = useState<"transcript" | "summary" | "action_items">("transcript");

  // Player state
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const transcriptRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  // UI state
  const [transcriptSearch, setTranscriptSearch] = useState("");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [titleInput, setTitleInput] = useState("");
  const [newActionItem, setNewActionItem] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    // Reset color map for each meeting load
    speakerColorMap.clear();
    colorIdx = 0;

    const fetch = async () => {
      try {
        const data = await getMeetingById(id as string);
        setMeeting(data);
        setTitleInput(data.title);
      } catch {
        showToast("Failed to load meeting", "error");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  // Playback interval
  useEffect(() => {
    if (isPlaying && meeting) {
      intervalRef.current = setInterval(() => {
        setCurrentTime((t) => {
          if (t >= meeting.duration_seconds) {
            setIsPlaying(false);
            return meeting.duration_seconds;
          }
          return t + 0.5;
        });
      }, 500);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isPlaying, meeting]);

  // Auto-scroll active segment
  useEffect(() => {
    if (!transcriptRef.current || transcriptSearch) return;
    const active = transcriptRef.current.querySelector("[data-active='true']");
    if (active) {
      active.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [currentTime, transcriptSearch]);

  const getActiveSegment = (): TranscriptSegment | undefined => {
    if (!meeting) return undefined;
    return meeting.transcript_segments.find(
      (s) => currentTime >= s.start_time && currentTime <= s.end_time
    );
  };

  const handleSegmentClick = (seg: TranscriptSegment) => {
    setCurrentTime(seg.start_time);
    setIsPlaying(true);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!meeting || !progressRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setCurrentTime(pct * meeting.duration_seconds);
  };

  const handleSkip = (delta: number) => {
    if (!meeting) return;
    setCurrentTime((t) => Math.max(0, Math.min(meeting.duration_seconds, t + delta)));
  };

  const handleToggleActionItem = async (itemId: number, current: boolean) => {
    if (!meeting) return;
    // Optimistic update
    setMeeting((prev) => prev
      ? { ...prev, action_items: prev.action_items.map((i) => i.id === itemId ? { ...i, is_completed: !current } : i) }
      : null
    );
    try {
      await toggleActionItem(meeting.id, itemId, !current);
    } catch {
      // Revert
      setMeeting((prev) => prev
        ? { ...prev, action_items: prev.action_items.map((i) => i.id === itemId ? { ...i, is_completed: current } : i) }
        : null
      );
      showToast("Failed to update action item", "error");
    }
  };

  const handleAddActionItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!meeting || !newActionItem.trim()) return;
    try {
      const item = await createActionItem(meeting.id, newActionItem.trim());
      setMeeting({ ...meeting, action_items: [...meeting.action_items, item] });
      setNewActionItem("");
      showToast("Action item added!");
    } catch {
      showToast("Failed to add action item", "error");
    }
  };

  const handleSaveTitle = async () => {
    if (!meeting || !titleInput.trim()) return;
    try {
      const updated = await updateMeetingTitle(id as string, titleInput.trim());
      setMeeting(updated);
      setIsEditingTitle(false);
      showToast("Title updated!");
    } catch {
      showToast("Failed to update title", "error");
    }
  };

  const handleDeleteMeeting = async () => {
    if (!meeting) return;
    try {
      await deleteMeeting(id as string);
      router.push("/");
    } catch {
      showToast("Failed to delete meeting", "error");
    }
  };

  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return <>{text}</>;
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
    const parts = text.split(regex);
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === query.toLowerCase()
            ? <mark key={i} className="bg-yellow-200 text-yellow-900 rounded px-0.5">{part}</mark>
            : part
        )}
      </>
    );
  };

  // ─── Loading / Error ───────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="h-screen bg-[#FAFAFB] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#6D1A75] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-[#64748B]">Loading meeting...</p>
        </div>
      </div>
    );
  }
  if (!meeting) {
    return (
      <div className="h-screen bg-[#FAFAFB] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#172033] font-semibold mb-2">Meeting not found</p>
          <button onClick={() => router.push("/")} className="text-[#6D1A75] text-sm hover:underline">← Back to home</button>
        </div>
      </div>
    );
  }

  const activeSegment = getActiveSegment();
  const progress = meeting.duration_seconds > 0 ? (currentTime / meeting.duration_seconds) * 100 : 0;
  const uniqueSpeakers = [...new Set(meeting.transcript_segments.map((s) => s.speaker_name))];
  const completedItems = meeting.action_items.filter((i) => i.is_completed).length;

  // Key topics from summary words
  const keyTopics = meeting.summary
    ? [...new Set(meeting.summary.split(/[\s.,!?;:]+/).filter((w) => w.length > 5))].slice(0, 5)
    : ["General", "Discussion"];

  return (
    <div className="h-screen bg-[#FAFAFB] flex flex-col overflow-hidden">

      {/* ── Top Nav ── */}
      <nav className="bg-white border-b border-[#E5E7EB] px-6 h-14 flex items-center gap-4 shrink-0 z-20">
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-1.5 text-sm text-[#64748B] hover:text-[#172033] font-medium"
        >
          <BackIcon />
          Back
        </button>

        <div className="w-px h-5 bg-[#E5E7EB]" />
        <FirefliesLogoSmall />

        {/* Editable title */}
        {isEditingTitle ? (
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <input
              autoFocus
              type="text"
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handleSaveTitle(); if (e.key === "Escape") { setIsEditingTitle(false); setTitleInput(meeting.title); } }}
              className="text-sm font-semibold border border-[#6D1A75] rounded-lg px-3 py-1.5 text-[#172033] focus:outline-none w-64"
            />
            <button onClick={handleSaveTitle} className="bg-[#6D1A75] text-white text-xs px-3 py-1.5 rounded-lg hover:bg-[#4F1457]">Save</button>
            <button onClick={() => { setIsEditingTitle(false); setTitleInput(meeting.title); }} className="text-xs text-[#64748B] px-2 py-1.5">Cancel</button>
          </div>
        ) : (
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <h1 className="text-sm font-semibold text-[#172033] truncate">{meeting.title}</h1>
            <button onClick={() => setIsEditingTitle(true)} className="text-[#94A3B8] hover:text-[#6D1A75] p-1 rounded">
              <PencilIcon />
            </button>
          </div>
        )}

        {/* Right controls */}
        <div className="flex items-center gap-3 ml-auto">
          <span className="text-xs text-[#94A3B8] flex items-center gap-1">
            <ClockIcon />
            {new Date(meeting.meeting_date).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" })}
          </span>
          <span className="text-xs text-[#94A3B8]">{formatDuration(meeting.duration_seconds)}</span>
          <button disabled className="text-[#94A3B8] p-1.5 rounded-lg hover:bg-[#FAFAFB] cursor-not-allowed" title="Share">
            <ShareIcon />
          </button>
          <button disabled className="text-[#94A3B8] p-1.5 rounded-lg hover:bg-[#FAFAFB] cursor-not-allowed" title="Download">
            <DownloadIcon />
          </button>
          {confirmDelete ? (
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#64748B]">Are you sure?</span>
              <button onClick={handleDeleteMeeting} className="text-xs bg-red-600 text-white px-2.5 py-1 rounded-lg hover:bg-red-700">Delete</button>
              <button onClick={() => setConfirmDelete(false)} className="text-xs text-[#64748B] px-2 py-1">Cancel</button>
            </div>
          ) : (
            <button onClick={() => setConfirmDelete(true)} className="flex items-center gap-1.5 text-xs text-red-500 hover:text-red-600 border border-red-200 px-2.5 py-1.5 rounded-lg hover:bg-red-50">
              <TrashIcon />
              Delete
            </button>
          )}
        </div>
      </nav>

      {/* ── Media Player Bar ── */}
      <div className="bg-white border-b border-[#E5E7EB] px-6 py-3 shrink-0">
        <div className="flex items-center gap-4 max-w-4xl">
          {/* Controls */}
          <button
            onClick={() => handleSkip(-10)}
            className="text-[#64748B] hover:text-[#172033] p-1.5 rounded-lg hover:bg-[#FAFAFB]"
            title="Rewind 10s"
          >
            <SkipBackIcon />
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-9 h-9 bg-[#6D1A75] rounded-full flex items-center justify-center text-white hover:bg-[#4F1457] shadow-sm shrink-0"
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>
          <button
            onClick={() => handleSkip(10)}
            className="text-[#64748B] hover:text-[#172033] p-1.5 rounded-lg hover:bg-[#FAFAFB]"
            title="Forward 10s"
          >
            <SkipForwardIcon />
          </button>

          {/* Current time */}
          <span className="text-xs font-mono text-[#64748B] w-9 shrink-0">{formatTime(currentTime)}</span>

          {/* Progress bar */}
          <div
            ref={progressRef}
            onClick={handleProgressClick}
            className="flex-1 relative h-2 bg-[#E5E7EB] rounded-full cursor-pointer group"
          >
            <div
              className="absolute left-0 top-0 h-full bg-[#6D1A75] rounded-full"
              style={{ width: `${progress}%` }}
            />
            {/* Thumb */}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-[#6D1A75] rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ left: `calc(${progress}% - 6px)` }}
            />
            {/* Segment markers */}
            {meeting.transcript_segments.map((seg) => (
              <div
                key={seg.id}
                className="absolute top-0 h-full w-0.5 bg-white/60"
                style={{ left: `${(seg.start_time / meeting.duration_seconds) * 100}%` }}
              />
            ))}
          </div>

          <span className="text-xs font-mono text-[#64748B] w-9 shrink-0 text-right">{formatTime(meeting.duration_seconds)}</span>

          {/* Volume (disabled) */}
          <button disabled className="text-[#94A3B8] p-1.5 rounded-lg cursor-not-allowed" title="Volume">
            <Volume2Icon />
          </button>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="flex-1 flex overflow-hidden">

        {/* ── Left: Transcript Panel ── */}
        <div className="flex-1 flex flex-col overflow-hidden bg-white border-r border-[#E5E7EB]">
          {/* Tab bar */}
          <div className="flex items-center border-b border-[#E5E7EB] px-6 shrink-0">
            {(["transcript", "summary", "action_items"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 text-sm font-medium border-b-2 -mb-px transition-colors ${
                  activeTab === tab
                    ? "text-[#6D1A75] border-[#6D1A75]"
                    : "text-[#64748B] border-transparent hover:text-[#172033]"
                }`}
              >
                {tab === "transcript" ? "Transcript" : tab === "summary" ? "Summary" : "Action Items"}
                {tab === "action_items" && meeting.action_items.length > 0 && (
                  <span className="ml-1.5 text-[10px] bg-[#F3EAF5] text-[#6D1A75] px-1.5 py-0.5 rounded-full font-semibold">
                    {completedItems}/{meeting.action_items.length}
                  </span>
                )}
              </button>
            ))}
            <button disabled className="px-4 py-3 text-sm text-[#94A3B8] cursor-not-allowed flex items-center gap-1">
              Soundbites <span className="text-[10px] bg-[#FAFAFB] border border-[#E5E7EB] px-1.5 py-0.5 rounded text-[#94A3B8]">Soon</span>
            </button>
            <button disabled className="px-4 py-3 text-sm text-[#94A3B8] cursor-not-allowed flex items-center gap-1">
              Comments <span className="text-[10px] bg-[#FAFAFB] border border-[#E5E7EB] px-1.5 py-0.5 rounded text-[#94A3B8]">Soon</span>
            </button>
          </div>

          {/* ── TRANSCRIPT TAB ── */}
          {activeTab === "transcript" && (
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Search bar */}
              <div className="px-6 py-3 border-b border-[#E5E7EB] flex items-center gap-3">
                <div className="relative flex-1 max-w-xs">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]">
                    <SearchIcon />
                  </div>
                  <input
                    type="text"
                    placeholder="Search in transcript..."
                    value={transcriptSearch}
                    onChange={(e) => setTranscriptSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 text-sm bg-[#FAFAFB] border border-[#E5E7EB] rounded-lg text-[#172033] focus:outline-none focus:border-[#6D1A75]"
                  />
                  {transcriptSearch && (
                    <button
                      onClick={() => setTranscriptSearch("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#172033]"
                    >
                      <XIcon />
                    </button>
                  )}
                </div>
                {transcriptSearch && (
                  <span className="text-xs text-[#64748B]">
                    {meeting.transcript_segments.filter((s) => s.text.toLowerCase().includes(transcriptSearch.toLowerCase())).length} results
                  </span>
                )}
              </div>

              {/* Segments */}
              <div ref={transcriptRef} className="flex-1 overflow-y-auto px-6 py-4 space-y-1">
                {meeting.transcript_segments.map((seg) => {
                  const isActive = activeSegment?.id === seg.id;
                  const isFiltered = transcriptSearch && !seg.text.toLowerCase().includes(transcriptSearch.toLowerCase());
                  if (isFiltered) return null;

                  const color = getSpeakerColor(seg.speaker_name);
                  return (
                    <div
                      key={seg.id}
                      data-active={isActive ? "true" : "false"}
                      onClick={() => handleSegmentClick(seg)}
                      className={`flex gap-3 px-3 py-3 rounded-xl cursor-pointer transition-all group ${
                        isActive
                          ? "bg-[#F3EAF5] border border-[#6D1A75]/20"
                          : "hover:bg-[#FAFAFB] border border-transparent"
                      }`}
                    >
                      {/* Speaker avatar */}
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5"
                        style={{ backgroundColor: color }}
                      >
                        {getInitial(seg.speaker_name)}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold" style={{ color }}>
                            {seg.speaker_name}
                          </span>
                          <button
                            onClick={(e) => { e.stopPropagation(); handleSegmentClick(seg); }}
                            className="text-[10px] text-[#94A3B8] bg-[#FAFAFB] border border-[#E5E7EB] px-1.5 py-0.5 rounded font-mono hover:text-[#6D1A75] hover:border-[#6D1A75]"
                          >
                            {formatTime(seg.start_time)}
                          </button>
                          {isActive && (
                            <span className="text-[10px] bg-[#6D1A75] text-white px-1.5 py-0.5 rounded-full font-medium">
                              Playing
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-[#172033] leading-relaxed">
                          {highlightText(seg.text, transcriptSearch)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── SUMMARY TAB ── */}
          {activeTab === "summary" && (
            <div className="flex-1 overflow-y-auto px-6 py-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-gradient-to-br from-[#6D1A75] to-[#9B59B6] rounded-lg flex items-center justify-center">
                  <SparkleIcon />
                </div>
                <h2 className="text-base font-semibold text-[#172033]">AI-Generated Summary</h2>
              </div>
              <div className="bg-[#FAFAFB] rounded-xl border border-[#E5E7EB] p-5 mb-6">
                <p className="text-sm text-[#172033] leading-relaxed">
                  {meeting.summary || "No summary available for this meeting."}
                </p>
              </div>

              <h3 className="text-sm font-semibold text-[#172033] mb-3">Key Topics</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {keyTopics.map((topic, i) => (
                  <span key={i} className="bg-[#F3EAF5] text-[#6D1A75] px-3 py-1.5 rounded-full text-xs font-semibold border border-[#6D1A75]/15">
                    {topic}
                  </span>
                ))}
              </div>

              <h3 className="text-sm font-semibold text-[#172033] mb-3">Participants</h3>
              <div className="flex flex-wrap gap-3">
                {uniqueSpeakers.map((name) => {
                  const color = getSpeakerColor(name);
                  return (
                    <div key={name} className="flex items-center gap-2 bg-white border border-[#E5E7EB] rounded-lg px-3 py-2">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: color }}>
                        {getInitial(name)}
                      </div>
                      <span className="text-sm text-[#172033] font-medium">{name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── ACTION ITEMS TAB ── */}
          {activeTab === "action_items" && (
            <div className="flex-1 overflow-y-auto px-6 py-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-base font-semibold text-[#172033]">Action Items</h2>
                <span className="text-xs text-[#64748B] bg-[#FAFAFB] border border-[#E5E7EB] px-2.5 py-1 rounded-full">
                  {completedItems} of {meeting.action_items.length} completed
                </span>
              </div>
              <div className="space-y-2 mb-6">
                {meeting.action_items.length === 0 ? (
                  <p className="text-sm text-[#94A3B8] text-center py-8">No action items yet.</p>
                ) : (
                  meeting.action_items.map((item) => (
                    <div
                      key={item.id}
                      className={`flex items-start gap-3 p-3.5 rounded-xl border transition-colors ${
                        item.is_completed ? "border-[#E5E7EB] bg-[#FAFAFB]" : "border-[#E5E7EB] bg-white hover:border-[#6D1A75]/30"
                      }`}
                    >
                      <button
                        onClick={() => handleToggleActionItem(item.id, item.is_completed)}
                        className={`mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all ${
                          item.is_completed
                            ? "bg-[#6D1A75] border-[#6D1A75] text-white"
                            : "border-[#D1D5DB] hover:border-[#6D1A75]"
                        }`}
                      >
                        {item.is_completed && <CheckIcon />}
                      </button>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm ${item.is_completed ? "line-through text-[#94A3B8]" : "text-[#172033]"}`}>
                          {item.description}
                        </p>
                        {item.assignee && (
                          <div className="flex items-center gap-1 mt-1">
                            <UserIcon />
                            <span className="text-xs text-[#64748B]">{item.assignee}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
              {/* Add new action item */}
              <form onSubmit={handleAddActionItem} className="border-t border-[#E5E7EB] pt-4">
                <label className="block text-xs font-semibold text-[#64748B] mb-2 uppercase tracking-wide">Add Action Item</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newActionItem}
                    onChange={(e) => setNewActionItem(e.target.value)}
                    placeholder="Describe the action item..."
                    className="flex-1 px-3.5 py-2.5 text-sm bg-[#FAFAFB] border border-[#E5E7EB] rounded-lg text-[#172033] placeholder-[#94A3B8] focus:outline-none focus:border-[#6D1A75] focus:bg-white"
                  />
                  <button
                    type="submit"
                    className="bg-[#6D1A75] text-white px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-1.5 hover:bg-[#4F1457] transition-colors"
                  >
                    <PlusIcon />
                    Add
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* ── Right Panel ── */}
        <div className="w-80 flex flex-col gap-0 overflow-hidden shrink-0">

          {/* AI Summary card */}
          <div className="bg-white border-b border-[#E5E7EB] p-5 overflow-y-auto" style={{ maxHeight: "40%" }}>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-5 h-5 bg-gradient-to-br from-[#6D1A75] to-[#9B59B6] rounded flex items-center justify-center">
                <SparkleIcon />
              </div>
              <h2 className="text-sm font-semibold text-[#172033]">AI Summary</h2>
            </div>
            <p className="text-sm text-[#64748B] leading-relaxed">
              {meeting.summary || "No summary available."}
            </p>
          </div>

          {/* Key Topics */}
          <div className="bg-white border-b border-[#E5E7EB] p-5">
            <h2 className="text-sm font-semibold text-[#172033] mb-3">Key Topics</h2>
            <div className="flex flex-wrap gap-1.5">
              {keyTopics.map((topic, i) => (
                <span key={i} className="bg-[#F3EAF5] text-[#6D1A75] px-2.5 py-1 rounded-full text-xs font-medium">
                  {topic}
                </span>
              ))}
            </div>
          </div>

          {/* Participants */}
          <div className="bg-white border-b border-[#E5E7EB] p-5">
            <h2 className="text-sm font-semibold text-[#172033] mb-3">
              Participants <span className="text-[#94A3B8] font-normal">({meeting.participants.length})</span>
            </h2>
            <div className="flex flex-wrap gap-2">
              {meeting.participants.map((p, i) => {
                const color = getSpeakerColor(p.name);
                return (
                  <div key={i} className="flex items-center gap-1.5 bg-[#FAFAFB] border border-[#E5E7EB] rounded-lg px-2.5 py-1.5">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold" style={{ backgroundColor: color }}>
                      {getInitial(p.name)}
                    </div>
                    <span className="text-xs text-[#172033] font-medium">{p.name}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Items summary */}
          <div className="bg-white flex-1 overflow-y-auto p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-[#172033]">Action Items</h2>
              <span className="text-xs text-[#6D1A75] font-medium">{completedItems}/{meeting.action_items.length}</span>
            </div>
            {/* Progress bar */}
            <div className="w-full h-1.5 bg-[#E5E7EB] rounded-full mb-3">
              <div
                className="h-full bg-[#6D1A75] rounded-full transition-all"
                style={{ width: meeting.action_items.length ? `${(completedItems / meeting.action_items.length) * 100}%` : "0%" }}
              />
            </div>
            <div className="space-y-2">
              {meeting.action_items.slice(0, 4).map((item) => (
                <div key={item.id} className="flex items-start gap-2">
                  <button
                    onClick={() => handleToggleActionItem(item.id, item.is_completed)}
                    className={`mt-0.5 w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-all ${
                      item.is_completed ? "bg-[#6D1A75] border-[#6D1A75] text-white" : "border-[#D1D5DB] hover:border-[#6D1A75]"
                    }`}
                  >
                    {item.is_completed && <CheckIcon />}
                  </button>
                  <p className={`text-xs leading-relaxed ${item.is_completed ? "line-through text-[#94A3B8]" : "text-[#172033]"}`}>
                    {item.description}
                  </p>
                </div>
              ))}
              {meeting.action_items.length > 4 && (
                <button onClick={() => setActiveTab("action_items")} className="text-xs text-[#6D1A75] hover:underline mt-1">
                  View all {meeting.action_items.length} items →
                </button>
              )}
            </div>
            {meeting.action_items.length === 0 && (
              <button onClick={() => setActiveTab("action_items")} className="text-xs text-[#6D1A75] hover:underline">
                + Add an action item
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Toast ── */}
      {toast && (
        <div className={`fixed bottom-6 right-6 px-4 py-3 rounded-xl shadow-xl text-sm font-medium z-50 flex items-center gap-2 ${
          toast.type === "error" ? "bg-red-600 text-white" : "bg-[#172033] text-white"
        }`}>
          {toast.type === "success" ? "✓" : "✗"}
          {toast.message}
        </div>
      )}
    </div>
  );
}