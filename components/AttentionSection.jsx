import { ChevronLeft, ChevronRight, TriangleAlert } from "lucide-react";
import ClientCard from "./ClientCard";

export default function AttentionSection({ data, onClientClick, onCtaClick }) {
  return (
    <section className="bg-white rounded-2xl border border-black/5 overflow-hidden">
      <div className="h-12 px-4 flex items-center justify-between border-b border-black/5">
        <div className="flex items-center gap-2">
          <TriangleAlert size={14} className="text-[#b97837]" />

          <span className="text-[10px] font-mono tracking-[0.12em]">
            CLIENTS NEEDING ATTENTION
          </span>

          <span className="w-6 h-6 rounded-full bg-[#fff1bc] flex items-center justify-center text-[10px] font-semibold">
            {data.count}
          </span>
        </div>

        <div className="flex gap-1">
          <button className="w-7 h-7 rounded-lg border border-black/10 flex items-center justify-center">
            <ChevronLeft size={14} />
          </button>

          <button className="w-7 h-7 rounded-lg border border-black/10 flex items-center justify-center">
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      <div className="p-3 overflow-x-auto">
        <div className="grid grid-flow-col auto-cols-[minmax(275px,1fr)] xl:grid-flow-col xl:auto-cols-fr gap-2">
          {data.cards.map((client) => (
            <ClientCard
              key={client.name}
              client={client}
              onClick={() => onClientClick && onClientClick(client)}
              onCta={() => onCtaClick && onCtaClick(client, client.cta)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}