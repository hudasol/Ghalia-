import React from "react";
import TopBar from "../components/ghalia/TopBar";
import InsightsKPIs from "../components/ghalia/InsightsKPIs";
import ScentToSpendChart from "../components/ghalia/ScentToSpendChart";
import ZonePerformance from "../components/ghalia/ZonePerformance";

export default function Insights() {
  return (
    <div className="h-screen flex flex-col overflow-hidden bg-[#380100]">
      <TopBar />
      
      <div style={{ height: '0.5px', background: '#b8963e', opacity: 0.5 }} />

      <div className="flex-1 overflow-y-auto px-10 py-10">
        {/* Page Header */}
        <div className="mb-12">
          <h2 className="text-[10px] uppercase tracking-[0.25em] text-ghalia-gold font-body">
            Ghalia Intelligence
          </h2>
          <h1 className="font-heading font-light text-4xl tracking-[0.12em] text-ghalia-gold leading-none mt-2">
            Business Impact
          </h1>
          <div className="mt-4 w-12 h-px bg-gradient-to-r from-ghalia-gold to-transparent" />
        </div>

        {/* Components pull data themselves from mockData.js */}
        <InsightsKPIs />

        <div className="mt-10">
          <ScentToSpendChart />
        </div>

        <div className="mt-10 mb-10">
          <ZonePerformance />
        </div>
      </div>
    </div>
  );
}