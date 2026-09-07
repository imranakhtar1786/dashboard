import { Plus } from "lucide-react";

export default function Header({ user, date, stats }) {
  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-[28px] sm:text-[32px] lg:text-[36px] font-medium tracking-[-0.04em]">
          Good morning, {user}
        </h1>

        <div className="mt-1 flex flex-wrap gap-x-3 text-[10px] sm:text-[11px] font-mono tracking-[0.08em] text-[#21132d]/45">
          <span>{date}</span>
          <span>·</span>
          <span>{stats.clients} CLIENTS</span>
          <span>·</span>
          <span>{stats.bookValue}</span>
        </div>
      </div>

      <button className="self-start sm:self-auto flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#24102f] text-white text-sm hover:bg-[#351745] transition">
        <Plus size={15} />
        New Review
      </button>
    </header>
  );
}