"use client";

import { useEffect, useState, useRef } from "react";
import { getMeetings, createMeeting, Meeting } from "@/lib/api";
import Sidebar from "@/components/Sidebar";
import HomeMiddle from "@/components/HomeMiddle";


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
  const [activeMeetingTab, setActiveMeetingTab] = useState<"my" | "all" | "autopilot">("my");
  const [activeHomeTab, setActiveHomeTab] = useState<"recent" | "upcoming" | "aifeed">("recent");
  const [showBanner, setShowBanner] = useState(true);
  const [fredInput, setFredInput] = useState("");
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [meetingSubFilter, setMeetingSubFilter] = useState<"all" | "hosted" | "shared">("all");
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
  const autopilotMeetings = meetings.filter((m) =>
    m.title.toLowerCase().includes("autopilot")
  );

  let displayedMeetings = allMeetings;
  if (activeMeetingTab === "my") {
    displayedMeetings = myMeetings;
  } else if (activeMeetingTab === "all") {
    displayedMeetings = allMeetings;
  } else if ((activeMeetingTab as string) === "autopilot") {
    displayedMeetings = autopilotMeetings;
  }

  // Apply subheader filters
  if (meetingSubFilter === "hosted") {
    displayedMeetings = displayedMeetings.filter((m) =>
      m.participants.some((p) => p.name.toLowerCase().includes("abhishek"))
    );
  } else if (meetingSubFilter === "shared") {
    displayedMeetings = displayedMeetings.filter((m) =>
      !m.participants.some((p) => p.name.toLowerCase().includes("abhishek")) || m.title.toLowerCase().includes("quick overview")
    );
  }

  const filteredSidebarMeetings = displayedMeetings.filter((m) =>
    m.title.toLowerCase().includes(sidebarSearch.toLowerCase()) ||
    m.title.toLowerCase().includes(search.toLowerCase())
  );

  // ─── Shared Top Navbar ────────────────────────────────────────────────────
  const TopNavbar = activeView === "home" ? (
    <header className="h-14 bg-white border-b border-[#E5E7EB] flex items-center px-4 gap-4 shrink-0 z-20">
      {/* Logo + Breadcrumb */}
      <div className="flex items-center gap-3 w-56 shrink-0">
        <FirefliesLogo size={28} />
        <span className="text-sm font-medium text-[#64748B]">
          Home
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
  ) : (
    <header className="h-[52px] min-h-[52px] bg-white border-b border-[#eaecf0] flex items-center px-4 gap-4 w-full shrink-0 z-20 font-sans text-sm antialiased">
      {/* Meetings breadcrumb block */}
      <div className="w-[81px] min-w-[81px] h-5 min-h-[20px] flex items-center shrink-0">
        <div className="text-[#101828] font-sans text-sm font-semibold tracking-[-0.16px] whitespace-nowrap">Meetings</div>
      </div>

      {/* Center Search Input (s4) */}
      <div className="w-[320px] min-w-[320px] h-[34px] min-h-[34px] flex items-center relative flex-grow max-w-sm">
        <div className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ width: "16px", height: "16px" }}>
            <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            <path d="M20.9999 21L16.6499 16.65" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </div>
        <input 
          type="text" 
          placeholder="Search by title or keyword" 
          className="w-full pl-8 pr-16 py-1.5 bg-[#f9fafb] border border-[#eaecf0] rounded-md text-xs text-[#344054] placeholder-gray-400 focus:outline-none focus:border-[#6938ef] focus:bg-white" 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
        />
        <div className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#98a2b3] font-sans text-[10px] leading-4 tracking-[-0.1px]">Ctrl + K</div>
      </div>

      {/* Right Controls Actions Panel (s11) */}
      <div className="flex items-center gap-3 flex-grow justify-end shrink-0">
        
        {/* Upgrade Button */}
        <button 
          className="flex items-center justify-center bg-gradient-to-b from-white/30 to-transparent bg-[#ecfdb7] text-[#107569] border border-[#d1fad7] hover:bg-[#d1fad7] active:scale-[0.98] rounded font-['DM_Sans',sans-serif] font-semibold text-xs leading-[14px] text-center whitespace-nowrap py-1.5 px-3 h-8 shadow-sm transition-all cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          Upgrade
        </button>

        <div className="w-[1px] h-5 bg-[#eaecf0]" />

        {/* Capture Dropdown Group */}
        <div className="relative flex items-center bg-[#6938ef] text-white rounded overflow-hidden shadow-sm h-8">
          <button 
            className="flex items-center justify-center gap-2 hover:bg-[#5925dc] px-3 h-full text-xs font-semibold cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ width: "20px", height: "20px" }}>
              <path d="M23 7L16 12L23 17V7Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M14 5H3C1.89543 5 1 5.89543 1 7V17C1 18.1046 1.89543 19 3 19H14C15.1046 19 16 18.1046 16 17V7C16 5.89543 15.1046 5 14 5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
            <span className="font-medium">Capture</span>
          </button>
          <button 
            className="flex items-center justify-center border-l border-white/10 hover:bg-[#5925dc] px-2 h-full cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ width: "20px", height: "20px" }}>
              <path d="M7 9.5L12 14.5L17 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </button>
        </div>

        {/* Mic outline icon button */}
        <button 
          className="flex items-center justify-center border border-[#eaecf0] hover:bg-gray-50 active:scale-[0.98] rounded p-1.5 h-8 w-8 shadow-sm transition-all text-[#5925DC] cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ width: "20px", height: "20px" }}>
            <path d="M10.4164 2.16666C9.70238 2.16666 9.01759 2.45032 8.51268 2.95522C8.00777 3.46013 7.72412 4.14493 7.72412 4.85897V11.141C7.72412 11.8551 8.00777 12.5399 8.51268 13.0448C9.01759 13.5497 9.70238 13.8333 10.4164 13.8333C11.1305 13.8333 11.8153 13.5497 12.3202 13.0448C12.8251 12.5399 13.1087 11.8551 13.1087 11.141V4.85897C13.1087 4.14493 12.8251 3.46013 12.3202 2.95522C11.8153 2.45032 11.1305 2.16666 10.4164 2.16666Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            <path d="M16.898 9.83333V11.6852C16.898 13.4042 16.2152 15.0528 14.9996 16.2683C13.7841 17.4838 12.1355 18.1667 10.4165 18.1667C8.69754 18.1667 7.04895 17.4838 5.83344 16.2683C4.61793 15.0528 3.93506 13.4042 3.93506 11.6852V9.83333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </button>

        <div className="w-[1px] h-5 bg-[#eaecf0]" />

        {/* Notifications */}
        <button className="relative flex items-center justify-center hover:bg-gray-50 rounded p-1.5 h-8 w-8 transition-colors cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" strokeWidth="1.1" viewBox="0 0 16 16" fill="none" style={{ width: "20px", height: "20px" }}>
            <path d="M12 5.33398C12 4.27312 11.5786 3.2557 10.8284 2.50556C10.0783 1.75541 9.06087 1.33398 8 1.33398C6.93913 1.33398 5.92172 1.75541 5.17157 2.50556C4.42143 3.2557 4 4.27312 4 5.33398C4 10.0007 2 11.334 2 11.334H14C14 11.334 12 10.0007 12 5.33398Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path>
            <path d="M9.15335 14C9.03614 14.2021 8.86791 14.3698 8.6655 14.4864C8.46309 14.6029 8.2336 14.6643 8.00001 14.6643C7.76643 14.6643 7.53694 14.6029 7.33453 14.4864C7.13212 14.3698 6.96389 14.2021 6.84668 14" stroke="#667085" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full border border-white" />
        </button>

        {/* Profile Image avatar */}
        <span className="flex items-center justify-center rounded-full overflow-hidden select-none w-8 h-8 cursor-pointer">
          <img className="w-8 h-8 object-cover" src="https://lh3.googleusercontent.com/a/ACg8ocLzmRlGGhaQdiIVDBdwD8scCYUC-sVw46NFFbipZHR6nEZ6EQ=s96-c" alt="Abhishek Singh" />
        </span>

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
    <aside className="hidden xl:flex w-[300px] min-w-[300px] bg-white border-l border-[#eaecf0] flex-col shrink-0 overflow-hidden relative font-sans">
      {/* Background blur gradient */}
      <div 
        className="absolute top-0 right-0 left-[-100.4px] opacity-50 pointer-events-none filter blur-[36px] z-0"
        style={{
          backgroundImage: "linear-gradient(90deg, rgb(213, 252, 255) 0.92%, rgb(233, 255, 226) 45.92%, rgb(247, 230, 255) 100%)",
          width: "400px",
          height: "120px"
        }}
      />
      
      {/* Header Close button row */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#eaecf0] z-10 bg-transparent">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-[#344054]">✦ Ask Fred</span>
        </div>
        <button disabled className="text-[#94A3B8] cursor-not-allowed p-1 rounded hover:bg-[#FAFAFB]">
          <XIcon size={14} />
        </button>
      </div>

      {/* Fred content area */}
      <div className="flex-1 overflow-y-auto px-6 pt-10 pb-6 flex flex-col gap-12 z-10 bg-transparent">
        <div className="w-[252px] min-w-[252px] h-[310px] min-h-[310px] flex flex-col gap-12">
          
          {/* Greeting */}
          <div className="w-[252px] min-w-[252px] h-[110px] min-h-[110px] flex flex-col gap-5 items-start">
            {/* Sparkles logo icon */}
            <div className="w-[34px] min-w-[34px] h-[34px] min-h-[34px] flex items-center justify-center overflow-hidden">
              <svg width="34" height="34" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "34px", height: "34px" }}>
                <path d="M13.846 8.23762L11.1175 7.151L9.981 4.54225C9.903 4.36394 9.597 4.36394 9.519 4.54225L8.3825 7.151L5.654 8.23762C5.5605 8.2749 5.5 8.36191 5.5 8.45848C5.5 8.55504 5.5605 8.64205 5.654 8.67934L8.3825 9.76596L9.519 12.3747C9.558 12.4641 9.649 12.5219 9.75 12.5219C9.851 12.5219 9.942 12.4641 9.981 12.3747L11.1175 9.76596L13.846 8.67934C13.9395 8.64205 14 8.55504 14 8.45848C14 8.36191 13.9395 8.2749 13.846 8.23762ZM7.329 4.88502L5.573 4.32521L4.9875 2.64628C4.919 2.45124 4.581 2.45124 4.513 2.64628L3.927 4.32521L2.171 4.88502C2.069 4.918 2 5.00931 2 5.11209C2 5.21487 2.069 5.30618 2.171 5.33917L3.9275 5.89897L4.513 7.57838C4.547 7.67542 4.6425 7.74139 4.75 7.74139C4.8575 7.74139 4.953 7.67542 4.9875 7.5779L5.573 5.89849L7.3295 5.33869C7.431 5.30618 7.5 5.21487 7.5 5.11209C7.5 5.00931 7.431 4.918 7.329 4.88502ZM6.329 11.0997L5.3225 10.779L4.987 9.81663C4.919 9.62158 4.5805 9.62158 4.5125 9.81663L4.177 10.779L3.1705 11.0997C3.069 11.1327 3 11.224 3 11.3268C3 11.4296 3.069 11.5209 3.171 11.5539L4.1775 11.8747L4.513 12.837C4.547 12.934 4.6425 13 4.75 13C4.8575 13 4.953 12.934 4.9875 12.8365L5.323 11.8742L6.3295 11.5534C6.431 11.5209 6.5 11.4296 6.5 11.3268C6.5 11.224 6.431 11.1327 6.329 11.0997Z" fill="url(#paint0_linear_1670_39838)"></path>
                <defs>
                  <linearGradient id="paint0_linear_1670_39838" x1="2" y1="3.41875" x2="12.5348" y2="14.405" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#E6FF4B"></stop>
                    <stop offset="1" stopColor="#48DEFF"></stop>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="w-[223px] min-w-[223px] h-[56px] min-h-[56px] flex flex-col font-sans">
              <span className="block text-[#344054] text-lg font-medium leading-7 tracking-[-0.32px]">Hi Abhishek!</span>
              <span className="block text-[#344054] text-lg font-medium leading-7 tracking-[-0.32px]">Get ready for your meeting</span>
            </div>
          </div>

          {/* Quick Prompts */}
          <div className="w-[252px] min-w-[252px] h-[152px] min-h-[152px] flex flex-col gap-4 items-start font-sans">
            <button disabled className="w-[157px] min-w-[157px] h-10 min-h-[40px] flex flex-row items-center gap-3 pt-2.5 pr-3 pb-2.5 pl-3 bg-[#f9fafb] rounded-lg cursor-not-allowed hover:bg-gray-50 border border-transparent shadow-sm">
              <span className="text-sm">✅</span>
              <span className="text-[#344054] text-xs font-semibold tracking-[-0.16px]">My action items</span>
            </button>
            <button disabled className="w-[145px] min-w-[145px] h-10 min-h-[40px] flex flex-row items-center gap-3 pt-2.5 pr-3 pb-2.5 pl-3 bg-[#f9fafb] rounded-lg cursor-not-allowed hover:bg-gray-50 border border-transparent shadow-sm">
              <span className="text-sm">🎯</span>
              <span className="text-[#344054] text-xs font-semibold tracking-[-0.16px]">Key decisions</span>
            </button>
            <button disabled className="w-[143px] min-w-[143px] h-10 min-h-[40px] flex flex-row items-center gap-3 pt-2.5 pr-3 pb-2.5 pl-3 bg-[#f9fafb] rounded-lg cursor-not-allowed hover:bg-gray-50 border border-transparent shadow-sm">
              <span className="text-sm">📌</span>
              <span className="text-[#344054] text-xs font-semibold tracking-[-0.16px]">Key initiatives</span>
            </button>
          </div>
          
        </div>
      </div>

      {/* Fred Input Box (s21) */}
      <div className="border-t border-[#eaecf0] p-4 bg-white z-10">
        <div className="w-[266px] min-w-[266px] h-[144px] min-h-[144px] flex flex-col justify-between py-3 px-3 rounded-lg border border-[#eaecf0] shadow-sm bg-white">
          <div className="flex flex-col gap-2">
            
            {/* Hash indicator */}
            <div className="w-[120px] min-w-[120px] h-[28px] min-h-[28px] flex items-center text-[#98a2b3]">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ width: "14px", height: "14px" }}>
                <path d="M4 9H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M4 15H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M10 3L8 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M16 3L14 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </div>
            
            {/* Input area */}
            <div className="w-full h-10 min-h-[40px] overflow-hidden">
              <textarea
                disabled
                value={fredInput}
                onChange={(e) => setFredInput(e.target.value)}
                placeholder="Ask anything. Type / to run AI skills."
                className="w-full text-xs text-[#101828] placeholder-[#98a2b3] bg-transparent focus:outline-none resize-none cursor-not-allowed h-full"
              />
            </div>
            
          </div>

          {/* Buttons controls row */}
          <div className="flex flex-row justify-between items-center w-full h-8 min-h-[32px]">
            {/* Left buttons */}
            <div className="flex flex-row items-center gap-1.5 w-[64px] min-w-[64px] h-8 min-h-[32px]">
              <button disabled type="button" className="w-8 h-8 rounded flex items-center justify-center text-[#475467] hover:bg-gray-50 cursor-not-allowed opacity-60">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="3.5 3.5 17 17" fill="none" style={{ width: "16px", height: "16px" }}>
                  <path d="M12 5V19" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M5 12H19" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </button>
              <button disabled type="button" className="w-8 h-8 rounded flex items-center justify-center text-[#475467] hover:bg-gray-50 cursor-not-allowed opacity-60">
                <div className="w-[18px] min-w-[18px] h-[18px] min-h-[18px] flex items-center">
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "18px", height: "18px" }}>
                    <g clipPath="url(#clip0_563_9249)">
                      <path d="M13.35 10L17.9167 12.6083C18.0449 12.681 18.1516 12.7864 18.2258 12.9138C18.3 13.0411 18.3391 13.1859 18.3391 13.3333C18.3391 13.4807 18.3 13.6255 18.2258 13.7529C18.1516 13.8803 18.0449 13.9857 17.9167 14.0583L10.8333 18.1167C10.58 18.2629 10.2926 18.34 10 18.34C9.70745 18.34 9.42004 18.2629 9.16668 18.1167L2.08335 14.0583C1.9551 13.9857 1.84842 13.8803 1.77421 13.7529C1.69999 13.6255 1.66089 13.4807 1.66089 13.3333C1.66089 13.1859 1.69999 13.0411 1.77421 12.9138C1.84842 12.7864 1.9551 12.681 2.08335 12.6083L6.65001 10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"></path>
                      <path d="M10.8333 11.4501C10.58 11.5964 10.2926 11.6734 10 11.6734C9.70745 11.6734 9.42004 11.5964 9.16668 11.4501L2.08335 7.39178C1.9551 7.3191 1.84842 7.2137 1.77421 7.08633C1.69999 6.95897 1.66089 6.81419 1.66089 6.66678C1.66089 6.51937 1.69999 6.37459 1.77421 6.24723C1.84842 6.11986 1.9551 6.01446 2.08335 5.94178L9.16668 1.88345C9.42004 1.73717 9.70745 1.66016 10 1.66016C10.2926 1.66016 10.58 1.73717 10.8333 1.88345L17.9167 5.94178C18.0449 6.01446 18.1516 6.11986 18.2258 6.24723C18.3 6.37459 18.3391 6.51937 18.3391 6.66678C18.3391 6.81419 18.3 6.95897 18.2258 7.08633C18.1516 7.2137 18.0449 7.3191 17.9167 7.39178L10.8333 11.4501Z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"></path>
                    </g>
                    <defs>
                      <clipPath id="clip0_563_9249">
                        <rect width="20" height="20" fill="white"></rect>
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </button>
            </div>
            
            {/* Right buttons */}
            <div className="flex flex-row items-center gap-1.5 w-[68px] min-w-[68px] h-8 min-h-[32px]">
              <button disabled type="button" aria-label="Start voice dictation" className="w-8 h-8 rounded flex items-center justify-center text-[#475467] hover:bg-gray-50 cursor-not-allowed opacity-60">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 16 16" fill="none" style={{ width: "18px", height: "18px" }}>
                  <path d="M8 0.666666C7.46957 0.666666 6.96086 0.87738 6.58579 1.25245C6.21071 1.62753 6 2.13623 6 2.66667V8C6 8.53043 6.21071 9.03914 6.58579 9.41421C6.96086 9.78929 7.46957 10 8 10C8.53043 10 9.03914 9.78929 9.41421 9.41421C9.78929 9.03914 10 8.53043 10 8V2.66667C10 2.13623 9.78929 1.62753 9.41421 1.25245C9.03914 0.87738 8.53043 0.666666 8 0.666666Z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M12.6667 6.66667V8C12.6667 9.23768 12.175 10.4247 11.2998 11.2998C10.4247 12.175 9.23769 12.6667 8.00001 12.6667C6.76233 12.6667 5.57535 12.175 4.70018 11.2998C3.82501 10.4247 3.33334 9.23768 3.33334 8V6.66667" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M8 12.6667V15.3333" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </button>
              <button disabled type="button" aria-label="Send" className="w-8 h-8 rounded-md flex items-center justify-center bg-[#d9d6fe] text-white cursor-not-allowed hover:bg-[#c3befc] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ width: "20px", height: "20px" }}>
                  <path d="M12 19V5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                  <path d="M5 12L12 5L19 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </aside>
  );

  // ─── Home View ────────────────────────────────────────────────────────────
  const HomeView = (
    <div className="flex-1 flex overflow-hidden">
      {/* Main scroll area */}
      <div className="flex-1 overflow-y-auto bg-white">
        <HomeMiddle
          meetings={meetings}
          loading={loading}
          onUploadClick={() => setIsModalOpen(true)}
          onCaptureClick={() => setIsModalOpen(true)}
          onScheduleClick={() => setIsModalOpen(true)}
        />
      </div>
    </div>
  );

  // ─── Meetings View ────────────────────────────────────────────────────────
  const MeetingsView = (
    <div className="flex-1 flex overflow-hidden">
      {/* Left channels sidebar (250px) */}
      <aside className="hidden lg:flex w-[250px] min-w-[250px] bg-[#fcfcfd] border-r border-[#eaecf0] flex-col shrink-0 font-sans">
        
        {/* Nav items tabs block */}
        <div className="w-[249px] min-w-[249px] h-[153px] min-h-[153px] border-b border-[#eaecf0] flex flex-col p-3 gap-1">
          {/* Tab 1: Hosted / Shared */}
          <button
            onClick={() => setActiveMeetingTab("my")}
            className={`flex items-center gap-3 px-3 py-2.5 rounded font-sans text-sm font-semibold tracking-[-0.16px] transition-colors w-full text-left cursor-pointer ${
              activeMeetingTab === "my"
                ? "bg-[#f4f3ff] text-[#5925dc]"
                : "text-[#667085] hover:bg-gray-50"
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-purple-600">
              <path d="M4 9H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M4 15H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M10 3L8 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M16 3L14 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
            <span>Hosted / Shared</span>
          </button>

          {/* Tab 2: All */}
          <button
            onClick={() => setActiveMeetingTab("all")}
            className={`flex items-center gap-3 px-3 py-2.5 rounded font-sans text-sm font-semibold tracking-[-0.16px] transition-colors w-full text-left cursor-pointer ${
              activeMeetingTab === "all"
                ? "bg-[#f4f3ff] text-[#5925dc]"
                : "text-[#667085] hover:bg-gray-50"
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 20" fill="none" className="w-4 h-4 text-purple-600">
              <path d="M1.66699 2.49963H6.66699C7.55105 2.49963 8.39889 2.85082 9.02401 3.47594C9.64914 4.10107 10.0003 4.94891 10.0003 5.83297V17.4996C10.0003 16.8366 9.73693 16.2007 9.26809 15.7319C8.79925 15.263 8.16337 14.9996 7.50033 14.9996H1.66699V2.49963Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M18.3333 2.49963H13.3333C12.4493 2.49963 11.6014 2.85082 10.9763 3.47594C10.3512 4.10107 10 4.94891 10 5.83297V17.4996C10 16.8366 10.2634 16.2007 10.7322 15.7319C11.2011 15.263 11.837 14.9996 12.5 14.9996H18.3333V2.49963Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
            <span>All</span>
          </button>

          {/* Tab 3: Autopilot */}
          <button
            onClick={() => setActiveMeetingTab("autopilot")}
            className={`flex items-center gap-3 px-3 py-2.5 rounded font-sans text-sm font-semibold tracking-[-0.16px] transition-colors w-full text-left cursor-pointer ${
              activeMeetingTab === "autopilot"
                ? "bg-[#f4f3ff] text-[#5925dc]"
                : "text-[#667085] hover:bg-gray-50"
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 text-purple-600">
              <path d="M12 2a4 4 0 0 1 4 4v2h2.5A1.5 1.5 0 0 1 20 9.5V17a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V9.5A1.5 1.5 0 0 1 5.5 8H8V6a4 4 0 0 1 4-4z" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="9" cy="13" r="1"/>
              <circle cx="15" cy="13" r="1"/>
              <path d="M9 16h6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Autopilot</span>
          </button>
        </div>

        {/* All channels section (s10) */}
        <div className="flex-1 p-3 overflow-y-auto">
          <div className="w-[226px] min-w-[226px] h-[192px] min-h-[192px] flex flex-col gap-2 rounded-lg bg-white border border-[#eaecf0] shadow-sm p-4 justify-between">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold text-[#344054]">All channels</span>
              
              {/* Channels content inner */}
              <div className="flex flex-col items-center justify-center py-2 text-center">
                <div className="flex justify-center mb-1 text-[#FAA7E0]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ width: "20px", height: "20px" }}>
                    <path d="M4 9H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M4 15H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M10 3L8 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M16 3L14 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </div>
                <p className="text-[10px] text-[#667085] leading-relaxed max-w-[160px]">
                  Create channels to organize your conversations
                </p>
              </div>
            </div>

            {/* Channel button */}
            <button
              disabled
              className="w-full flex items-center justify-center gap-1.5 text-xs text-[#667085] hover:text-black border border-[#eaecf0] rounded-md py-1.5 hover:bg-gray-50 cursor-not-allowed"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              <span>Channel</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main panel */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Sub-header with tabs */}
        <div className="bg-white border-b border-[#eaecf0] px-6 flex items-center gap-2 shrink-0 h-12 font-sans">
          
          <button 
            onClick={() => setMeetingSubFilter(meetingSubFilter === "hosted" ? "all" : "hosted")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold tracking-[-0.1px] border transition-all cursor-pointer ${
              meetingSubFilter === "hosted"
                ? "bg-[#f4f3ff] text-[#5925dc] border-[#d6bbff]"
                : "text-[#344054] border-[#eaecf0] hover:bg-gray-50"
            }`}
          >
            <span>Hosted by me</span>
            {meetingSubFilter === "hosted" && <span className="text-[#9855f7] text-[10px] font-bold">×</span>}
          </button>

          <button 
            onClick={() => setMeetingSubFilter(meetingSubFilter === "shared" ? "all" : "shared")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold tracking-[-0.1px] border transition-all cursor-pointer ${
              meetingSubFilter === "shared"
                ? "bg-[#f4f3ff] text-[#5925dc] border-[#d6bbff]"
                : "text-[#344054] border-[#eaecf0] hover:bg-gray-50"
            }`}
          >
            <span>Shared with me</span>
            {meetingSubFilter === "shared" && <span className="text-[#9855f7] text-[10px] font-bold">×</span>}
          </button>

          <div className="flex-1" />

          {/* Clean Filters icon dropdown action */}
          <button 
            onClick={() => setMeetingSubFilter("all")}
            className="flex items-center gap-1.5 text-xs text-[#344054] border border-[#eaecf0] px-3 py-1.5 rounded-lg hover:bg-gray-50 cursor-pointer shadow-sm transition-all bg-white"
          >
            <FilterIcon />
            <span>Reset Filters</span>
          </button>
        </div>

        {/* Content */}
        <main className="flex-1 overflow-y-auto bg-[#FAFAFB] p-6">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-sm text-[#94A3B8]">Loading meetings...</div>
            </div>
          ) : filteredSidebarMeetings.length === 0 ? (
            /* Empty state from TOON specifications */
            <div className="flex flex-col items-center justify-center h-full text-center py-12 font-sans select-none">
              <div className="w-[533px] min-w-[533px] h-[462px] min-h-[462px] flex flex-col justify-center items-center gap-6">
                
                {/* Wavy documents SVG */}
                <div className="mb-2">
                  <svg width="340" height="162" viewBox="0 0 340 162" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_d_903_36147)">
                      <path d="M21 16.5C21 10.1487 26.1487 5 32.5 5H215.5C221.851 5 227 10.1487 227 16.5V137.5C227 143.851 221.851 149 215.5 149H32.5C26.1487 149 21 143.851 21 137.5V16.5Z" fill="white" stroke="#EAECF0" strokeWidth="1.5"></path>
                    </g>
                    <g filter="url(#filter1_d_903_36147)">
                      <path d="M113 16.5C113 10.1487 118.149 5 124.5 5H307.5C313.851 5 319 10.1487 319 16.5V137.5C319 143.851 313.851 149 307.5 149H124.5C118.149 149 113 143.851 113 137.5V16.5Z" fill="white" stroke="#EAECF0" strokeWidth="1.5"></path>
                    </g>
                    <rect x="144" y="27" width="138" height="6" rx="3" fill="#F4F3FF"></rect>
                    <rect x="144" y="41" width="94" height="6" rx="3" fill="#F4F3FF"></rect>
                    <rect x="144" y="55" width="112" height="6" rx="3" fill="#F4F3FF"></rect>
                    <rect x="52" y="27" width="138" height="6" rx="3" fill="#F2F4F7"></rect>
                    <rect x="52" y="41" width="94" height="6" rx="3" fill="#F2F4F7"></rect>
                    <rect x="52" y="55" width="112" height="6" rx="3" fill="#F2F4F7"></rect>
                    <circle cx="155" cy="85" r="11" fill="#F4F3FF"></circle>
                    <circle cx="63" cy="85" r="11" fill="#F2F4F7"></circle>
                    <circle cx="181" cy="85" r="11" fill="#E0F2FE"></circle>
                    <circle cx="89" cy="85" r="11" fill="#E0F2FE"></circle>
                    <defs>
                      <filter id="filter0_d_903_36147" x="0.5" y="-15.5" width="247" height="186" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix>
                        <feOffset dy="1"></feOffset>
                        <feGaussianBlur stdDeviation="2"></feGaussianBlur>
                        <feColorMatrix type="matrix" values="0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.05 0"></feColorMatrix>
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_903_36147"></feBlend>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_903_36147" result="shape"></feBlend>
                      </filter>
                      <filter id="filter1_d_903_36147" x="92.5" y="-15.5" width="247" height="186" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix>
                        <feOffset dy="1"></feOffset>
                        <feGaussianBlur stdDeviation="2"></feGaussianBlur>
                        <feColorMatrix type="matrix" values="0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.05 0"></feColorMatrix>
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_903_36147"></feBlend>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_903_36147" result="shape"></feBlend>
                      </filter>
                    </defs>
                  </svg>
                </div>

                {/* Text description */}
                <div className="w-[480px] min-w-[480px] h-[72px] min-h-[72px] flex flex-col gap-2 items-center">
                  <span className="block text-[#101828] text-base font-semibold leading-6 tracking-[-0.32px]">Looks like you haven&apos;t recorded a meeting yet</span>
                  <span className="block text-[#667085] text-sm leading-5 tracking-[-0.16px] max-w-sm">Once you record your first meeting with Fireflies, it&apos;ll show up right here.</span>
                </div>

                {/* Capture button */}
                <div className="w-[102px] min-w-[102px] h-9 min-h-[36px] flex items-center justify-center">
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="w-full h-full flex flex-row justify-center items-center gap-2 pt-2 pr-3.5 pb-2 pl-3.5 bg-[#6938ef] hover:bg-[#5925dc] text-white rounded-lg shadow-sm cursor-pointer active:scale-95 transition-all text-xs font-semibold"
                  >
                    <PlusIcon />
                    <span>Capture</span>
                  </button>
                </div>
                
              </div>
            </div>
          ) : (
            /* Meetings table */
            <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
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
        <Sidebar activeView={activeView} setActiveView={setActiveView} onUploadClick={() => setIsModalOpen(true)} />
        {activeView === "home" ? HomeView : MeetingsView}
      </div>

      {CreateModal}
      
      {/* Floating Help Button & Popover */}
      <div className="fixed bottom-6 right-6 z-[9999] font-sans">
        <button
          type="button"
          onClick={() => setIsHelpOpen(!isHelpOpen)}
          className="w-12 h-12 bg-[#6938ef] hover:bg-[#5925dc] text-white rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition-all"
          aria-label="Help"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        </button>

        {isHelpOpen && (
          <div 
            className="absolute bottom-14 right-0 w-[296px] min-w-[296px] h-[428px] min-h-[428px] bg-white border border-[#eaecf0] rounded-lg shadow-[0_4px_6px_-2px_rgba(16,24,40,0.04),0_12px_12px_-4px_rgba(16,24,40,0.06)] flex flex-col font-sans text-sm text-black antialiased z-[9999]"
            style={{ transform: "translateY(-8px)" }}
          >
            <div className="contents relative rounded-lg overflow-hidden">
              <ul className="w-[294px] min-w-[294px] h-[423px] min-h-[423px] flex flex-col bg-white rounded-lg overflow-hidden">
                
                {/* Watch Product Overview Section */}
                <div className="w-[294px] min-w-[294px] h-[237px] min-h-[237px] flex flex-col gap-4 p-4 bg-[#f2f4f7] rounded-t-lg">
                  <div 
                    className="w-[262px] min-w-[262px] h-[148px] min-h-[148px] rounded-md overflow-hidden relative cursor-pointer group shadow-sm"
                    onClick={() => window.open("https://www.youtube.com/watch?v=uZuFXgNfZmI", "_blank")}
                  >
                    <img 
                      className="w-full h-full object-cover transition-transform group-hover:scale-105" 
                      src="https://img.youtube.com/vi/uZuFXgNfZmI/hqdefault.jpg" 
                      alt="Product Overview" 
                    />
                    {/* Play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/45 transition-colors">
                      <div className="w-10 h-10 bg-black/50 rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M7 3L21 12L7 21V3Z" fill="white" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="w-[262px] min-w-[262px] h-[41px] min-h-[41px] flex flex-row items-start gap-2 font-sans">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" className="mt-0.5 text-purple-700 w-4 h-4 flex-shrink-0">
                      <path d="M7 3L21 12L7 21V3Z" fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                    <div className="w-[212px] min-w-[212px] h-[41px] min-h-[41px] flex flex-col gap-0.5">
                      <span className="block text-[#101828] font-medium text-xs tracking-[-0.16px]">Watch Product Overview (5 min)</span>
                      <span className="block text-[#667085] text-[10px] tracking-[-0.16px]">Settings, AI Skills, and more.</span>
                    </div>
                  </div>
                </div>

                <hr className="w-[294px] min-w-[294px] h-[1px] border-t border-[#eaecf0] my-0" />

                {/* What's New Link */}
                <a href="https://fireflies.circle.so/c/fireflies-product-updates/" target="_blank" rel="noopener noreferrer" className="text-[#2e90fa] block hover:bg-gray-50">
                  <div className="w-[294px] min-w-[294px] h-[37px] min-h-[37px] flex flex-row items-center gap-3 px-4 py-2 text-[#344054] font-medium text-xs tracking-[-0.14px]">
                    <div className="w-4 min-w-[16px] h-[21px] min-h-[21px] flex items-center text-gray-500">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.88161 5.69625L10.0002 5.9815L10.2853 6.10045L14.8063 7.98668L10.2853 9.87292L10.0002 9.99187L9.88161 10.2771L8 14.802L6.11839 10.2771L5.99978 9.99187L5.71467 9.87292L1.19375 7.98668L5.71467 6.10045L5.99978 5.9815L6.11839 5.69625L8 1.17139L9.88161 5.69625Z" stroke="currentColor" strokeWidth="1.2"></path>
                      </svg>
                    </div>
                    <span>What&apos;s new?</span>
                  </div>
                </a>

                {/* Help Center Link */}
                <a href="https://guide.fireflies.ai/" target="_blank" rel="noopener noreferrer" className="text-[#2e90fa] block hover:bg-gray-50">
                  <div className="w-[294px] min-w-[294px] h-[37px] min-h-[37px] flex flex-row items-center gap-3 px-4 py-2 text-[#344054] font-medium text-xs tracking-[-0.14px]">
                    <div className="w-4 min-w-[16px] h-[21px] min-h-[21px] flex items-center text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 20" fill="none">
                        <path d="M1.66699 2.49963H6.66699C7.55105 2.49963 8.39889 2.85082 9.02401 3.47594C9.64914 4.10107 10.0003 4.94891 10.0003 5.83297V17.4996C10.0003 16.8366 9.73693 16.2007 9.26809 15.7319C8.79925 15.263 8.16337 14.9996 7.50033 14.9996H1.66699V2.49963Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M18.3333 2.49963H13.3333C12.4493 2.49963 11.6014 2.85082 10.9763 3.47594C10.3512 4.10107 10 4.94891 10 5.83297V17.4996C10 16.8366 10.2634 16.2007 10.7322 15.7319C11.2011 15.263 11.837 14.9996 12.5 14.9996H18.3333V2.49963Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg>
                    </div>
                    <span>Help Center</span>
                  </div>
                </a>

                {/* Community Link */}
                <a href="https://fireflies.circle.so/feed?utmSource=help&resources_dashboard" target="_blank" rel="noopener noreferrer" className="text-[#2e90fa] block hover:bg-gray-50">
                  <div className="w-[294px] min-w-[294px] h-[37px] min-h-[37px] flex flex-row items-center gap-3 px-4 py-2 text-[#344054] font-medium text-xs tracking-[-0.14px]">
                    <div className="w-4 min-w-[16px] h-[21px] min-h-[21px] flex items-center text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <g clipPath="url(#clip0_community)">
                          <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"></path>
                          <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"></path>
                          <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"></path>
                          <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"></path>
                        </g>
                        <defs>
                          <clipPath id="clip0_community">
                            <rect width="24" height="24" fill="white"></rect>
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <span>Fireflies Community</span>
                  </div>
                </a>

                <hr className="w-[294px] min-w-[294px] h-[1px] border-t border-[#eaecf0] my-0" />

                {/* Give Feedback */}
                <div 
                  className="w-[294px] min-w-[294px] h-[37px] min-h-[37px] flex flex-row items-center gap-3 px-4 py-2 text-[#344054] hover:bg-gray-50 font-medium text-xs tracking-[-0.14px] cursor-pointer"
                  onClick={() => setIsModalOpen(true)}
                >
                  <div className="w-4 min-w-[16px] h-[21px] min-h-[21px] flex items-center text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M2 2L6.71333 13.3133L8.38667 8.38667L13.3133 6.71333L2 2Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path>
                      <path d="M8.66669 8.66797L12.6667 12.668" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                  </div>
                  <span>Give Feedback</span>
                </div>

                {/* Contact Support */}
                <div 
                  className="w-[294px] min-w-[294px] h-[37px] min-h-[37px] flex flex-row items-center gap-3 px-4 py-2 text-[#344054] hover:bg-gray-50 font-medium text-xs tracking-[-0.14px] cursor-pointer"
                  onClick={() => setIsModalOpen(true)}
                >
                  <div className="w-4 min-w-[16px] h-[21px] min-h-[21px] flex items-center text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 20" fill="none">
                      <path d="M2.5 9.16667H5C5.44203 9.16667 5.86595 9.34227 6.17851 9.65483C6.49107 9.96739 6.66667 10.3913 6.66667 10.8333V13.3333C6.66667 13.7754 6.49107 14.1993 6.17851 14.5118C5.86595 14.8244 5.44203 15 5 15H4.16667C3.72464 15 3.30072 14.8244 2.98816 14.5118C2.67559 14.1993 2.5 13.7754 2.5 13.3333V9.16667ZM2.5 9.16667C2.5 8.18176 2.69399 7.20649 3.0709 6.29655C3.44781 5.3866 4.00026 4.55981 4.6967 3.86337C5.39314 3.16693 6.21993 2.61449 7.12987 2.23758C8.03982 1.86066 9.01509 1.66667 10 1.66667C10.9849 1.66667 11.9602 1.86066 12.8701 2.23758C13.7801 2.61449 14.6069 3.16693 15.3033 3.86337C15.9997 4.55981 16.5522 5.3866 16.9291 6.29655C17.306 7.20649 17.5 8.18176 17.5 9.16667M17.5 9.16667V13.3333C17.5 13.7754 17.3244 14.1993 17.0118 14.5118C16.6993 14.8244 16.2754 15 15.8333 15H15C14.558 15 14.134 14.8244 13.8215 14.5118C13.5089 14.1993 13.3333 13.3333V10.8333C13.3333 10.3913 13.5089 9.96739 13.8215 9.65483C14.134 9.34227 14.558 9.16667 15 9.16667H17.5Z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"></path>
                      <path d="M17.5 13.3333V15C17.5 15.884 17.1488 16.7319 16.5237 17.357C15.8986 17.9821 15.0507 18.3333 14.1667 18.3333H10" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                  </div>
                  <span>Contact Support</span>
                </div>

              </ul>
            </div>
          </div>
        )}
      </div>

      {CreateModal}
    </div>
  );
}