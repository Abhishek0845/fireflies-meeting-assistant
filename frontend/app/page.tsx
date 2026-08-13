"use client";

import { useEffect, useState, useRef } from "react";
import { getMeetings, createMeeting, Meeting } from "@/lib/api";

// ─── SVG Icons ──────────────────────────────────────────────────────────────
const HomeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);
const MeetingsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);
const SoundbitesIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/>
  </svg>
);
const UploadIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
  </svg>
);
const AnalyticsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
  </svg>
);
const ContactsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);
const StarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);
const SettingsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/>
  </svg>
);
const SearchIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);
const CameraIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>
  </svg>
);
const BellIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
);
const MicIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/>
  </svg>
);
const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);
const ChevronRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);
const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);
const FilterIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
  </svg>
);
const MonitorIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
  </svg>
);
const SmartphoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
  </svg>
);
const HashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/>
  </svg>
);
const ClockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);
const VoiceIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
  </svg>
);
const SendIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);
const EmojiIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>
  </svg>
);
const CheckSquareIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
  </svg>
);
const PinIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);
const SparkleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z"/>
  </svg>
);
const XIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const DownloadIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);

// ─── Fireflies Logo ──────────────────────────────────────────────────────────
const FirefliesLogo = ({ size = 28 }: { size?: number }) => (
  <div
    style={{ width: size, height: size }}
    className="rounded-lg bg-[#6D1A75] flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-sm"
  >
    <svg width={size * 0.65} height={size * 0.65} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
    </svg>
  </div>
);

// ─── Helpers ─────────────────────────────────────────────────────────────────
const formatDuration = (s: number) => {
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  return `${m} min`;
};

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

