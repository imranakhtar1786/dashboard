"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { Search, SlidersHorizontal, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";

const NetworkGraph = dynamic(
  () => import("./NetworkGraph"),
  {
    ssr: false
  }
);

export default function Heartbeat({ data, graphSource, onNodeClick, selectedClient }) {
  const graphControlRef = useRef(null);
  return (
    <section className="mt-4 rounded-2xl overflow-hidden bg-[#24102f] text-white">
      {/* Header */}
      <div className="px-5 py-5 border-b border-white/10">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm">⌁</span>

              <span className="text-[11px] font-mono tracking-[0.12em]">
                {data.label}
              </span>

              <span className="px-2 py-1 rounded-md bg-white/10 text-[8px] font-mono">
                {data.badge}
              </span>
            </div>

            <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[10px] font-mono text-white/50">
              <span>{data.clients} CLIENTS</span>
              <span>·</span>
              <span>{data.holdings} HOLDINGS</span>
              <span>·</span>
              <span className="text-yellow-400">
                {data.flagged} FLAGGED
              </span>
            </div>
          </div>

          <div className="lg:text-right">
            <div className="text-2xl sm:text-3xl font-medium">
              {data.totalAum}
            </div>

            <div className="mt-1 text-[9px] font-mono text-emerald-400">
              ↗ {data.aumChange}
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="px-4 py-3 flex flex-col lg:flex-row gap-3 justify-between border-b border-white/10">
        <div className="flex gap-1 p-1 rounded-xl bg-white/5 overflow-x-auto">
          {data.filters.map((filter, index) => (
            <button
              key={filter}
              className={`px-3 py-1.5 rounded-lg text-[10px] whitespace-nowrap ${
                index === 0
                  ? "bg-white text-[#24102f]"
                  : "text-white/60 hover:bg-white/5"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <div className="hidden sm:flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2 min-w-[190px]">
            <Search size={13} className="text-white/40" />
            <span className="text-[10px] text-white/35">
              Search ticker or client
            </span>
          </div>

          <button className="px-3 rounded-lg bg-white/5 text-white/60">
            <SlidersHorizontal size={13} />
          </button>

          <button
            onClick={() => graphControlRef.current?.zoomIn()}
            className="px-3 rounded-lg bg-white/5 text-white/60"
            title="Zoom in"
          >
            <ZoomIn size={13} />
          </button>

          <button
            onClick={() => graphControlRef.current?.zoomOut()}
            className="px-3 rounded-lg bg-white/5 text-white/60"
            title="Zoom out"
          >
            <ZoomOut size={13} />
          </button>

          <button
            onClick={() => graphControlRef.current?.refresh()}
            className="px-3 rounded-lg bg-white/5 text-white/60"
            title="Refresh layout"
          >
            <RotateCcw size={13} />
          </button>
        </div>
      </div>

      <NetworkGraph
        graphSource={graphSource}
        onNodeClick={(n) =>
          onNodeClick &&
          onNodeClick(n && n.name ? { name: n.name, id: n.id } : n)
        }
        selectedClient={selectedClient}
        controlRef={graphControlRef}
      />
    </section>
  );
}