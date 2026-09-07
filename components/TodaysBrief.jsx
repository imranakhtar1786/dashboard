import { ArrowUpRight } from "lucide-react";

export default function TodaysBrief({ data }) {
  return (
    <div className="rounded-2xl p-5 sm:p-6 min-h-[230px] bg-gradient-to-br from-[#24102f] via-[#32134a] to-[#1c1870] text-white flex flex-col justify-between">
      <div>
        <div className="text-[9px] font-mono tracking-[0.15em] text-white/40">
          {data.label}
        </div>

        <p className="mt-5 text-[19px] sm:text-[20px] leading-[1.3] tracking-[-0.02em]">
          {data.text}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mt-6">
        {data.actions.map((action, index) => (
          <button
            key={action}
            className="px-3 py-2 rounded-full border border-white/15 bg-white/5 text-[11px] flex items-center gap-2 hover:bg-white/10"
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                index === 0
                  ? "bg-red-400"
                  : index === 1
                  ? "bg-yellow-400"
                  : "bg-blue-400"
              }`}
            />

            {action}

            {index === 1 && <ArrowUpRight size={12} />}
          </button>
        ))}
      </div>
    </div>
  );
}