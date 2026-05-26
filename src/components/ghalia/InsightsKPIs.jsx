import React from "react";
import { motion } from "framer-motion";
// Importing the centralized brain of the analytics suite
import { insightData } from "../../lib/mockData";

export default function InsightsKPIs() {
  const { kpis } = insightData;

  // We map the raw mock data into the UI structure for the KPI cards
  const kpiCards = [
    {
      label: "Revenue Correlation",
      value: kpis.totalRevenueLift,
      sub: "F&B Spend",
      note: "Increased bar & restaurant revenue correlation",
    },
    {
      label: "Dwell Time Increase",
      value: kpis.avgDwellIncrease,
      sub: "vs. baseline",
      note: "Guests stay significantly longer in scented zones",
    },
    {
      label: "Operational Efficiency",
      value: kpis.cartridgeEfficiency,
      sub: "Cartridge Yield",
      note: "Top-quartile resource management score",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-5">
      {kpiCards.map((kpi, i) => (
        <motion.div
          key={kpi.label}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08, duration: 0.5, ease: "easeOut" }}
          style={{
            borderRadius: '6px',
            padding: '28px 28px 24px',
            background: 'rgba(20,0,0,0.5)',
            boxShadow: 'inset 0 2px 90px rgba(0,0,0,0.6), inset 0 0 0 0.5px rgba(184,150,62,0.18), inset 0 -1px 0 rgba(0,0,0,0.5)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* High-End Top Accent Line */}
          <div style={{
            position: 'absolute', top: 0, left: '20%', right: '20%', height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(184,150,62,0.6), transparent)',
          }} />

          {/* Label: 70% Opacity for sophisticated hierarchy */}
          <p className="font-body uppercase" style={{ fontSize: '9px', letterSpacing: '0.28em', color: 'rgba(255,240,220,0.7)', marginBottom: '16px' }}>
            {kpi.label}
          </p>

          <div style={{ marginBottom: '6px' }}>
            {/* Value: The central Data Science metric */}
            <span
              className="font-heading font-light"
              style={{
                fontSize: '46px',
                lineHeight: 1,
                letterSpacing: '0.04em',
                background: 'linear-gradient(135deg, #c9a84c 0%, #b8963e 55%, #8a6e2f 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {kpi.value}
            </span>
            {/* Subtext: High readability (100% opacity) */}
            <span
              className="font-body ml-2"
              style={{ fontSize: '14px', color: 'rgba(184,150,62, 1)', letterSpacing: '0.1em' }}
            >
              {kpi.sub}
            </span>
          </div>

          {/* Note: Descriptive context for the GM */}
          <p className="font-body" style={{ fontSize: '11px', color: 'rgba(184,150,90,0.9)', letterSpacing: '0.1em', marginTop: '10px' }}>
            {kpi.note}
          </p>
        </motion.div>
      ))}
    </div>
  );
}