const formatDateTime = (d: string) =>
  new Date(d).toLocaleString("en-US", {
    weekday: "short", month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit",
  });

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Home() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sidebarSearch, setSidebarSearch] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCaptureMenuOpen, setIsCaptureMenuOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newDuration, setNewDuration] = useState(300);
  const [transcriptText, setTranscriptText] = useState("");
  const [creating, setCreating] = useState(false);

  const [activeView, setActiveView] = useState<"home" | "meetings">("home");
  const [activeMeetingTab, setActiveMeetingTab] = useState<"my" | "all">("my");
  const [activeHomeTab, setActiveHomeTab] = useState<"recent" | "upcoming" | "aifeed">("recent");
  const [showBanner, setShowBanner] = useState(true);
  const [fredInput, setFredInput] = useState("");
  const captureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchMeetings = async () => {
      setLoading(true);
      try {
        const data = await getMeetings(search);
        setMeetings(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    const t = setTimeout(fetchMeetings, 300);
    return () => clearTimeout(t);
  }, [search]);

  // Close capture menu on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (captureRef.current && !captureRef.current.contains(e.target as Node)) {
        setIsCaptureMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleCreateMeeting = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    const lines = transcriptText.split("\n").filter((l) => l.trim() !== "");
    const segments: { speaker_name: string; start_time: number; end_time: number; text: string }[] = [];
    const participantsSet = new Set<string>();
    let t = 0.5;
    for (const line of lines) {
      const match = line.match(/^([A-Za-z ]+):\s*(.*)$/);
      const speaker = match ? match[1].trim() : "Unknown";
      const text = match ? match[2] : line;
      participantsSet.add(speaker);
      segments.push({ speaker_name: speaker, start_time: t, end_time: t + 5.0, text });
      t += 5.5;
    }
    const meetingData = {
      title: newTitle,
      meeting_date: newDate ? new Date(newDate).toISOString() : new Date().toISOString(),
      duration_seconds: newDuration,
      summary: "AI summary will appear here once processed.",
      participants: Array.from(participantsSet).map((name) => ({ name })),
      transcript_segments: segments,
      action_items: [],
    };
    try {
      const created = await createMeeting(meetingData);
      setMeetings((prev) => [created, ...prev]);
      setIsModalOpen(false);
      setNewTitle(""); setNewDate(""); setNewDuration(300); setTranscriptText("");
    } catch {
      alert("Failed to create meeting. Is the backend running?");
    } finally {
      setCreating(false);
    }
  };

  const myMeetings = meetings.filter((m) =>
    m.participants.some((p) => p.name.toLowerCase().includes("abhishek"))
  );
  const allMeetings = meetings;
  const displayedMeetings = activeMeetingTab === "my" ? myMeetings : allMeetings;
  const filteredSidebarMeetings = displayedMeetings.filter((m) =>
    m.title.toLowerCase().includes(sidebarSearch.toLowerCase())
  );

  // ─── Shared Top Navbar ────────────────────────────────────────────────────
  const TopNavbar = (
    <header className="h-14 bg-white border-b border-[#E5E7EB] flex items-center px-4 gap-4 shrink-0 z-20">
      {/* Logo + Breadcrumb */}
      <div className="flex items-center gap-3 w-56 shrink-0">
        <FirefliesLogo size={28} />
        <span className="text-sm font-medium text-[#64748B]">
          {activeView === "home" ? "Home" : "Meetings"}
        </span>
      </div>

      {/* Center Search */}
      <div className="flex-1 flex justify-center">
        <div className="relative w-full max-w-sm">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]">
            <SearchIcon size={14} />
          </div>
          <input
            type="text"
            placeholder="Search by title or keyword"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-16 py-1.5 bg-[#FAFAFB] border border-[#E5E7EB] rounded-md text-sm text-[#172033] placeholder-[#94A3B8] focus:outline-none focus:border-[#6D1A75] focus:bg-white"
          />
          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] bg-white border border-[#E5E7EB] rounded px-1.5 py-0.5 text-[#94A3B8] font-mono">
            Ctrl K
          </span>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        <button className="text-xs font-semibold text-[#16A34A] border border-[#16A34A]/30 bg-[#F0FDF4] px-3 py-1.5 rounded-md hover:bg-[#DCFCE7] transition-colors">
          Upgrade
        </button>

        {/* Capture Dropdown */}
        <div className="relative" ref={captureRef}>
          <button
            onClick={() => setIsCaptureMenuOpen(!isCaptureMenuOpen)}
            className="bg-[#6D1A75] text-white pl-3 pr-2 py-1.5 rounded-md text-xs font-medium flex items-center gap-2 hover:bg-[#4F1457] transition-colors shadow-sm"
          >
            <CameraIcon />
            <span>Capture</span>
            <span className="ml-0.5 opacity-70 text-[10px]">▼</span>
          </button>
          {isCaptureMenuOpen && (
            <div className="absolute top-full right-0 mt-1.5 w-56 bg-white rounded-xl shadow-xl border border-[#E5E7EB] z-50 py-1.5 overflow-hidden">
              <div className="px-3 py-1.5">
                <p className="text-[10px] text-[#94A3B8] font-semibold uppercase tracking-wider mb-1">Record</p>
              </div>
              <button disabled className="w-full text-left px-4 py-2 text-sm text-[#94A3B8] cursor-not-allowed flex items-center gap-2.5">
                <span className="text-base">🤖</span> Add to live meeting
              </button>
              <button disabled className="w-full text-left px-4 py-2 text-sm text-[#94A3B8] cursor-not-allowed flex items-center gap-2.5">
                <span className="text-base">📅</span> Schedule new meeting
              </button>
              <div className="border-t border-[#E5E7EB] my-1.5 mx-3" />
              <div className="px-3 py-1.5">
                <p className="text-[10px] text-[#94A3B8] font-semibold uppercase tracking-wider mb-1">Upload</p>
              </div>
              <button
                onClick={() => { setIsModalOpen(true); setIsCaptureMenuOpen(false); }}
                className="w-full text-left px-4 py-2 text-sm text-[#172033] hover:bg-[#F3EAF5] flex items-center gap-2.5"
              >
                <span className="text-base">📁</span> Upload audio or video
              </button>
              <button disabled className="w-full text-left px-4 py-2 text-sm text-[#94A3B8] cursor-not-allowed flex items-center gap-2.5">
                <span className="text-base">🔴</span> Start recording
              </button>
            </div>
          )}
        </div>

        <button disabled className="text-[#94A3B8] p-1.5 rounded-md hover:bg-[#FAFAFB] cursor-not-allowed">
          <MicIcon />
        </button>
        <button disabled className="text-[#94A3B8] p-1.5 rounded-md hover:bg-[#FAFAFB] cursor-not-allowed relative">
          <BellIcon />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full" />
        </button>
        <div className="w-7 h-7 rounded-full bg-[#6D1A75] flex items-center justify-center text-white text-xs font-bold cursor-pointer select-none">
          A
        </div>
      </div>
    </header>
  );

  // ─── Icon Sidebar ─────────────────────────────────────────────────────────
  const IconSidebar = (
    <aside className="w-14 bg-white border-r border-[#E5E7EB] flex flex-col items-center py-4 gap-1 shrink-0">
      <button
        onClick={() => setActiveView("home")}
        className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${activeView === "home" ? "bg-[#F3EAF5] text-[#6D1A75]" : "text-[#94A3B8] hover:bg-[#FAFAFB] hover:text-[#64748B]"}`}
        title="Home"
      >
        <HomeIcon />
      </button>
      <button
        onClick={() => setActiveView("meetings")}
        className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${activeView === "meetings" ? "bg-[#F3EAF5] text-[#6D1A75]" : "text-[#94A3B8] hover:bg-[#FAFAFB] hover:text-[#64748B]"}`}
        title="Meetings"
      >
        <MeetingsIcon />
      </button>
      <button disabled className="w-9 h-9 rounded-lg flex items-center justify-center text-[#94A3B8] cursor-not-allowed" title="Soundbites (Soon)">
        <SoundbitesIcon />
      </button>
      <button disabled className="w-9 h-9 rounded-lg flex items-center justify-center text-[#94A3B8] cursor-not-allowed" title="Upload (Soon)">
        <UploadIcon />
      </button>
      <button disabled className="w-9 h-9 rounded-lg flex items-center justify-center text-[#94A3B8] cursor-not-allowed" title="Analytics (Soon)">
        <AnalyticsIcon />
      </button>
      <div className="flex-1" />
      <button disabled className="w-9 h-9 rounded-lg flex items-center justify-center text-[#94A3B8] cursor-not-allowed" title="Contacts (Soon)">
        <ContactsIcon />
      </button>
      <button disabled className="w-9 h-9 rounded-lg flex items-center justify-center text-[#94A3B8] cursor-not-allowed" title="Favorites (Soon)">
        <StarIcon />
      </button>
      <button disabled className="w-9 h-9 rounded-lg flex items-center justify-center text-[#94A3B8] cursor-not-allowed" title="Settings (Soon)">
        <SettingsIcon />
      </button>
      <button disabled className="w-9 h-9 rounded-lg flex items-center justify-center text-[#94A3B8] cursor-not-allowed text-lg font-bold" title="More">
        ···
      </button>
    </aside>
  );

  // ─── Right Sidebar (Ask Fred) ─────────────────────────────────────────────
  const RightSidebar = (
    <aside className="w-72 bg-white border-l border-[#E5E7EB] flex flex-col shrink-0 overflow-hidden">
      {/* Ask Fred Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#E5E7EB]">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gradient-to-br from-[#6D1A75] to-[#9B59B6] rounded flex items-center justify-center">
            <SparkleIcon />
          </div>
          <span className="text-sm font-semibold text-[#172033]">Ask Fred</span>
        </div>
        <button disabled className="text-[#94A3B8] cursor-not-allowed p-1 rounded hover:bg-[#FAFAFB]">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/>
          </svg>
        </button>
      </div>

      {/* Connect Slack & Gmail banner */}
      <div className="mx-3 mt-3 bg-gradient-to-r from-[#FFF7ED] to-[#FFF] border border-[#FED7AA] rounded-lg px-3 py-2.5 flex items-center gap-2">
        <div className="flex items-center gap-1 shrink-0">
          <span className="text-base">💬</span>
          <span className="text-base">📧</span>
        </div>
        <p className="text-xs text-[#92400E] flex-1">
          <span className="font-medium">Connect Slack and Gmail</span> — get answers with full context.
        </p>
        <button className="text-xs text-[#6D1A75] font-semibold hover:underline shrink-0">Connect</button>
        <button className="text-[#94A3B8] hover:text-[#64748B] shrink-0 ml-1">
          <XIcon size={12} />
        </button>
      </div>

      {/* Fred content area */}
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-2">
        <div className="flex items-start gap-2.5 mb-4">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#6D1A75] to-[#9B59B6] flex items-center justify-center shrink-0">
            <SparkleIcon />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#172033] mb-0.5">Hi Abhishek!</p>
            <p className="text-sm text-[#64748B]">Get ready for your meeting</p>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <button disabled className="w-full flex items-center gap-2.5 text-left px-3 py-2 rounded-lg border border-[#E5E7EB] text-sm text-[#172033] hover:border-[#6D1A75] hover:bg-[#F3EAF5] cursor-not-allowed">
            <span className="text-green-500"><CheckSquareIcon /></span>
            <span className="text-[#64748B]">My action items</span>
          </button>
          <button disabled className="w-full flex items-center gap-2.5 text-left px-3 py-2 rounded-lg border border-[#E5E7EB] text-sm text-[#172033] hover:border-[#6D1A75] hover:bg-[#F3EAF5] cursor-not-allowed">
            <span className="text-[#6D1A75]"><StarIcon /></span>
            <span className="text-[#64748B]">Key decisions</span>
          </button>
          <button disabled className="w-full flex items-center gap-2.5 text-left px-3 py-2 rounded-lg border border-[#E5E7EB] text-sm text-[#172033] hover:border-[#6D1A75] hover:bg-[#F3EAF5] cursor-not-allowed">
            <span className="text-red-400"><PinIcon /></span>
            <span className="text-[#64748B]">Key initiatives</span>
          </button>
        </div>
      </div>

      {/* Fred Input */}
      <div className="border-t border-[#E5E7EB] px-3 py-3">
        <div className="text-[10px] text-[#94A3B8] font-medium mb-2 px-1">✦ My Meetings</div>
        <div className="flex items-center gap-2 bg-[#FAFAFB] border border-[#E5E7EB] rounded-lg px-2 py-2">
          <button disabled className="text-[#94A3B8] p-1 hover:text-[#64748B] cursor-not-allowed">
            <PlusIcon />
          </button>
          <button disabled className="text-[#94A3B8] p-1 hover:text-[#64748B] cursor-not-allowed">
            <EmojiIcon />
          </button>
          <input
            disabled
            type="text"
            value={fredInput}
            onChange={(e) => setFredInput(e.target.value)}
            placeholder="Ask anything. Type / to run AI skills."
            className="flex-1 bg-transparent text-xs text-[#172033] placeholder-[#94A3B8] focus:outline-none cursor-not-allowed"
          />
          <button disabled className="text-[#94A3B8] p-1 hover:text-[#6D1A75] cursor-not-allowed">
            <MicIcon />
          </button>
          <button disabled className="w-6 h-6 bg-[#6D1A75] rounded flex items-center justify-center text-white cursor-not-allowed opacity-50">
            <SendIcon />
          </button>
        </div>
      </div>
    </aside>
  );

  // ─── Home View ────────────────────────────────────────────────────────────
  const HomeView = (
    <div className="flex-1 flex overflow-hidden">
      {/* Main scroll area */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-8 py-8">

          {/* Welcome Card */}
          <div
            className="rounded-2xl mb-8 overflow-hidden border border-[#E5E7EB] shadow-sm"
            style={{ background: "linear-gradient(135deg, #F0EEFF 0%, #FEF3E8 100%)" }}
          >
            <div className="flex items-center justify-between px-8 py-6">
              <div>
                <h1 className="text-xl font-bold text-[#172033] mb-1.5">Welcome Aboard, Abhishek!</h1>
                <p className="text-sm text-[#64748B] max-w-xs leading-relaxed">
                  Fireflies is now ready to automate your meetings and streamline your workflows.
                </p>
              </div>
              <div className="w-36 h-24 rounded-xl overflow-hidden shadow-md border border-white/60 shrink-0 ml-4 bg-[#172033] flex items-center justify-center relative">
                {/* Video placeholder thumbnail */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#1E1B4B] to-[#2D1B69]" />
                <div className="relative z-10 flex flex-col items-center gap-1">
                  <div className="w-8 h-8 rounded-full bg-[#6D1A75] flex items-center justify-center shadow-lg">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                      <polygon points="5 3 19 12 5 21 5 3"/>
                    </svg>
                  </div>
                  <span className="text-[9px] text-white/70">Fireflies · Product Demo</span>
                </div>
                {/* Decorative dots */}
                <div className="absolute bottom-2 left-2 flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                  <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                  <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Start */}
          <h2 className="text-sm font-semibold text-[#172033] mb-1">Quick Start</h2>
          <p className="text-xs text-[#64748B] mb-4">Capture your first meeting or upload a recording to see Fireflies in action.</p>
          <div className="grid grid-cols-3 gap-3 mb-8">
            <button
              disabled
              className="bg-white px-4 py-3.5 rounded-xl border border-[#E5E7EB] shadow-sm text-left flex items-center justify-between group hover:border-[#94A3B8] transition-colors cursor-not-allowed"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#FFF7ED] border border-[#FED7AA] flex items-center justify-center text-orange-400 shrink-0">
                  <CalendarIcon />
                </div>
                <span className="text-sm font-medium text-[#172033]">Schedule Meeting</span>
              </div>
              <ChevronRight />
            </button>
            <button
              disabled
              className="bg-white px-4 py-3.5 rounded-xl border border-[#E5E7EB] shadow-sm text-left flex items-center justify-between group hover:border-[#94A3B8] transition-colors cursor-not-allowed"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#F0FDF4] border border-[#BBF7D0] flex items-center justify-center text-green-500 shrink-0">
                  <UploadIcon />
                </div>
                <span className="text-sm font-medium text-[#172033]">Upload File</span>
              </div>
              <ChevronRight />
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-white px-4 py-3.5 rounded-xl border border-[#6D1A75]/30 shadow-sm text-left flex items-center justify-between group hover:border-[#6D1A75] hover:bg-[#FDFAFF] transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#F3EAF5] border border-[#6D1A75]/20 flex items-center justify-center text-[#6D1A75] shrink-0">
                  <CameraIcon />
                </div>
                <span className="text-sm font-medium text-[#6D1A75] group-hover:text-[#4F1457]">Capture Meeting</span>
              </div>
              <span className="text-[#6D1A75]"><ChevronRight /></span>
            </button>
          </div>

          {/* Recent / Upcoming / AI Feed tabs */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex gap-1">
              {(["recent", "upcoming", "aifeed"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => tab === "recent" && setActiveHomeTab(tab)}
                  disabled={tab !== "recent"}
                  className={`px-3 py-1.5 text-sm rounded-md font-medium transition-colors ${
                    activeHomeTab === tab
                      ? "bg-[#F3EAF5] text-[#6D1A75]"
                      : "text-[#94A3B8] hover:text-[#64748B]"
                  } ${tab !== "recent" ? "cursor-not-allowed" : "cursor-pointer"}`}
                >
                  {tab === "recent" ? "Recent" : tab === "upcoming" ? "Upcoming" : "AI Feed"}
                </button>
              ))}
            </div>
            <button disabled className="text-xs text-[#94A3B8] flex items-center gap-1 cursor-not-allowed hover:text-[#64748B]">
              <SettingsIcon /> <span>Settings</span>
            </button>
          </div>

          {/* Meeting list */}
          <div className="space-y-px mb-10">
            {loading ? (
              <div className="py-8 text-center text-sm text-[#94A3B8]">Loading...</div>
            ) : meetings.length === 0 ? (
              <div className="py-8 text-center text-sm text-[#94A3B8]">No meetings yet. Capture your first one!</div>
            ) : (
              meetings.slice(0, 5).map((m) => (
                <div
                  key={m.id}
                  onClick={() => (window.location.href = `/meetings/${m.id}`)}
                  className="flex items-center gap-3 py-3 px-2 rounded-lg hover:bg-[#FAFAFB] cursor-pointer transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#6D1A75] flex items-center justify-center text-white text-xs font-bold shrink-0">
                    F
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#172033] truncate group-hover:text-[#6D1A75] transition-colors">
                      {m.title}
                    </p>
                    <p className="text-xs text-[#94A3B8]">{formatDateTime(m.meeting_date)}</p>
                  </div>
                  <span className="text-xs text-[#94A3B8] shrink-0">{formatDuration(m.duration_seconds)}</span>
                </div>
              ))
            )}
          </div>

          {/* Try More */}
          <h2 className="text-sm font-semibold text-[#172033] mb-4">Try More</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm p-5">
              <div className="text-[#64748B] mb-3">
                <MonitorIcon />
              </div>
              <h3 className="text-sm font-semibold text-[#172033] mb-1.5">Desktop App</h3>
              <p className="text-xs text-[#64748B] mb-4 leading-relaxed">
                Capture conversations without any bot present in your meeting.
              </p>
              <button
                disabled
                className="flex items-center gap-2 bg-[#6D1A75] text-white text-xs font-medium px-3 py-1.5 rounded-lg cursor-not-allowed opacity-80"
              >
                <DownloadIcon />
                Download
              </button>
            </div>
            <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm p-5">
              <div className="text-[#64748B] mb-3">
                <SmartphoneIcon />
              </div>
              <h3 className="text-sm font-semibold text-[#172033] mb-1.5">Mobile App</h3>
              <p className="text-xs text-[#64748B] mb-4 leading-relaxed">
                Record in-person conversations and review meetings on the go.
              </p>
              <div className="flex items-center gap-2">
                <button disabled className="w-7 h-7 rounded-md bg-[#FAFAFB] border border-[#E5E7EB] flex items-center justify-center text-lg cursor-not-allowed">🍎</button>
                <button disabled className="w-7 h-7 rounded-md bg-[#FAFAFB] border border-[#E5E7EB] flex items-center justify-center text-lg cursor-not-allowed">▶</button>
              </div>
            </div>
          </div>

          <div className="h-8" />
        </div>
      </div>

      {/* Right Sidebar */}
      {RightSidebar}
    </div>
  );

  // ─── Meetings View ────────────────────────────────────────────────────────
  const MeetingsView = (
    <div className="flex-1 flex overflow-hidden">
      {/* Left channels sidebar */}
      <aside className="w-52 bg-white border-r border-[#E5E7EB] flex flex-col shrink-0">
        {/* Search channels */}
        <div className="px-3 py-3 border-b border-[#E5E7EB]">
          <div className="relative">
            <div className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#94A3B8]">
              <SearchIcon size={13} />
            </div>
            <input
              type="text"
              placeholder="Search channels"
              value={sidebarSearch}
              onChange={(e) => setSidebarSearch(e.target.value)}
              className="w-full pl-7 pr-2 py-1.5 text-xs bg-[#FAFAFB] border border-[#E5E7EB] rounded-md text-[#172033] placeholder-[#94A3B8] focus:outline-none focus:border-[#6D1A75]"
            />
          </div>
        </div>

        {/* Nav items */}
        <nav className="flex-1 px-2 py-2 space-y-0.5 overflow-y-auto">
          <button
            onClick={() => setActiveMeetingTab("my")}
            className={`w-full flex items-center gap-2.5 px-2.5 py-2 text-sm rounded-lg transition-colors font-medium ${
              activeMeetingTab === "my"
                ? "bg-[#F3EAF5] text-[#6D1A75]"
                : "text-[#64748B] hover:bg-[#FAFAFB] hover:text-[#172033]"
            }`}
          >
            <span className={activeMeetingTab === "my" ? "text-[#6D1A75]" : "text-[#94A3B8]"}><HashIcon /></span>
            My Meetings
          </button>
          <button
            onClick={() => setActiveMeetingTab("all")}
            className={`w-full flex items-center gap-2.5 px-2.5 py-2 text-sm rounded-lg transition-colors font-medium ${
              activeMeetingTab === "all"
                ? "bg-[#F3EAF5] text-[#6D1A75]"
                : "text-[#64748B] hover:bg-[#FAFAFB] hover:text-[#172033]"
            }`}
          >
            <span className={activeMeetingTab === "all" ? "text-[#6D1A75]" : "text-[#94A3B8]"}><ClockIcon /></span>
            All Meetings
          </button>
          <button disabled className="w-full flex items-center gap-2.5 px-2.5 py-2 text-sm text-[#94A3B8] rounded-lg cursor-not-allowed">
            <VoiceIcon />
            Voice Agent Meetings
          </button>

          <div className="pt-4 pb-1">
            <p className="text-[10px] font-semibold text-[#94A3B8] uppercase tracking-wider px-2.5 mb-2">All channels</p>
          </div>

          <div className="px-2.5 py-3 rounded-lg bg-[#FAFAFB] border border-dashed border-[#E5E7EB] mx-0.5">
            <div className="flex justify-center mb-2 text-[#94A3B8]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
            </div>
            <p className="text-[11px] text-[#94A3B8] text-center leading-relaxed">
              Create channels to organize your conversations
            </p>
          </div>
        </nav>

        {/* Add Channel button */}
        <div className="border-t border-[#E5E7EB] p-3">
          <button
            disabled
            className="w-full flex items-center gap-2 text-xs text-[#94A3B8] px-2.5 py-2 rounded-lg hover:bg-[#FAFAFB] cursor-not-allowed"
          >
            <PlusIcon />
            Channel
          </button>
        </div>
      </aside>

      {/* Main panel */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Sub-header with tabs */}
        <div className="bg-white border-b border-[#E5E7EB] px-6 flex items-center gap-1 shrink-0 h-11">
          <button disabled className="flex items-center gap-1 px-3 py-2 text-sm text-[#94A3B8] cursor-not-allowed">
            Hosted by me
            <span className="ml-1 text-[#C4C9D4] hover:text-[#94A3B8] text-xs">×</span>
          </button>
          <button disabled className="px-3 py-2 text-sm text-[#94A3B8] cursor-not-allowed">
            Shared with me
          </button>
          <div className="flex-1" />
          <button disabled className="flex items-center gap-1.5 text-xs text-[#64748B] border border-[#E5E7EB] px-2.5 py-1.5 rounded-md hover:bg-[#FAFAFB] cursor-not-allowed">
            <FilterIcon />
            Filters
          </button>
          <button disabled className="text-[#94A3B8] p-1.5 rounded-md hover:bg-[#FAFAFB] cursor-not-allowed ml-1">
            <SearchIcon size={15} />
          </button>
        </div>

        {/* Content */}
        <main className="flex-1 overflow-y-auto bg-[#FAFAFB] p-6">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-sm text-[#94A3B8]">Loading meetings...</div>
            </div>
          ) : filteredSidebarMeetings.length === 0 ? (
            /* Empty state */
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              {/* Wavy illustration placeholder */}
              <div className="mb-6 relative">
                <div className="w-32 h-20 flex items-end justify-center gap-1">
                  {[40, 55, 35, 65, 45, 70, 50].map((h, i) => (
                    <div
                      key={i}
                      className="w-3 rounded-t-sm bg-gradient-to-t from-[#E5E7EB] to-[#D1D5DB]"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
                <div className="absolute -bottom-1 w-32 h-1 bg-gradient-to-r from-transparent via-[#D1D5DB] to-transparent rounded-full" />
              </div>
              <h2 className="text-base font-semibold text-[#172033] mb-1.5">
                Looks like you haven&apos;t recorded a meeting yet
              </h2>
              <p className="text-sm text-[#64748B] mb-6 max-w-xs">
                Once you record your first meeting with Fireflies, it&apos;ll show up right here.
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-[#6D1A75] text-white px-5 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-[#4F1457] transition-colors shadow-sm"
              >
                <PlusIcon />
                Capture
              </button>
            </div>
          ) : (
            /* Meetings table */
            <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#E5E7EB] bg-[#FAFAFB]">
                    <th className="px-5 py-3 text-left text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wider">Name</th>
                    <th className="px-5 py-3 text-left text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wider">Date</th>
                    <th className="px-5 py-3 text-left text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wider">Duration</th>
                    <th className="px-5 py-3 text-left text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wider">Participants</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E7EB]">
                  {filteredSidebarMeetings.map((m) => {
                    const clickable = activeMeetingTab === "my";
                    return (
                      <tr
                        key={m.id}
                        onClick={() => clickable && (window.location.href = `/meetings/${m.id}`)}
                        className={`transition-colors ${clickable ? "hover:bg-[#FAFAFB] cursor-pointer" : "cursor-default"}`}
                      >
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-[#6D1A75] flex items-center justify-center text-white text-xs font-bold shrink-0">
                              F
                            </div>
                            <div>
                              <p className={`text-sm font-medium ${clickable ? "text-[#172033] hover:text-[#6D1A75]" : "text-[#172033]"}`}>{m.title}</p>
                              <p className="text-xs text-[#94A3B8] truncate max-w-xs">{m.summary?.slice(0, 60)}...</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-3.5 text-sm text-[#64748B] whitespace-nowrap">{formatDate(m.meeting_date)}</td>
                        <td className="px-5 py-3.5 text-sm text-[#64748B] whitespace-nowrap">{formatDuration(m.duration_seconds)}</td>
                        <td className="px-5 py-3.5">
                          <div className="flex -space-x-1.5">
                            {m.participants.slice(0, 4).map((p, i) => (
                              <div key={i} title={p.name} className="w-7 h-7 rounded-full bg-[#F3EAF5] border-2 border-white flex items-center justify-center text-[10px] font-bold text-[#6D1A75]">
                                {p.name.charAt(0).toUpperCase()}
                              </div>
                            ))}
                            {m.participants.length > 4 && (
                              <div className="w-7 h-7 rounded-full bg-[#FAFAFB] border-2 border-white flex items-center justify-center text-[10px] font-bold text-[#64748B]">
                                +{m.participants.length - 4}
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>

      {/* Right Sidebar */}
      {RightSidebar}
    </div>
  );

  // ─── Create Meeting Modal ─────────────────────────────────────────────────
  const CreateModal = isModalOpen && (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={(e) => e.target === e.currentTarget && setIsModalOpen(false)}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
        <div className="px-7 py-5 border-b border-[#E5E7EB] flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-[#172033]">Capture New Meeting</h2>
            <p className="text-xs text-[#64748B] mt-0.5">Paste a transcript to create a fully interactive meeting.</p>
          </div>
          <button onClick={() => setIsModalOpen(false)} className="text-[#94A3B8] hover:text-[#172033] p-1.5 rounded-lg hover:bg-[#FAFAFB]">
            <XIcon size={18} />
          </button>
        </div>
        <form onSubmit={handleCreateMeeting} className="px-7 py-6 space-y-5">
          <div>
            <label className="block text-xs font-semibold text-[#172033] mb-1.5 uppercase tracking-wide">Meeting Title</label>
            <input
              type="text" required value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="e.g., Weekly Team Sync"
              className="w-full px-3.5 py-2.5 bg-[#FAFAFB] border border-[#E5E7EB] rounded-lg text-sm text-[#172033] focus:outline-none focus:border-[#6D1A75] focus:bg-white"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#172033] mb-1.5 uppercase tracking-wide">Date</label>
              <input
                type="date" required value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#FAFAFB] border border-[#E5E7EB] rounded-lg text-sm text-[#172033] focus:outline-none focus:border-[#6D1A75] focus:bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#172033] mb-1.5 uppercase tracking-wide">Duration (seconds)</label>
              <input
                type="number" required value={newDuration}
                onChange={(e) => setNewDuration(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-[#FAFAFB] border border-[#E5E7EB] rounded-lg text-sm text-[#172033] focus:outline-none focus:border-[#6D1A75] focus:bg-white"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#172033] mb-1.5 uppercase tracking-wide">
              Transcript <span className="normal-case text-[#94A3B8] font-normal">(format: <code className="bg-[#FAFAFB] px-1 rounded">Name: text</code> per line)</span>
            </label>
            <textarea
              required rows={7} value={transcriptText}
              onChange={(e) => setTranscriptText(e.target.value)}
              placeholder={"Abhishek: Welcome everyone to today's sync.\nJohn: Thanks for having me, looking forward to it.\nAbhishek: Let's start with the product roadmap updates."}
              className="w-full px-3.5 py-2.5 bg-[#FAFAFB] border border-[#E5E7EB] rounded-lg text-sm text-[#172033] font-mono focus:outline-none focus:border-[#6D1A75] focus:bg-white resize-none"
            />
          </div>
          <div className="flex items-center justify-end gap-3 pt-2 border-t border-[#E5E7EB]">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm text-[#64748B] hover:text-[#172033] font-medium">
              Cancel
            </button>
            <button
              type="submit" disabled={creating}
              className="bg-[#6D1A75] text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-[#4F1457] disabled:opacity-50 transition-colors shadow-sm"
            >
              {creating ? "Creating..." : "Create Meeting"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  // ─── Trial Banner ─────────────────────────────────────────────────────────
  const TrialBanner = showBanner && (
    <div className="bg-gradient-to-r from-[#FAF5FF] to-[#FFF7ED] border-b border-[#E5E7EB] px-6 py-2.5 flex items-center justify-center gap-3 shrink-0 relative">
      <p className="text-xs text-[#172033]">
        You are eligible for{" "}
        <span className="font-semibold text-[#6D1A75]">7 days business plan free trial</span>.{" "}
        <button className="text-[#6D1A75] font-semibold hover:underline">Start free trial →</button>
      </p>
      <button
        onClick={() => setShowBanner(false)}
        className="absolute right-4 text-[#94A3B8] hover:text-[#64748B]"
      >
        <XIcon size={14} />
      </button>
    </div>
  );

  // ─── Full Layout ──────────────────────────────────────────────────────────
  return (
    <div className="h-screen bg-[#FAFAFB] flex flex-col overflow-hidden">
      {TrialBanner}
      {TopNavbar}

      <div className="flex-1 flex overflow-hidden">
        {IconSidebar}
        {activeView === "home" ? HomeView : MeetingsView}
      </div>

      {CreateModal}
    </div>
  );
}