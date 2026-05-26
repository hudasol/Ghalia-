import React from "react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";

// Updated data to reflect the correlation research
const data = [
  { hour: "06:00", spend: 210 },
  { hour: "08:00", spend: 245 },
  { hour: "10:00", spend: 310 },
  { hour: "12:00", spend: 480 },
  { hour: "14:00", spend: 520 },
  { hour: "16:00", spend: 595 },
  { hour: "18:00", spend: 710 }, // Arabic Oud Activation Start
  { hour: "20:00", spend: 890 }, // Peak Spend Correlation
  { hour: "22:00", spend: 760 }, // Arabic Oud Activation End
  { hour: "00:00", spend: 520 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: 'rgba(20,0,0,0.92)',
      border: '0.5px solid rgba(184,150,62,0.3)',
      borderRadius: '3px',
      padding: '10px 14px',
    }}>
      <p className="font-body" style={{ fontSize: '12px', letterSpacing: '0.25em', color: 'rgba(184,150,62,1)', marginBottom: '4px' }}>{label}</p>
      <p className="font-heading" style={{ fontSize: '25px', color: '#c9a84c', letterSpacing: '0.05em' }}>
        AED {payload[0].value}
      </p>
    </div>
  );
};

export default function ScentToSpendChart() {
  return (
    <div
      style={{
        borderRadius: '6px',
        padding: '32px 32px 24px',
        background: 'rgba(20,0,0,0.55)',
        boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.6), inset 0 0 0 0.5px rgba(184,150,62,0.18)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top accent */}
      <div style={{
        position: 'absolute', top: 0, left: '20%', right: '20%', height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(184,150,62,0.35), transparent)',
      }} />

      {/* Header */}
      <div style={{ marginBottom: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <p className="font-body uppercase" style={{ fontSize: '14px', letterSpacing: '0.28em', color: 'rgba(255,240,220,0.7)', marginBottom: '6px' }}>
            Scent-to-Spend Correlation
          </p>
          <h2 className="font-heading font-light" style={{ fontSize: '26px', color: '#b8963e', letterSpacing: '0.08em' }}>
            Lobby Bar Revenue vs. Arabic Oud Diffusion
          </h2>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '20px', height: '1px', background: 'linear-gradient(90deg, #c9a84c, #8a6e2f)' }} />
            <span className="font-body" style={{ fontSize: '11px', letterSpacing: '0.25em', color: 'rgba(184,150,62,1)' }}>F&B SPEND (AED)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
            <div style={{ width: '20px', height: '1px', background: 'rgba(184,150,62,0.3)', borderTop: '1px dashed rgba(184,150,62,0.4)' }} />
            <span className="font-body" style={{ fontSize: '11px', letterSpacing: '0.25em', color: 'rgba(184,150,62,1)' }}>OUD ACTIVE</span>
          </div>
        </div>
      </div>

      <div style={{ height: '220px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="goldMist" x1="0" y1="0" x2="0" y2="1">
                <stop offset="40%" stopColor="#c9a84c" stopOpacity={0.22} />
                <stop offset="60%" stopColor="#b8963e" stopOpacity={0.09} />
                <stop offset="100%" stopColor="#8a6e2f" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="transparent" />
            <XAxis
              dataKey="hour"
              tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 10, fontFamily: 'var(--font-body)', letterSpacing: '0.15em' }}
              axisLine={{ stroke: 'rgba(184,150,62,0.12)' }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 10, fontFamily: 'var(--font-body)' }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(184,150,62,0.5)', strokeWidth: 1 }} />
            <Area
              type="monotone"
              dataKey="spend"
              stroke="#c9a84c"
              strokeWidth={1.5}
              fill="url(#goldMist)"
              dot={false}
              activeDot={{ r: 3, fill: '#c9a84c', stroke: 'rgba(184,150,62,0.4)', strokeWidth: 10 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Oud annotation */}
      <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#c9a84c', boxShadow: '0 0 6px rgba(184,150,62,0.9)' }} />
        <p className="font-body" style={{ fontSize: '12.5px', letterSpacing: '0.2em', color: 'rgba(194,160,12, 0.9)' }}>
          Arabic Oud diffusion active <span style={{ color: 'rgba(194,160,12, 1)' }}>18:00 – 22:00</span> · Peak spend correlation of <span style={{ color: 'rgba(184,150,62,1)' }}>+34%</span>
        </p>
      </div>
    </div>
  );
}