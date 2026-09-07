"use client";

import {
  House,
  BriefcaseBusiness,
  TrendingUp,
  Settings,
  LogOut
} from "lucide-react";

const items = [
  { icon: House, active: true },
  { icon: BriefcaseBusiness },
  { icon: TrendingUp },
  { icon: Settings }
];

export default function Sidebar() {
  return (
    <>
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-[76px] bg-[#f4f2ec] border-r border-black/5 z-30 flex-col items-center">
        <div className="h-[72px] flex items-center justify-center">
          <div className="w-10 h-10 rounded-xl border border-[#21132d]/20 flex items-center justify-center">
            <span className="w-2 h-2 rounded-full bg-[#c98c4b]" />
          </div>
        </div>

        <nav className="flex flex-col gap-3">
          {items.map(({ icon: Icon, active }, index) => (
            <button
              key={index}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition ${
                active
                  ? "bg-[#24102f] text-white"
                  : "text-[#21132d]/40 hover:bg-black/5"
              }`}
            >
              <Icon size={18} strokeWidth={1.7} />
            </button>
          ))}
        </nav>

        <button className="mt-auto mb-6 w-10 h-10 rounded-full border border-black/10 text-xs">
          Q
        </button>
      </aside>

      {/* Mobile bottom navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 h-16 bg-[#24102f] flex items-center justify-around text-white">
        {items.map(({ icon: Icon, active }, index) => (
          <button
            key={index}
            className={`w-11 h-11 rounded-xl flex items-center justify-center ${
              active ? "bg-white/10" : "opacity-50"
            }`}
          >
            <Icon size={18} />
          </button>
        ))}
      </nav>
    </>
  );
}