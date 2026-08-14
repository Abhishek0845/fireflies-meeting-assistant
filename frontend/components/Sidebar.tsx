"use client";

import React from "react";

interface SidebarProps {
  activeView: "home" | "meetings";
  setActiveView: (view: "home" | "meetings") => void;
  onUploadClick?: () => void;
}

export default function Sidebar({ activeView, setActiveView, onUploadClick }: SidebarProps) {
  return (
    <div className="flex flex-col h-screen shrink-0">
      <nav 
        className="w-[65px] min-w-[65px] h-full flex flex-col bg-white text-black border-r border-[#eaecf0] overflow-hidden font-sans text-sm antialiased"
        aria-label="Sidebar"
      >
        {/* Custom Fireflies Logo Brand Component from TOON Specs */}
        <div className="flex flex-row justify-center items-center relative">
          <div className="w-16 min-w-[64px] h-12 min-h-[48px] flex flex-row justify-center items-center bg-white">
            <button 
              type="button"
              onClick={() => setActiveView("home")}
              aria-label="Home"
              className="block min-w-[24px] flex-basis-auto w-auto min-h-[24px] h-auto text-[#2e90fa] cursor-pointer"
            >
              <div className="flex flex-row transform matrix(1, 0, 0, 1, 0, 0) w-6 min-w-[24px] h-6 min-h-[24px]">
                <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "24px", height: "24px" }}>
                  <g id="Frame 1">
                    <g id="Group 887">
                      <path id="Rectangle 62" d="M11.2049 2H2V11.1374H11.2049V2Z" fill="url(#paint0_linear_1346_2397)"></path>
                      <path id="Path 79" d="M22.1082 1.99994H12.9033V11.1373H29.9993V9.83161C29.9991 7.75445 29.1677 5.76246 27.688 4.29376C26.2083 2.82506 24.2015 1.99994 22.109 1.99994H22.1082Z" fill="url(#paint1_linear_1346_2397)"></path>
                      <path id="Path 80" d="M2 13.0309V22.1683C2.00021 24.2454 2.83161 26.2375 4.31131 27.7062C5.79102 29.1749 7.79784 29.9999 9.89035 29.9999H11.2049V13.0309H2Z" fill="url(#paint2_linear_1346_2397)"></path>
                      <path id="Path 81" opacity="0.18" d="M2 2L11.2049 11.1373H2V2Z" fill="url(#paint3_linear_1346_2397)"></path>
                      <path id="Path 83" opacity="0.18" d="M2 22.1683C2.00021 24.2454 2.83161 26.2375 4.31131 27.7062C5.79102 29.1749 7.79784 29.9999 9.89035 29.9999H11.2049V13.0309L2 22.1683Z" fill="url(#paint4_linear_1346_2397)"></path>
                      <path id="Path 84" opacity="0.18" d="M22.109 1.99994C24.2015 1.99994 26.2083 2.82506 27.688 4.29376C29.1677 5.76246 29.9991 7.75445 29.9993 9.83161V11.1373H12.9033L22.109 1.99994Z" fill="url(#paint5_linear_1346_2397)"></path>
                      <path id="Rectangle 63" d="M22.1082 13.0309H12.9033V22.1683H22.1082V13.0309Z" fill="url(#paint6_linear_1346_2397)"></path>
                      <path id="Path 82" opacity="0.18" d="M12.9033 13.0309L22.1082 22.1683H12.9033V13.0309Z" fill="url(#paint7_linear_1346_2397)"></path>
                    </g>
                  </g>
                  <defs>
                    <linearGradient id="paint0_linear_1346_2397" x1="24.5151" y1="25.1175" x2="-14.1777" y2="-15.536" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#E82A73"></stop>
                      <stop offset="0.113" stopColor="#DE2D7A"></stop>
                      <stop offset="0.3" stopColor="#C5388F"></stop>
                      <stop offset="0.54" stopColor="#9B4AB0"></stop>
                      <stop offset="0.818" stopColor="#6262DE"></stop>
                      <stop offset="0.994" stopColor="#3B73FF"></stop>
                    </linearGradient>
                    <linearGradient id="paint1_linear_1346_2397" x1="31.0764" y1="18.8766" x2="17.9657" y2="-28.6351" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#E82A73"></stop>
                      <stop offset="0.113" stopColor="#DE2D7A"></stop>
                      <stop offset="0.3" stopColor="#C5388F"></stop>
                      <stop offset="0.54" stopColor="#9B4AB0"></stop>
                      <stop offset="0.818" stopColor="#6262DE"></stop>
                      <stop offset="0.994" stopColor="#3B73FF"></stop>
                    </linearGradient>
                    <linearGradient id="paint2_linear_1346_2397" x1="18.173" y1="31.1538" x2="-28.7613" y2="16.8553" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#E82A73"></stop>
                      <stop offset="0.113" stopColor="#DE2D7A"></stop>
                      <stop offset="0.3" stopColor="#C5388F"></stop>
                      <stop offset="0.54" stopColor="#9B4AB0"></stop>
                      <stop offset="0.818" stopColor="#6262DE"></stop>
                      <stop offset="0.994" stopColor="#3B73FF"></stop>
                    </linearGradient>
                    <linearGradient id="paint3_linear_1346_2397" x1="-2.50119" y1="-9.41254" x2="10.6456" y2="20.7115" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#E82A73"></stop>
                      <stop offset="0.114" stopColor="#DE286E"></stop>
                      <stop offset="0.303" stopColor="#C52361"></stop>
                      <stop offset="0.544" stopColor="#9B1A4D"></stop>
                      <stop offset="0.825" stopColor="#620F30"></stop>
                      <stop offset="0.994" stopColor="#3D081E"></stop>
                    </linearGradient>
                    <linearGradient id="paint4_linear_1346_2397" x1="-1.05602" y1="1.13563" x2="28.7183" y2="20.9153" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#E82A73"></stop>
                      <stop offset="0.114" stopColor="#DE286E"></stop>
                      <stop offset="0.303" stopColor="#C52361"></stop>
                      <stop offset="0.544" stopColor="#9B1A4D"></stop>
                      <stop offset="0.825" stopColor="#620F30"></stop>
                      <stop offset="0.994" stopColor="#3D081E"></stop>
                    </linearGradient>
                    <linearGradient id="paint5_linear_1346_2397" x1="-649.773" y1="644.839" x2="-644.671" y2="685.121" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#E82A73"></stop>
                      <stop offset="0.114" stopColor="#DE286E"></stop>
                      <stop offset="0.303" stopColor="#C52361"></stop>
                      <stop offset="0.544" stopColor="#9B1A4D"></stop>
                      <stop offset="0.825" stopColor="#620F30"></stop>
                      <stop offset="0.994" stopColor="#3D081E"></stop>
                    </linearGradient>
                    <linearGradient id="paint6_linear_1346_2397" x1="24.6487" y1="24.9917" x2="-14.044" y2="-15.6618" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#FF3C82"></stop>
                      <stop offset="0.103" stopColor="#F53E88"></stop>
                      <stop offset="0.274" stopColor="#DC4598"></stop>
                      <stop offset="0.492" stopColor="#B251B2"></stop>
                      <stop offset="0.745" stopColor="#7961D7"></stop>
                      <stop offset="0.994" stopColor="#3B73FF"></stop>
                    </linearGradient>
                    <linearGradient id="paint7_linear_1346_2397" x1="8.40213" y1="1.61838" x2="21.5489" y2="31.7424" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#E82A73"></stop>
                      <stop offset="0.114" stopColor="#DE286E"></stop>
                      <stop offset="0.303" stopColor="#C52361"></stop>
                      <stop offset="0.544" stroke="currentColor" stopColor="#9B1A4D"></stop>
                      <stop offset="0.825" stopColor="#620F30"></stop>
                      <stop offset="0.994" stopColor="#3D081E"></stop>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </button>
          </div>
        </div>
        {/* Scrollable menu area */}
        <div className="w-16 min-w-[64px] flex-1 block relative rounded overflow-hidden">
          <div className="w-16 min-w-[64px] h-full block overflow-y-auto scrollbar-none rounded">
            <div className="table min-w-full">
              
              {/* Section 1: Main actions */}
              <section className="w-16 min-w-[64px] h-[221px] min-h-[221px] flex flex-col gap-3 pt-4 pr-3 pb-2 pl-3 border-b border-[#f2f4f7]">
                <div className="w-10 min-w-[40px] h-[196px] min-h-[196px] flex flex-col gap-2">
                  <ul className="w-10 min-w-[40px] h-[196px] min-h-[196px] flex flex-col gap-1">
                    
                    {/* Home Link */}
                    <li className="list-item font-sans">
                      <button 
                        type="button" 
                        onClick={() => setActiveView("home")}
                        className={`w-[41px] min-w-[41px] h-9 min-h-[36px] flex items-center justify-center rounded-lg transition-colors ${
                          activeView === "home" ? "bg-[#f4f3ff] text-[#5925dc]" : "text-[#667085] hover:bg-gray-50"
                        }`}
                        aria-label="Home"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ width: "20px", height: "20px" }}>
                          <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                          <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                      </button>
                    </li>

                    {/* Ask Fred */}
                    <li className="list-item font-sans">
                      <button 
                        type="button"
                        disabled
                        className="w-[41px] min-w-[41px] h-9 min-h-[36px] flex items-center justify-center rounded-lg text-[#667085] cursor-not-allowed"
                        aria-label="Ask Fred"
                      >
                        <div className="w-5 min-w-[20px] h-5 min-h-[20px] flex items-center justify-center scale-110">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
                            <path d="M14.4651 3.25014L15.1362 3.33997L14.5452 7.75153L13.8741 7.6617L14.4651 3.25014Z" fill="url(#fred-logo-_r_s_-paint0)"></path>
                            <path d="M13.9804 2.88664C13.9576 3.05706 13.9857 3.23041 14.0613 3.38475C14.1368 3.53909 14.2563 3.66751 14.4047 3.75375C14.5532 3.84 14.7238 3.8802 14.8951 3.86928C15.0664 3.85837 15.2306 3.79681 15.367 3.69241C15.5034 3.58801 15.6059 3.44545 15.6615 3.28275C15.7171 3.12004 15.7233 2.94451 15.6793 2.77834C15.6354 2.61218 15.5432 2.46283 15.4145 2.3492C15.2857 2.23557 15.1262 2.16275 14.9562 2.13994C14.728 2.10955 14.4971 2.17112 14.3142 2.31112C14.1312 2.45113 14.0112 2.65812 13.9804 2.88664Z" fill="url(#fred-logo-_r_s_-paint1)"></path>
                            <path d="M10.1121 7.63085L9.44385 7.74237L8.71624 3.35028L9.38451 3.23875L10.1121 7.63085Z" fill="url(#fred-logo-_r_s_-paint2)"></path>
                            <path d="M9.85716 2.85921C9.88529 3.02889 9.86255 3.20315 9.79183 3.35995C9.72111 3.51675 9.60558 3.64904 9.45985 3.7401C9.31412 3.83116 9.14473 3.87691 8.97311 3.87154C8.80149 3.86618 8.63534 3.80994 8.49568 3.70996C8.35603 3.60997 8.24912 3.47073 8.1885 3.30982C8.12787 3.14892 8.11625 2.97359 8.1551 2.806C8.19394 2.63842 8.28151 2.4861 8.40673 2.36832C8.53195 2.25054 8.6892 2.17259 8.85858 2.14431C8.97105 2.12549 9.08611 2.12905 9.19718 2.1548C9.30825 2.18055 9.41314 2.22797 9.50587 2.29436C9.59861 2.36075 9.67737 2.44481 9.73764 2.54173C9.79792 2.63865 9.83853 2.74654 9.85716 2.85921Z" fill="url(#fred-logo-_r_s_-paint3)"></path>
                            <path d="M11.9138 20.2921L12.0129 20.2894C18.9786 20.3133 20.6268 18.0692 20.5919 15.5198C20.5613 13.307 19.6629 11.2005 18.0943 9.66361C16.5256 8.12673 14.4153 7.28534 12.2272 7.32446L11.444 7.33906C9.86289 7.31631 9.29059 7.59344 8.29533 8.03071C7.30006 8.46798 6.39895 9.09892 5.64343 9.88751C4.88792 10.6761 4.29282 11.6069 3.89212 12.6267C3.49141 13.6465 3.29295 14.7354 3.30807 15.8311C3.34455 18.38 6.10578 20.3944 11.9138 20.2921Z" fill="url(#fred-logo-_r_s_-paint4)"></path>
                            <path d="M5.45695 16.0918C5.32944 15.8292 5.27767 15.5419 5.30685 15.2588L5.31149 15.214C5.52808 13.1196 7.20865 11.532 9.30066 11.4266C10.0046 11.3915 10.7349 11.3715 11.4926 11.3722C12.4589 11.3718 13.3852 11.4048 14.269 11.4626C16.358 11.598 18.0929 13.2169 18.395 15.3053L18.4021 15.3512C18.4394 15.6084 18.4102 15.8686 18.3168 16.11C18.3158 16.1213 18.3138 16.1325 18.3108 16.1435L18.3076 16.1612C18.0699 16.9675 16.4114 17.5779 14.3605 17.6098C13.4935 17.6237 12.5833 17.6279 11.6327 17.6179C10.8884 17.6114 10.1701 17.5974 9.47774 17.5759C8.05729 17.5346 6.80981 17.221 6.08378 16.7627C5.98342 16.7055 5.89034 16.6377 5.80648 16.5607C5.65015 16.4332 5.52992 16.2719 5.45695 16.0918Z" fill="url(#fred-logo-_r_s_-paint5)"></path>
                            <path d="M16 15C16 14.4477 15.5523 14 15 14C14.4477 14 14 14.4477 14 15" stroke="white" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M10 15C10 14.4477 9.55228 14 9 14C8.44772 14 8 14.4477 8 15" stroke="white" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round"></path>
                            <defs>
                              <linearGradient id="fred-logo-_r_s_-paint0" x1="14.8007" y1="3.29505" x2="14.2102" y2="7.70669" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#8E78FF"></stop>
                                <stop offset="0.04" stopColor="#8E78FF"></stop>
                                <stop offset="1" stopColor="#E19FFF"></stop>
                              </linearGradient>
                              <linearGradient id="fred-logo-_r_s_-paint1" x1="14.9852" y1="2.14433" x2="14.6959" y2="3.85897" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#A67EE7"></stop>
                                <stop offset="0.04" stopColor="#A87FE8"></stop>
                                <stop offset="1" stopColor="#D699FF"></stop>
                              </linearGradient>
                              <linearGradient id="fred-logo-_r_s_-paint2" x1="8.99061" y1="3.189" x2="9.72783" y2="8.11797" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#8E78FF"></stop>
                                <stop offset="0.04" stopColor="#8E78FF"></stop>
                                <stop offset="1" stopColor="#E49FFF"></stop>
                              </linearGradient>
                              <linearGradient id="fred-logo-_r_s_-paint3" x1="9.14546" y1="2.14446" x2="8.85604" y2="3.85989" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#A27BE5"></stop>
                                <stop offset="0.04" stopColor="#A27BE5"></stop>
                                <stop offset="1" stopColor="#DC9CFF"></stop>
                              </linearGradient>
                              <linearGradient id="fred-logo-_r_s_-paint4" x1="13.3085" y1="7.36566" x2="11.092" y2="20.5031" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#8E78FF"></stop>
                                <stop offset="0.04" stopColor="#8E78FF"></stop>
                                <stop offset="1" stopColor="#ECA3FF"></stop>
                              </linearGradient>
                              <linearGradient id="fred-logo-_r_s_-paint5" x1="2400.21" y1="1163.92" x2="2401.13" y2="1158.53" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#360D44"></stop>
                                <stop offset="1" stopColor="#3E2F75"></stop>
                              </linearGradient>
                            </defs>
                          </svg>
                        </div>
                      </button>
                    </li>

                    {/* Notebook (Meetings) */}
                    <li className="list-item font-sans">
                      <button 
                        type="button"
                        onClick={() => setActiveView("meetings")}
                        className={`w-[41px] min-w-[41px] h-9 min-h-[36px] flex items-center justify-center rounded-lg transition-colors ${
                          activeView === "meetings" ? "bg-[#f4f3ff] text-[#5925dc]" : "text-[#667085] hover:bg-gray-50"
                        }`}
                        aria-label="Meetings Notebook"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ width: "20px", height: "20px" }}>
                          <path d="M23 7L16 12L23 17V7Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                          <path d="M14 5H3C1.89543 5 1 5.89543 1 7V17C1 18.1046 1.89543 19 3 19H14C15.1046 19 16 18.1046 16 17V7C16 5.89543 15.1046 5 14 5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                      </button>
                    </li>

                    {/* Status */}
                    <li className="list-item font-sans">
                      <button 
                        type="button"
                        disabled
                        className="w-[41px] min-w-[41px] h-9 min-h-[36px] flex items-center justify-center rounded-lg text-[#667085] cursor-not-allowed"
                        aria-label="Status"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ width: "20px", height: "20px" }}>
                          <path d="M22 12H18L15 21L9 3L6 12H2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                      </button>
                    </li>

                    {/* Upload */}
                    <li className="list-item font-sans">
                      <button 
                        type="button"
                        onClick={onUploadClick}
                        className="w-[41px] min-w-[41px] h-9 min-h-[36px] flex items-center justify-center rounded-lg text-[#667085] hover:bg-gray-50 transition-colors"
                        aria-label="Upload"
                      >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
                          <path d="M17.5 12.5V15.8333C17.5 16.2754 17.3244 16.6993 17.0118 17.0118C16.6993 17.3244 16.2754 17.5 15.8333 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                          <path d="M14.1666 6.66667L9.99998 2.5L5.83331 6.66667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                          <path d="M10 2.5V12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                      </button>
                    </li>

                  </ul>
                </div>
              </section>

              {/* Section 2: Integrations and Analytics */}
              <section className="w-16 min-w-[64px] h-[93px] min-h-[93px] flex flex-col gap-3 pt-2 pr-3 pb-2 pl-3 border-b border-[#f2f4f7]">
                <div className="w-10 min-w-[40px] h-[76px] min-h-[76px] flex flex-col gap-2">
                  <ul className="w-10 min-w-[40px] h-[76px] min-h-[76px] flex flex-col gap-1">
                    
                    {/* Integrations */}
                    <li className="list-item font-sans">
                      <button 
                        type="button"
                        disabled
                        className="w-[41px] min-w-[41px] h-9 min-h-[36px] flex items-center justify-center rounded-lg text-[#667085] cursor-not-allowed"
                        aria-label="Integrations"
                      >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
                          <g clipPath="url(#clip0_563_9249)">
                            <path d="M13.35 10L17.9167 12.6083C18.0449 12.681 18.1516 12.7864 18.2258 12.9138C18.3 13.0411 18.3391 13.1859 18.3391 13.3333C18.3391 13.4807 18.3 13.6255 18.2258 13.7529C18.1516 13.8803 18.0449 13.9857 17.9167 14.0583L10.8333 18.1167C10.58 18.2629 10.2926 18.34 10 18.34C9.70745 18.34 9.42004 18.2629 9.16668 18.1167L2.08335 14.0583C1.9551 13.9857 1.84842 13.8803 1.77421 13.7529C1.69999 13.6255 1.66089 13.4807 1.66089 13.3333C1.66089 13.1859 1.69999 13.0411 1.77421 12.9138C1.84842 12.7864 1.9551 12.681 2.08335 12.6083L6.65001 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M10.8333 11.4501C10.58 11.5964 10.2926 11.6734 10 11.6734C9.70745 11.6734 9.42004 11.5964 9.16668 11.4501L2.08335 7.39178C1.9551 7.3191 1.84842 7.2137 1.77421 7.08633C1.69999 6.95897 1.66089 6.81419 1.66089 6.66678C1.66089 6.51937 1.69999 6.37459 1.77421 6.24723C1.84842 6.11986 1.9551 6.01446 2.08335 5.94178L9.16668 1.88345C9.42004 1.73717 9.70745 1.66016 10 1.66016C10.2926 1.66016 10.58 1.73717 10.8333 1.88345L17.9167 5.94178C18.0449 6.01446 18.1516 6.11986 18.2258 6.24723C18.3 6.37459 18.3391 6.51937 18.3391 6.66678C18.3391 6.81419 18.3 6.95897 18.2258 7.08633C18.1516 7.2137 18.0449 7.3191 17.9167 7.39178L10.8333 11.4501Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                          </g>
                          <defs>
                            <clipPath id="clip0_563_9249">
                              <rect width="20" height="20" fill="white"></rect>
                            </clipPath>
                          </defs>
                        </svg>
                      </button>
                    </li>

                    {/* Analytics */}
                    <li className="list-item font-sans">
                      <button 
                        type="button"
                        disabled
                        className="w-[41px] min-w-[41px] h-9 min-h-[36px] flex items-center justify-center rounded-lg text-[#667085] cursor-not-allowed"
                        aria-label="Analytics"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ width: "20px", height: "20px" }}>
                          <path d="M18 20V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                          <path d="M12 20V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                          <path d="M6 20V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                      </button>
                    </li>

                  </ul>
                </div>
              </section>

              {/* Section 3: AI Agents & Skills */}
              <section className="w-16 min-w-[64px] h-[93px] min-h-[93px] flex flex-col gap-3 pt-2 pr-3 pb-2 pl-3 border-b border-[#f2f4f7]">
                <div className="w-10 min-w-[40px] h-[76px] min-h-[76px] flex flex-col gap-2">
                  <ul className="w-10 min-w-[40px] h-[76px] min-h-[76px] flex flex-col gap-1">
                    
                    {/* Agents */}
                    <li className="list-item font-sans">
                      <button 
                        type="button"
                        disabled
                        className="w-[41px] min-w-[41px] h-9 min-h-[36px] flex items-center justify-center rounded-lg text-[#667085] cursor-not-allowed"
                        aria-label="AI Agents"
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
                          <path d="M12 8V4H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                          <path d="M18 8H6C4.89543 8 4 8.89543 4 10V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V10C20 8.89543 19.1046 8 18 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                          <path d="M2 14H4M20 14H22M15 13V15M9 13V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                      </button>
                    </li>

                    {/* Skills */}
                    <li className="list-item font-sans">
                      <button 
                        type="button"
                        disabled
                        className="w-[41px] min-w-[41px] h-9 min-h-[36px] flex items-center justify-center rounded-lg text-[#667085] cursor-not-allowed"
                        aria-label="AI Skills"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="20" height="20" fill="transparent" className="w-5 h-5" style={{ fill: "rgba(0, 0, 0, 0)" }}>
                          <g clipPath="url(#clip0_180_3178)">
                            <path d="M8.28086 12.9162C8.20647 12.6278 8.05615 12.3646 7.84555 12.154C7.63494 11.9434 7.37176 11.7931 7.08336 11.7187L1.97086 10.4004C1.88364 10.3756 1.80687 10.3231 1.75221 10.2508C1.69754 10.1784 1.66797 10.0902 1.66797 9.99956C1.66797 9.90889 1.69754 9.82069 1.75221 9.74835C1.80687 9.67601 1.88364 9.62348 1.97086 9.59872L7.08336 8.27956C7.37166 8.20523 7.63477 8.05503 7.84555 7.84459C8.05596 7.63414 8.20634 7.37113 8.28086 7.08289L9.5992 1.97039C9.6237 1.88282 9.67618 1.80567 9.74863 1.75072C9.82108 1.69576 9.90951 1.66602 10.0004 1.66602C10.0914 1.66602 10.1798 1.69576 10.2523 1.75072C10.3247 1.80567 10.3772 1.88282 10.4017 1.97039L11.7192 7.08289C11.7936 7.37128 11.9439 7.63447 12.1545 7.84507C12.3651 8.05567 12.6283 8.20599 12.9167 8.28039L18.0292 9.59789C18.1171 9.62214 18.1946 9.67456 18.2499 9.74712C18.3052 9.81968 18.3351 9.90836 18.3351 9.99956C18.3351 10.0908 18.3052 10.1794 18.2499 10.252C18.1946 10.3245 18.1171 10.377 18.0292 10.4012L12.9167 11.7187C12.6283 11.7931 12.3651 11.9434 12.1545 12.154C11.9439 12.3646 11.7936 12.6278 11.7192 12.9162L10.4009 18.0287C10.3764 18.1163 10.3239 18.1934 10.2514 18.2484C10.179 18.3033 10.0905 18.3331 9.99961 18.3331C9.90868 18.3331 9.82025 18.3033 9.7478 18.2484C9.67535 18.1934 9.62287 18.1163 9.59836 18.0287L8.28086 12.9162Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></path>
                          </g>
                          <defs>
                            <clipPath id="clip0_180_3178">
                              <rect width="20" height="20" fill="white"></rect>
                            </clipPath>
                          </defs>
                        </svg>
                      </button>
                    </li>

                  </ul>
                </div>
              </section>

              {/* Section 4: Members, Upgrade, Settings, More */}
              <section className="w-16 min-w-[64px] h-[172px] min-h-[172px] flex flex-col gap-3 pt-2 pr-3 pb-2 pl-3">
                <div className="w-10 min-w-[40px] h-[156px] min-h-[156px] flex flex-col gap-2">
                  <ul className="w-10 min-w-[40px] h-[156px] min-h-[156px] flex flex-col gap-1">
                    
                    {/* Team Members */}
                    <li className="list-item font-sans">
                      <button 
                        type="button"
                        disabled
                        className="w-[41px] min-w-[41px] h-9 min-h-[36px] flex items-center justify-center rounded-lg text-[#667085] cursor-not-allowed"
                        aria-label="Team Members"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ width: "20px", height: "20px" }}>
                          <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                          <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                          <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                          <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                      </button>
                    </li>

                    {/* Upgrade */}
                    <li className="list-item font-sans">
                      <button 
                        type="button"
                        disabled
                        className="w-[41px] min-w-[41px] h-9 min-h-[36px] flex items-center justify-center rounded-lg text-[#667085] cursor-not-allowed"
                        aria-label="Upgrade"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ width: "20px", height: "20px" }}>
                          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                      </button>
                    </li>

                    {/* Recording Settings */}
                    <li className="list-item font-sans">
                      <button 
                        type="button"
                        disabled
                        className="w-[41px] min-w-[41px] h-9 min-h-[36px] flex items-center justify-center rounded-lg text-[#667085] cursor-not-allowed"
                        aria-label="Recording Settings"
                      >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
                          <g clipPath="url(#clip0_153_5327)">
                            <path d="M16.1667 12.5002C16.0558 12.7515 16.0227 13.0303 16.0717 13.3007C16.1207 13.571 16.2496 13.8204 16.4417 14.0168L16.4917 14.0668C16.6467 14.2216 16.7696 14.4054 16.8535 14.6078C16.9373 14.8101 16.9805 15.027 16.9805 15.246C16.9805 15.465 16.9373 15.6819 16.8535 15.8842C16.7696 16.0866 16.6467 16.2704 16.4917 16.4252C16.3369 16.5801 16.1531 16.7031 15.9508 16.7869C15.7484 16.8708 15.5316 16.914 15.3125 16.914C15.0935 16.914 14.8766 16.8708 14.6743 16.7869C14.472 16.7031 14.2882 16.5801 14.1334 16.4252L14.0834 16.3752C13.887 16.183 13.6375 16.0542 13.3672 16.0052C13.0969 15.9561 12.8181 15.9892 12.5667 16.1002C12.3202 16.2058 12.11 16.3812 11.962 16.6048C11.8139 16.8283 11.7344 17.0903 11.7334 17.3585V17.5002C11.7334 17.9422 11.5578 18.3661 11.2452 18.6787C10.9327 18.9912 10.5087 19.1668 10.0667 19.1668C9.62468 19.1668 9.20076 18.9912 8.8882 18.6787C8.57563 18.3661 8.40004 17.9422 8.40004 17.5002V17.4252C8.39359 17.1493 8.30431 16.8818 8.1438 16.6574C7.98329 16.433 7.75899 16.2621 7.50004 16.1668C7.24869 16.0559 6.96988 16.0228 6.69955 16.0718C6.42922 16.1208 6.17977 16.2497 5.98337 16.4418L5.93337 16.4918C5.77858 16.6468 5.59477 16.7697 5.39244 16.8536C5.19011 16.9375 4.97323 16.9806 4.75421 16.9806C4.53518 16.9806 4.3183 16.9375 4.11597 16.8536C3.91364 16.7697 3.72983 16.6468 3.57504 16.4918C3.42008 16.337 3.29715 16.1532 3.21327 15.9509C3.1294 15.7486 3.08623 15.5317 3.08623 15.3127C3.08623 15.0936 3.1294 14.8768 3.21327 14.6744C3.29715 14.4721 3.42008 14.2883 3.57504 14.1335L3.62504 14.0835C3.81715 13.8871 3.94603 13.6376 3.99504 13.3673C4.04406 13.097 4.01097 12.8182 3.90004 12.5668C3.7944 12.3204 3.619 12.1101 3.39543 11.9621C3.17185 11.814 2.90986 11.7346 2.64171 11.7335H2.50004C2.05801 11.7335 1.63409 11.5579 1.32153 11.2453C1.00897 10.9328 0.833374 10.5089 0.833374 10.0668C0.833374 9.6248 1.00897 9.20088 1.32153 8.88832C1.63409 8.57576 2.05801 8.40016 2.50004 8.40016H2.57504C2.85087 8.39371 3.11838 8.30443 3.34279 8.14392C3.5672 7.98341 3.73814 7.75911 3.83337 7.50016C3.9443 7.24882 3.97739 6.97 3.92838 6.69967C3.87936 6.42934 3.75049 6.17989 3.55837 5.9835L3.50837 5.9335C3.35341 5.77871 3.23048 5.59489 3.14661 5.39256C3.06273 5.19023 3.01956 4.97335 3.01956 4.75433C3.01956 4.5353 3.06273 4.31843 3.14661 4.1161C3.23048 3.91377 3.35341 3.72995 3.50837 3.57516C3.66316 3.4202 3.84698 3.29727 4.04931 3.2134C4.25164 3.12952 4.46851 3.08635 4.68754 3.08635C4.90657 3.08635 5.12344 3.12952 5.32577 3.2134C5.5281 3.29727 5.71192 3.4202 5.86671 3.57516L5.91671 3.62516C6.11311 3.81728 6.36255 3.94615 6.63288 3.99517C6.90321 4.04418 7.18203 4.01109 7.43337 3.90016H7.50004C7.74651 3.79453 7.95672 3.61913 8.10478 3.39555C8.25285 3.17198 8.3323 2.90998 8.33337 2.64183V2.50016C8.33337 2.05814 8.50897 1.63421 8.82153 1.32165C9.13409 1.00909 9.55801 0.833496 10 0.833496C10.4421 0.833496 10.866 1.00909 11.1786 1.32165C11.4911 1.63421 11.6667 2.05814 11.6667 2.50016V2.57516C11.6678 2.84332 11.7472 3.10531 11.8953 3.32888C12.0434 3.55246 12.2536 3.72786 12.5 3.8335C12.7514 3.94443 13.0302 3.97752 13.3005 3.9285C13.5709 3.87948 13.8203 3.75061 14.0167 3.5585L14.0667 3.5085C14.2215 3.35354 14.4053 3.2306 14.6076 3.14673C14.81 3.06286 15.0268 3.01968 15.2459 3.01968C15.4649 3.01968 15.6818 3.06286 15.8841 3.14673C16.0864 3.2306 16.2702 3.35354 16.425 3.5085C16.58 3.66328 16.7029 3.8471 16.7868 4.04943C16.8707 4.25176 16.9139 4.46864 16.9139 4.68766C16.9139 4.90669 16.8707 5.12357 16.7868 5.3259C16.7029 5.52823 16.58 5.71204 16.425 5.86683L16.375 5.91683C16.1829 6.11323 16.0541 6.36268 16.005 6.633C15.956 6.90333 15.9891 7.18215 16.1 7.4335V7.50016C16.2057 7.74664 16.3811 7.95684 16.6047 8.10491C16.8282 8.25297 17.0902 8.33243 17.3584 8.3335H17.5C17.9421 8.3335 18.366 8.50909 18.6785 8.82165C18.9911 9.13421 19.1667 9.55813 19.1667 10.0002C19.1667 10.4422 18.9911 10.8661 18.6785 11.1787C18.366 11.4912 17.9421 11.6668 17.5 11.6668H17.425C17.1569 11.6679 16.8949 11.7474 16.6713 11.8954C16.4477 12.0435 16.2723 12.2537 16.1667 12.5002V12.5002Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                          </g>
                          <defs>
                            <clipPath id="clip0_153_5327">
                              <rect width="20" height="20" fill="white"></rect>
                            </clipPath>
                          </defs>
                        </svg>
                      </button>
                    </li>

                    {/* More */}
                    <li className="list-item font-sans">
                      <button 
                        type="button"
                        disabled
                        className="w-[41px] min-w-[41px] h-9 min-h-[36px] flex items-center justify-center rounded-lg text-[#667085] cursor-not-allowed"
                        aria-label="More"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ width: "20px", height: "20px" }}>
                          <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                          <path d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z" fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                          <path d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z" fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                      </button>
                    </li>

                  </ul>
                </div>
              </section>

            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
