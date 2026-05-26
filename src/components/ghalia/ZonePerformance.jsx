import React from "react";
import { motion } from "framer-motion";
import { insightData } from "../../lib/mockData"; // Sourcing from the central library

export default function ZonePerformance() {
  // We pull the specific zone list from the insightData in mockData.js
  const { zones } = insightData;

  return (
    <div
      style={{
        borderRadius: '6px',
        padding: '32px',
        background: 'rgba(20,0,0,0.55)',
        boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.6), inset 0 0 0 0.5px rgba(184,150,62,0.18)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top accent */}
      <div style={{
        position: 'absolute', top: 0, left: '20%', right: '20%', height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(184,150,62,0.9), transparent)',
      }} />

      <p className="font-body uppercase" style={{ fontSize: '12px', letterSpacing: '0.28em', color: 'rgba(255,240,220,0.8)', marginBottom: '6px' }}>
        Zone Performance
      </p>
      <h2 className="font-heading font-light" style={{ fontSize: '24px', color: '#b8963e', letterSpacing: '0.08em', marginBottom: '28px' }}>
        Diffusion Efficiency by Venue
      </h2>

      <div className="space-y-6">
        {zones.map((zone, i) => (
          <motion.div
            key={zone.label}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06, duration: 0.45, ease: "easeOut" }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
                <span className="font-heading font-light" style={{ fontSize: '20px', color: '#b8963e', letterSpacing: '0.08em' }}>
                  {zone.label}
                </span>
                <span className="font-body" style={{ fontSize: '12px', letterSpacing: '0.25em', color: 'rgba(184,150,62,0.9)', textTransform: 'uppercase' }}>
                  {zone.status}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                <span
                  className="font-heading font-light"
                  style={{
                    fontSize: '20px',
                    letterSpacing: '0.04em',
                    background: 'linear-gradient(135deg, #c9a84c, #b8963e)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {zone.efficiency}%
                </span>
              </div>
            </div>

            {/* Efficiency bar */}
            <div style={{
              height: '2px',
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '1px',
              marginBottom: '6px',
              overflow: 'hidden',
            }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${zone.efficiency}%` }}
                transition={{ delay: i * 0.06 + 0.2, duration: 0.9, ease: "easeOut" }}
                style={{
                  height: '100%',
                  borderRadius: '1px',
                  background: `linear-gradient(90deg, #7a6228 0%, #c9a84c ${Math.min(100, zone.efficiency + 10)}%, #b8963e 100%)`,
                }}
              />
            </div>

            <p className="font-body" style={{ fontSize: '10px', letterSpacing: '0.18em', color: 'rgba(194,170,10, 0.9)' }}>
              {zone.note}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}