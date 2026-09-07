"use client";

import { useEffect, useState } from "react";

import Sidebar from "./Sidebar";
import Header from "./Header";
import TodaysBrief from "./TodaysBrief";
import AttentionSection from "./AttentionSection";
import Heartbeat from "./Heartbeat";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);

  useEffect(() => {
    fetch("/api/dashboard")
      .then((res) => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  if (!data) {
    return (
      <main className="min-h-screen bg-[#f4f2ec] flex items-center justify-center">
        <div className="text-sm text-[#21132d]">Loading dashboard...</div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f2ec] text-[#21132d] mb-20 sm:mb-0">
      <Sidebar />

      <main className="lg:ml-[76px] px-4 sm:px-6 lg:px-8 xl:px-10 py-5 lg:py-7">
        <div className="max-w-[1500px] mx-auto">
          <Header
            user={data.user}
            date={data.date}
            stats={data.stats}
          />

          <section className="mt-6 grid grid-cols-1 xl:grid-cols-[332px_minmax(0,1fr)] gap-4">
            <TodaysBrief data={data.todaysBrief} />

            <AttentionSection
              data={data.clientsNeedingAttention}
              onClientClick={(client) => setSelectedClient(client)}
              onCtaClick={(client, cta) =>
                console.log("CTA clicked:", client.name, cta)
              }
            />
          </section>

          <Heartbeat
            data={data.rmHeartbeat}
            graphSource={data}
            onNodeClick={(node) => setSelectedClient(node)}
            selectedClient={selectedClient}
          />
        </div>
      </main>

      {selectedClient && (
        <div className="fixed right-6 top-6 z-50">
          <div className="bg-white border border-black/10 rounded-lg px-4 py-3 shadow-md">
            <div className="text-sm font-semibold">Selected</div>
            <div className="text-[13px] mt-1">{selectedClient.name}</div>
            <button
              onClick={() => setSelectedClient(null)}
              className="mt-2 text-xs text-[#24102f] underline"
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
}