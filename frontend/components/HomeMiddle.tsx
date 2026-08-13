"use client";

import React, { useState } from "react";
import { Meeting } from "@/lib/api";

interface HomeMiddleProps {
  meetings: Meeting[];
  loading: boolean;
  onUploadClick: () => void;
  onCaptureClick: () => void;
  onScheduleClick?: () => void;
}

export default function HomeMiddle({
  meetings,
  loading,
  onUploadClick,
  onCaptureClick,
  onScheduleClick,
}: HomeMiddleProps) {
  const [activeTab, setActiveTab] = useState<"recent" | "upcoming" | "aifeed">("recent");

  // Date formatter
  const formatDateTime = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
      });
    } catch {
      return dateStr;
    }
  };

  // Determine sliding indicator position based on active tab
  const getIndicatorStyle = () => {
    switch (activeTab) {
      case "recent":
        return { left: "4px", width: "70px" };
      case "upcoming":
        return { left: "76px", width: "92px" };
      case "aifeed":
        return { left: "170px", width: "74px" };
      default:
        return { left: "4px", width: "70px" };
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full relative">
      {/* Welcome Header Background Gradient (extends screen-wide) */}
      <div 
        className="absolute top-0 left-0 right-0 h-[280px] z-0 pointer-events-none user-select-none"
        style={{
          backgroundImage: "linear-gradient(rgba(255, 255, 255, 0) 0%, rgb(255, 255, 255) 100%), linear-gradient(128.58deg, rgba(17, 112, 207, 0.3) 20.583%, rgba(254, 172, 170, 0.45) 62.685%, rgba(254, 209, 170, 0.6) 96.892%, rgba(255, 255, 255, 0) 113.84%)"
        }}
      />
      <div className="w-full max-w-[948px] min-h-screen h-auto flex flex-col gap-10 pt-6 px-4 md:px-16 pb-8 relative bg-transparent text-black font-sans text-sm antialiased cursor-crosshair z-10">
        
        <div className="w-full flex flex-col gap-10 scrollbar-thin">
          
          {/* Welcome Card Row */}
          <div className="w-full h-auto flex flex-col items-center gap-0">
            <div 
              className="w-full h-auto flex flex-col md:flex-row items-center justify-between gap-6 pt-9 px-6 pb-9 rounded-[20px] overflow-hidden shadow-sm"
              style={{
                backgroundImage:
                  "linear-gradient(rgb(254, 246, 238), rgb(254, 246, 238)), linear-gradient(rgb(247, 178, 122) 0%, rgba(0, 0, 0, 0) 100%)",
              }}
            >
              {/* Text Description */}
              <div className="w-full md:max-w-[400px] h-auto flex flex-col gap-2">
                <span className="block text-[#101828] opacity-80 font-['DM_Sans',sans-serif] text-xl font-medium leading-7 tracking-[-0.1px] h-auto">
                  Welcome Aboard, Abhishek !
                </span>
                <span className="block text-[#667085] font-sans text-[13px] leading-5 tracking-[-0.16px] h-auto">
                  Fireflies is now ready to automate your meetings and streamline your workflows.
                </span>
              </div>

              {/* Video Player Box */}
              <div 
                className="w-[202px] min-w-[202px] h-[137px] min-h-[137px] flex flex-row items-center justify-center relative flex-shrink-0 bg-cover bg-center rounded-xl overflow-hidden shadow-sm border border-white/60 cursor-pointer hover:scale-[1.02] transition-transform duration-200"
                style={{ backgroundImage: 'url("https://app.fireflies.ai/img/videoBackground.jpg")' }}
              >
                <div className="w-[195px] min-w-[195px] h-[130px] min-h-[130px] flex relative rounded-xl overflow-hidden">
                  <img
                    className="w-[195px] min-w-[195px] h-[130px] min-h-[130px] object-cover"
                    src="https://img.youtube.com/vi/uZuFXgNfZmI/hqdefault.jpg"
                    alt="Walkthrough"
                  />
                </div>
                {/* Play Button */}
                <div className="absolute w-12 min-w-[48px] h-8 min-h-[32px] flex items-center justify-center bg-[#6938ef] rounded-3xl top-[68.5px] right-[53px] bottom-[36.5px] left-[101px] translate-x-[-24px] translate-y-[-16px]">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ width: "16px", height: "16px" }}>
                    <path d="M4 2.66667L12.6667 8L4 13.3333V2.66667Z" fill="white"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Start Row */}
          <div className="w-full h-auto flex flex-col gap-3">
            <div className="w-full h-auto flex flex-col justify-center gap-1 pt-2 pb-2">
              <span className="block text-[#101828] font-sans text-lg font-medium leading-7 tracking-[-0.32px] h-auto">
                Quick Start
              </span>
              <span className="block text-[#667085] font-sans text-xs tracking-[-0.16px] h-auto">
                Capture your first meeting or upload a recording to see Fireflies in action.
              </span>
            </div>

            {/* Quick Actions Grid */}
            <div className="w-full h-auto grid grid-cols-1 md:grid-cols-3 gap-3">
              
              {/* Schedule Meeting */}
              <div className="w-full h-[54px] min-h-[54px] flex flex-row">
                <button
                  type="button"
                  onClick={onScheduleClick}
                  disabled={!onScheduleClick}
                  className={`w-full flex flex-row items-center justify-between pt-4 px-4 pb-4 bg-[#fdf2fa] border-[0.8px] border-solid border-[#f2f4f7] rounded-lg shadow-[0_2px_2px_0_rgba(16,24,40,0.04)] text-center overflow-hidden min-h-[54px] h-auto transition-all ${
                    onScheduleClick ? "hover:bg-[#fce7f3] active:scale-[0.98] cursor-pointer" : "cursor-not-allowed opacity-80"
                  }`}
                  aria-label="Schedule Meeting"
                >
                  <div className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-pink-500">
                      <path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                      <path d="M16 2V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                      <path d="M8 2V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                      <path d="M3 10H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                    <span className="block text-[#344054] font-sans whitespace-nowrap text-sm font-medium tracking-[-0.16px]">
                      Schedule Meeting
                    </span>
                  </div>
                  <div className="w-4 min-w-[16px] h-4 min-h-[16px] text-pink-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                      <path d="M9.5 17L14.5 12L9.5 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                  </div>
                </button>
              </div>

              {/* Upload File */}
              <div className="w-full h-[54px] min-h-[54px] flex flex-row">
                <button
                  type="button"
                  onClick={onUploadClick}
                  className="w-full flex flex-row items-center justify-between pt-4 px-4 pb-4 bg-[#f0fdf9] border-[0.8px] border-solid border-[#f2f4f7] rounded-lg shadow-[0_2px_2px_0_rgba(16,24,40,0.04)] text-center overflow-hidden min-h-[54px] h-auto hover:bg-[#dcfce7] active:scale-[0.98] transition-all cursor-pointer"
                  aria-label="Upload File"
                >
                  <div className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="20" height="20" strokeWidth="1.5" fill="none" className="w-5 h-5 text-teal-600">
                      <path stroke="currentColor" d="M15 7.5L10 2.5L5 7.5" strokeLinecap="round" strokeLinejoin="round"></path>
                      <path stroke="currentColor" d="M10 2.5V14.1667" strokeLinecap="round" strokeLinejoin="round"></path>
                      <path stroke="currentColor" d="M4.16675 17.5H15.8334" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                    <span className="block text-[#344054] font-sans whitespace-nowrap text-sm font-medium tracking-[-0.16px]">
                      Upload File
                    </span>
                  </div>
                  <div className="w-4 min-w-[16px] h-4 min-h-[16px] text-teal-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                      <path d="M9.5 17L14.5 12L9.5 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                  </div>
                </button>
              </div>

              {/* Capture Meeting */}
              <div className="w-full h-[54px] min-h-[54px] flex flex-row">
                <button
                  type="button"
                  onClick={onCaptureClick}
                  className="w-full flex flex-row items-center justify-between pt-4 px-4 pb-4 bg-[#f4f3ff] border-[0.8px] border-solid border-[#f2f4f7] rounded-lg shadow-[0_2px_2px_0_rgba(16,24,40,0.04)] text-center overflow-hidden min-h-[54px] h-auto hover:bg-[#ede9fe] active:scale-[0.98] transition-all cursor-pointer"
                  aria-label="Capture Meeting"
                >
                  <div className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-purple-600">
                      <path d="M12 5V19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                      <path d="M5 12H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                    <span className="block text-[#344054] font-sans whitespace-nowrap text-sm font-medium tracking-[-0.16px]">
                      Capture Meeting
                    </span>
                  </div>
                  <div className="w-4 min-w-[16px] h-4 min-h-[16px] text-purple-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                      <path d="M9.5 17L14.5 12L9.5 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                  </div>
                </button>
              </div>

            </div>
          </div>

          {/* Recent Meetings / Feed Tab Section */}
          <div className="w-full h-auto flex flex-col gap-5">
            <div className="w-full h-auto flex flex-col gap-0">
              <div className="w-full h-auto flex flex-col flex-grow">
                
                {/* Tab header row */}
                <div className="w-full h-auto flex flex-wrap justify-between items-center gap-4">
                  <div className="h-auto flex flex-row flex-grow overflow-auto scrollbar-none">
                    
                    {/* Tab pillbox container */}
                    <div className="relative flex flex-row items-center gap-0.5 pt-1 pr-1 pb-1 pl-1 bg-[#f2f4f7] rounded-md overflow-hidden z-10 w-[246px] min-w-[246px] h-[30px] min-h-[30px]">
                      
                      {/* Sliding Pill Indicator */}
                      <div
                        className="absolute bg-white rounded shadow-[0_2px_2px_0_rgba(16,24,40,0.04)] pointer-events-none z-0 top-[4px] bottom-[4px] transition-all duration-200"
                        style={getIndicatorStyle()}
                      />

                      {/* Recent Tab */}
                      <button
                        type="button"
                        onClick={() => setActiveTab("recent")}
                        className={`relative flex-1 flex items-center justify-center gap-[5px] z-10 rounded font-sans font-medium text-xs leading-[14px] text-center tracking-[-0.16px] select-none py-1 px-3 h-[22px] min-h-[22px] transition-colors duration-150 ${
                          activeTab === "recent" ? "text-[#344054]" : "text-[#667085] hover:text-[#344054]"
                        }`}
                      >
                        Recent
                      </button>

                      {/* Upcoming Tab */}
                      <button
                        type="button"
                        onClick={() => setActiveTab("upcoming")}
                        className={`relative flex-1 flex items-center justify-center gap-[5px] z-10 rounded font-sans font-medium text-xs leading-[14px] text-center tracking-[-0.16px] select-none py-1 px-3 h-[22px] min-h-[22px] transition-colors duration-150 ${
                          activeTab === "upcoming" ? "text-[#344054]" : "text-[#667085] hover:text-[#344054]"
                        }`}
                      >
                        <div className="flex justify-center items-center gap-1">Upcoming</div>
                      </button>

                      {/* AI Feed Tab */}
                      <button
                        type="button"
                        onClick={() => setActiveTab("aifeed")}
                        className={`relative flex-1 flex items-center justify-center gap-[5px] z-10 rounded font-sans font-medium text-xs leading-[14px] text-center tracking-[-0.16px] select-none py-1 px-3 h-[22px] min-h-[22px] transition-colors duration-150 ${
                          activeTab === "aifeed" ? "text-[#344054]" : "text-[#667085] hover:text-[#344054]"
                        }`}
                      >
                        AI Feed
                      </button>

                    </div>
                  </div>

                  {/* Settings button */}
                  <button type="button" disabled className="block focus:outline-none cursor-not-allowed">
                    <div className="flex flex-row items-center gap-1 flex-shrink-0 text-[#475467] w-[73px] min-w-[73px] h-5 min-h-[20px] transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className="w-4 h-4">
                        <path d="M10.152 11.2347L9.53667 10.9793" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M10.152 12.7653L9.53667 13.0207" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M10.6667 1.33333V4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M10.98 9.53667L11.2347 10.152" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M11.2347 13.848L10.9793 14.464" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M12.7653 10.152L13.0207 9.53667" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M13.02 14.464L12.7653 13.848" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M13.848 11.2347L14.464 10.9793" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M13.848 12.7653L14.464 13.0207" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M14 7.06133V4C14 3.64638 13.8595 3.30724 13.6095 3.05719C13.3594 2.80714 13.0203 2.66667 12.6667 2.66667H3.33333C2.97971 2.66667 2.64057 2.80714 2.39052 3.05719C2.14048 3.30724 2 3.64638 2 4V13.3333C2 13.687 2.14048 14.0261 2.39052 14.2761C2.64057 14.5262 2.97971 14.6667 3.33333 14.6667H7.33333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M2 6.66667H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M5.33333 1.33333V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg>
                      <span className="block font-['DM_Sans',sans-serif] text-xs font-medium tracking-[-0.16px]">
                        Settings
                      </span>
                    </div>
                  </button>
                </div>

                {/* Meeting content lists */}
                <div className="w-full h-auto flex flex-row flex-grow bg-white font-sans text-base leading-6 tracking-[-0.18px]">
                  <div className="w-full h-auto flex flex-row pt-5">
                    <div className="w-full h-auto flex flex-col pb-6">
                      
                      {loading ? (
                        <div className="w-full text-center text-sm py-4 text-gray-400">Loading meetings...</div>
                      ) : meetings.length === 0 ? (
                        /* Fallback Mock overview item to perfectly match user's TOON format */
                        <a
                          href="https://app.fireflies.ai/view/Fireflies-AI-Platform-Quick-Overview::b1H42tdxM8"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full h-auto block text-[#2e90fa] focus:outline-none"
                        >
                          <div className="w-full h-auto flex flex-row items-center gap-4 pt-3 px-4 pb-3 rounded-lg hover:bg-[#FAFAFB] border border-transparent hover:border-[#eaecf0] transition-all">
                            <div className="w-8 min-w-[32px] h-8 min-h-[32px] flex flex-row">
                              <button type="button" className="min-w-[32px] flex-basis-auto w-auto min-h-[32px] h-auto block">
                                <div className="w-8 min-w-[32px] h-8 min-h-[32px] flex flex-row">
                                  <span className="min-w-[32px] flex-basis-auto w-auto min-h-[32px] h-auto flex justify-center items-center rounded overflow-hidden select-none">
                                    <img
                                      className="w-8 min-w-[32px] h-8 min-h-[32px] rounded object-cover"
                                      src="https://lh3.googleusercontent.com/a/ACg8ocKeIiXUzkKvoDXeE2UoyDLT2VhJ8_Ygs4QDM44D6S53Eg=s96-c"
                                      alt="Fred Fireflies profile photo"
                                    />
                                  </span>
                                </div>
                              </button>
                            </div>
                            <div className="flex flex-col gap-1 flex-grow basis-0 w-full">
                              <div className="w-full flex flex-row items-center gap-1.5">
                                <span className="block text-[#344054] text-sm font-semibold leading-5 whitespace-nowrap text-ellipsis overflow-hidden tracking-[-0.16px] max-w-[400px]">
                                  Fireflies AI Platform Quick Overview
                                </span>
                              </div>
                              <div className="w-full flex flex-row items-center gap-1.5">
                                <span className="block text-[#98a2b3] text-xs leading-5 whitespace-nowrap tracking-[-0.16px]">
                                  Thu, Aug 8 2024, 3:52 PM
                                </span>
                              </div>
                            </div>
                          </div>
                        </a>
                      ) : (
                        /* Dynamic database meetings list */
                        meetings.slice(0, 1).map((m) => (
                          <div
                            key={m.id}
                            onClick={() => (window.location.href = `/meetings/${m.id}`)}
                            className="w-full h-auto block text-[#2e90fa] focus:outline-none cursor-pointer"
                          >
                            <div className="w-full h-auto flex flex-row items-center gap-4 pt-3 px-4 pb-3 rounded-lg hover:bg-[#FAFAFB] border border-transparent hover:border-[#eaecf0] transition-all">
                              <div className="w-8 min-w-[32px] h-8 min-h-[32px] flex flex-row">
                                <button type="button" className="min-w-[32px] flex-basis-auto w-auto min-h-[32px] h-auto block">
                                  <div className="w-8 min-w-[32px] h-8 min-h-[32px] flex flex-row">
                                    <span className="min-w-[32px] flex-basis-auto w-auto min-h-[32px] h-auto flex justify-center items-center rounded overflow-hidden select-none">
                                      <img
                                        className="w-8 min-w-[32px] h-8 min-h-[32px] rounded object-cover"
                                        src="https://lh3.googleusercontent.com/a/ACg8ocKeIiXUzkKvoDXeE2UoyDLT2VhJ8_Ygs4QDM44D6S53Eg=s96-c"
                                        alt="Fred Fireflies profile photo"
                                      />
                                    </span>
                                  </div>
                                </button>
                              </div>
                              <div className="flex flex-col gap-1 flex-grow basis-0 w-full">
                                <div className="w-full flex flex-row items-center gap-1.5">
                                  <span className="block text-[#344054] text-sm font-semibold leading-5 whitespace-nowrap text-ellipsis overflow-hidden tracking-[-0.16px] max-w-[400px]">
                                    {m.title}
                                  </span>
                                </div>
                                <div className="w-full flex flex-row items-center gap-1.5">
                                  <span className="block text-[#98a2b3] text-xs leading-5 whitespace-nowrap tracking-[-0.16px]">
                                    {formatDateTime(m.meeting_date)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      )}

                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Try More Row */}
          <div className="w-full h-auto flex flex-col gap-2 pb-20">
            <div className="w-full h-auto flex flex-col justify-center gap-1 pt-2 pb-2">
              <span className="block text-[#101828] font-sans text-lg font-medium leading-7 tracking-[-0.32px] h-auto">
                Try More
              </span>
            </div>

            {/* Desktop & Mobile App boxes */}
            <div className="w-full h-auto grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Desktop App */}
              <div className="w-full h-auto min-h-[188px] flex flex-col justify-center gap-4 flex-grow basis-0 bg-[#f9fafb] rounded-lg pt-4 pr-4 pb-4 pl-4 border border-[#eaecf0] hover:border-[#d0d5dd] transition-colors">
                <svg width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-indigo-500">
                  <path d="M16.6665 2.5H3.33317C2.4127 2.5 1.6665 3.24619 1.6665 4.16667V12.5C1.6665 13.4205 2.4127 14.1667 3.33317 14.1667H16.6665C17.587 14.1667 18.3332 13.4205 18.3332 12.5V4.16667C18.3332 3.24619 17.587 2.5 16.6665 2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M6.6665 17.5H13.3332" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M10 14.1667V17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>

                <div className="w-full flex flex-col gap-4">
                  <div className="w-full flex flex-col gap-1">
                    <span className="block text-[#344054] font-sans text-sm font-semibold tracking-[-0.16px] h-5 min-h-[20px]">
                      Desktop App
                    </span>
                    <span className="block text-[#667085] font-sans text-xs tracking-[-0.16px] h-10 min-h-[40px] leading-5">
                      Capture conversations without any bot present in your meeting.
                    </span>
                  </div>

                  <div className="w-full h-9 min-h-[36px] flex">
                    <button
                      type="button"
                      disabled
                      className="cursor-not-allowed flex flex-row justify-center items-center gap-2 self-stretch bg-[#6938ef] text-white border-[0.8px] border-solid border-[#f2f4f7] rounded font-['DM_Sans',sans-serif] font-medium text-xs leading-[14px] text-center whitespace-nowrap text-ellipsis overflow-hidden tracking-[-0.16px] py-2 px-3 w-[122px] min-w-[122px] h-9 min-h-9 transition-colors opacity-80"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                        <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" stroke-width="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M7 10L12 15L17 10" stroke="currentColor" stroke-width="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M12 15V3" stroke="currentColor" stroke-width="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg>
                      Download
                    </button>
                  </div>
                </div>
              </div>

              {/* Mobile App */}
              <div className="w-full h-auto min-h-[188px] flex flex-col justify-center gap-4 flex-grow basis-0 bg-[#f9fafb] rounded-lg pt-4 pr-4 pb-4 pl-4 border border-[#eaecf0] hover:border-[#d0d5dd] transition-colors">
                <svg width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-pink-500">
                  <path d="M14.1665 1.66669H5.83317C4.9127 1.66669 4.1665 2.41288 4.1665 3.33335V16.6667C4.1665 17.5872 4.9127 18.3334 5.83317 18.3334H14.1665C15.087 18.3334 15.8332 17.5872 15.8332 16.6667V3.33335C15.8332 2.41288 15.087 1.66669 14.1665 1.66669Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M9.5 15H10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>

                <div className="w-full flex flex-col gap-4">
                  <div className="w-full flex flex-col gap-1">
                    <span className="block text-[#344054] font-sans text-sm font-semibold tracking-[-0.16px] h-5 min-h-[20px]">
                      Mobile App
                    </span>
                    <span className="block text-[#667085] font-sans text-xs tracking-[-0.16px] h-10 min-h-[40px] leading-5">
                      Record in-person conversations and review meetings on the go.
                    </span>
                  </div>

                  <div className="w-full h-9 min-h-[36px] flex flex-row gap-2">
                    
                    {/* App Store (iOS) */}
                    <a
                      href="https://apps.apple.com/us/app/fireflies-ai-notetaker/id6463164203"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-row justify-center items-center gap-1 bg-white hover:bg-gray-50 text-[#475467] border border-solid border-[#eaecf0] rounded shadow-[0_2px_2px_0_rgba(16,24,40,0.04)] py-2 px-2 w-[38px] min-w-[38px] h-9 min-h-9 transition-colors"
                      aria-label="Get Fireflies iOS app"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                        <path d="M16.95 3H7.05C4.813 3 3 4.813 3 7.05V16.95C3 19.1865 4.813 21 7.05 21H16.95C19.187 21 21 19.1865 21 16.95V7.05C21 4.813 19.187 3 16.95 3Z" fill="url(#paint0_linear_33831_109122)"></path>
                        <path opacity="0.05" d="M6.15039 15.4885C5.46139 15.4885 4.90039 14.9315 4.90039 14.2465C4.90039 13.5615 5.46139 13.0045 6.15039 13.0045H8.04939L10.4839 8.85003L9.77239 7.63553C9.60339 7.34653 9.55689 7.01003 9.64139 6.68703C9.72589 6.36403 9.93139 6.09303 10.2194 5.92503C10.4114 5.81303 10.6294 5.75403 10.8504 5.75403C11.2929 5.75403 11.7064 5.99103 11.9294 6.37253L11.9329 6.37853L11.9359 6.37303C12.1584 5.99153 12.5719 5.75453 13.0149 5.75453C13.2364 5.75453 13.4544 5.81403 13.6464 5.92603C14.2414 6.27503 14.4414 7.04253 14.0924 7.63703L10.9469 13.005H12.6109L12.7574 13.1525C12.8684 13.264 12.9699 13.3905 13.0689 13.5395L13.1674 13.7045C13.4119 14.16 13.4664 14.6635 13.3269 15.1315L13.2214 15.4885H6.15039Z" fill="black"></path>
                        <path opacity="0.07" d="M6.15039 15.2385C5.59889 15.2385 5.15039 14.7935 5.15039 14.2465C5.15039 13.6995 5.59889 13.2545 6.15039 13.2545H8.19239L10.7734 8.85004L9.98739 7.50904C9.85239 7.27854 9.81489 7.00904 9.88289 6.75004C9.95039 6.49154 10.1144 6.27504 10.3449 6.14054C10.4984 6.05104 10.6729 6.00354 10.8499 6.00354C11.2039 6.00354 11.5349 6.19304 11.7134 6.49804L11.9324 6.87254L12.1514 6.49854C12.3294 6.19354 12.6604 6.00404 13.0144 6.00404C13.1914 6.00404 13.3659 6.05154 13.5194 6.14104C13.9954 6.42054 14.1549 7.03454 13.8759 7.51004L10.5104 13.2545H12.5064L12.5794 13.328C12.6784 13.4275 12.7699 13.5415 12.8594 13.677L12.9519 13.832C13.1609 14.2225 13.2074 14.655 13.0869 15.06L13.0339 15.2385H6.15039Z" fill="black"></path>
                        <path d="M12.6514 13.815C12.5774 13.703 12.4954 13.598 12.4024 13.5045H10.0744L13.6609 7.38351C13.8704 7.02601 13.7504 6.56651 13.3934 6.35701C13.0354 6.14751 12.5759 6.26751 12.3674 6.62501L11.9324 7.36701L11.4974 6.62451C11.2884 6.26701 10.8289 6.14751 10.4714 6.35651C10.1139 6.56551 9.99389 7.02501 10.2034 7.38251L11.0634 8.85001L8.33589 13.5045H6.15039C5.73589 13.5045 5.40039 13.837 5.40039 14.2465C5.40039 14.656 5.73589 14.9885 6.15039 14.9885H12.8474C12.9444 14.662 12.9179 14.2975 12.7369 13.9595L12.6514 13.815Z" fill="white"></path>
                        <path opacity="0.05" d="M7.24982 18.0895C7.02832 18.0895 6.81032 18.03 6.61832 17.9175C6.33032 17.7485 6.12532 17.4775 6.04082 17.1545C5.95682 16.8315 6.00332 16.4945 6.17232 16.2065L6.52882 15.5975L6.74882 15.5535C6.92932 15.518 7.09782 15.5 7.26382 15.5L7.32282 15.5005C7.86332 15.5165 8.35282 15.7475 8.70582 16.1505L8.94382 16.4215L8.32932 17.4715C8.10532 17.853 7.69232 18.0895 7.24982 18.0895Z" fill="black"></path>
                        <path opacity="0.07" d="M7.24991 17.8395C7.07291 17.8395 6.89791 17.792 6.74491 17.702C6.51491 17.567 6.35041 17.35 6.28291 17.0915C6.21541 16.833 6.25241 16.5635 6.38791 16.333L6.68791 15.821L6.79791 15.799C6.96241 15.766 7.11491 15.75 7.26391 15.75L7.31991 15.7505C7.78641 15.7645 8.21141 15.965 8.5179 16.315L8.63691 16.4505L8.1134 17.345C7.93491 17.65 7.60391 17.8395 7.24991 17.8395Z" fill="black"></path>
                        <path d="M7.31257 16.0009C7.15407 15.9964 6.99857 16.0139 6.84657 16.0444L6.60307 16.4599C6.39357 16.8174 6.51357 17.2769 6.87107 17.4864C6.99007 17.5564 7.12107 17.5894 7.24957 17.5894C7.50707 17.5894 7.75807 17.4564 7.89707 17.2189L8.32957 16.4804C8.08607 16.2024 7.73457 16.0134 7.31457 16.0009H7.31257Z" fill="white"></path>
                        <path opacity="0.05" d="M16.6137 18.0895C16.1712 18.0895 15.7577 17.8525 15.5347 17.4715L12.5212 12.329L12.5127 12.303C12.3042 11.6585 12.3452 10.994 12.6197 10.4065L13.4542 8.97754L15.8142 13.005H17.8492C18.5382 13.005 19.0992 13.562 19.0992 14.247C19.0992 14.932 18.5382 15.489 17.8492 15.489H17.2697L17.6907 16.2075C17.8597 16.4955 17.9062 16.832 17.8222 17.1555C17.7382 17.479 17.5327 17.7495 17.2447 17.9185C17.0537 18.03 16.8357 18.0895 16.6137 18.0895Z" fill="black"></path>
                        <path opacity="0.07" d="M16.6139 17.8395C16.2599 17.8395 15.9289 17.6505 15.7504 17.3455L12.7504 12.2265L12.7419 12.2005C12.5614 11.6415 12.5979 11.042 12.8459 10.5125L13.4539 9.47205L15.6704 13.2545H17.8494C18.4009 13.2545 18.8494 13.6995 18.8494 14.2465C18.8494 14.7935 18.4009 15.2385 17.8494 15.2385H16.8339L17.4754 16.3335C17.6109 16.564 17.6479 16.8335 17.5804 17.092C17.5129 17.3505 17.3489 17.5675 17.1184 17.7025C16.9659 17.792 16.7914 17.8395 16.6139 17.8395Z" fill="black"></path>
                        <path d="M17.8504 13.5046H15.5289L13.4554 9.96655L13.0739 10.6181C12.8519 11.0931 12.8219 11.6301 12.9814 12.1236L15.9674 17.2191C16.1069 17.4571 16.3574 17.5896 16.6149 17.5896C16.7434 17.5896 16.8744 17.5566 16.9934 17.4866C17.3509 17.2771 17.4704 16.8176 17.2609 16.4601L16.3984 14.9886H17.8504C18.2649 14.9886 18.6004 14.6561 18.6004 14.2466C18.6004 13.8371 18.2649 13.5046 17.8504 13.5046Z" fill="white"></path>
                        <defs>
                          <linearGradient id="paint0_linear_33831_109122" x1="12" y1="2.3085" x2="12" y2="20.048" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#33BEF0"></stop>
                            <stop offset="1" stopColor="#0A85D9"></stop>
                          </linearGradient>
                        </defs>
                      </svg>
                    </a>

                    {/* Google Play Store (Android) */}
                    <a
                      href="https://play.google.com/store/apps/details?id=ai.fireflies.mobile&pcampaignid=web_share"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-row justify-center items-center gap-1 bg-white hover:bg-gray-50 text-[#475467] border border-solid border-[#eaecf0] rounded shadow-[0_2px_2px_0_rgba(16,24,40,0.04)] py-2 px-2 w-[38px] min-w-[38px] h-9 min-h-9 transition-colors"
                      aria-label="Get Fireflies Android app"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                        <path fillRule="evenodd" clipRule="evenodd" d="M3.90478 2.30394C3.67978 2.54544 3.55078 2.91744 3.55078 3.40094V20.5929C3.55078 21.0764 3.67978 21.4484 3.91328 21.6814L3.97428 21.7329L13.6073 12.0999V11.8834L3.96578 2.25244L3.90478 2.30394Z" fill="url(#paint0_linear_33831_109134)"></path>
                        <path fillRule="evenodd" clipRule="evenodd" d="M16.8107 15.3235L13.5977 12.1095V11.8845L16.8117 8.67053L16.8812 8.71353L20.6827 10.874C21.7712 11.4875 21.7712 12.4985 20.6827 13.1205L16.8812 15.281C16.8802 15.2805 16.8107 15.3235 16.8107 15.3235Z" fill="url(#paint1_linear_33831_109134)"></path>
                        <path fillRule="evenodd" clipRule="evenodd" d="M16.8808 15.2804L13.5983 11.9969L3.9043 21.6909C4.2583 22.0714 4.8543 22.1144 5.5203 21.7424L16.8808 15.2804Z" fill="url(#paint2_linear_33831_109134)"></path>
                        <path fillRule="evenodd" clipRule="evenodd" d="M16.8808 8.71455L5.5203 2.26105C4.8553 1.88055 4.2583 1.93205 3.9043 2.31255L13.5973 11.9971L16.8808 8.71455Z" fill="url(#paint3_linear_33831_109134)"></path>
                        <defs>
                          <linearGradient id="paint0_linear_33831_109134" x1="19.3463" y1="-3.39688" x2="-1.44208" y2="2.14611" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#047ED6"></stop>
                            <stop offset="1" stopColor="#50E6FF"></stop>
                          </linearGradient>
                          <linearGradient id="paint1_linear_33831_109134" x1="22.1004" y1="11.9963" x2="11.323" y2="11.9963" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#FFDA1C"></stop>
                            <stop offset="1" stopColor="#FEB705"></stop>
                          </linearGradient>
                          <linearGradient id="paint2_linear_33831_109134" x1="15.0931" y1="13.7812" x2="2.70744" y2="34.6306" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#D9414F"></stop>
                            <stop offset="1" stopColor="#8C193F"></stop>
                          </linearGradient>
                          <linearGradient id="paint3_linear_33831_109134" x1="1.46243" y1="-3.41664" x2="6.98772" y2="5.89595" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#33C481"></stop>
                            <stop offset="1" stopColor="#61E3A7"></stop>
                          </linearGradient>
                        </defs>
                      </svg>
                    </a>

                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
