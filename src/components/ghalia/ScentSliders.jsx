import React, { useRef, useCallback } from "react";
import { Flame, Wind, Zap, Layers } from "lucide-react";

const sliderConfig = [
  { id: "warmth",    label: "Warmth",    icon: Flame  },
  { id: "freshness", label: "Freshness", icon: Wind   },
  { id: "intensity", label: "Intensity", icon: Zap    },
  { id: "depth",     label: "Depth",     icon: Layers },
];

function EtchedSlider({ value, onChange }) {
  const trackRef = useRef(null);
  const dragging = useRef(false);

  const getValueFromEvent = useCallback((e) => {
    const track = trackRef.current;
    if (!track) return value;
    const rect = track.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    return Math.round(ratio * 100);
  }, [value]);

  const handlePointerDown = (e) => {
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    onChange(getValueFromEvent(e));
  };

  const handlePointerMove = (e) => {
    if (!dragging.current) return;
    onChange(getValueFromEvent(e));
  };

  const handlePointerUp = () => {
    dragging.current = false;
  };

  const pct = `${value}%`;

  return (
    <div
      ref={trackRef}
      className="relative flex items-center"
      style={{ height: '24px', cursor: 'ew-resize', userSelect: 'none', touchAction: 'none' }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      {/* Track background — dark desaturated */}
      <div
        className="absolute inset-x-0"
        style={{
          top: '50%', transform: 'translateY(-50%)',
          height: '2px',
          background: '#1a0101',
          boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.6)',
          borderRadius: '1px',
        }}
      />

      {/* Active fill — brushed gold */}
      <div
        className="absolute"
        style={{
          left: 0,
          width: pct,
          top: '50%', transform: 'translateY(-50%)',
          height: '2px',
          background: 'linear-gradient(90deg, #7a6228 0%, #c9a84c 60%, #b8963e 100%)',
          borderRadius: '1px',
          transition: 'width 0.08s linear',
        }}
      />

      {/* Etched handle — vertical gold line */}
      <div
        className="absolute"
        style={{
          left: pct,
          transform: 'translateX(-50%)',
          top: '50%',
          marginTop: '-10px',
          width: '2px',
          height: '20px',
          background: 'linear-gradient(180deg, #c9a84c 0%, #b8963e 50%, #8a6e2f 100%)',
          boxShadow: '0 0 6px rgba(184,150,62,0.45)',
          borderRadius: '1px',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}


// Helper to calculate dynamic biometric impact based on slider percentage.
const getBiometricScore = (id, value) => {
  if (id === 'intensity') return `-${Math.round(value * 0.14)}% Cortisol`;
  if (id === 'freshness') return `+${Math.round(value * 0.18)}% Alertness`;
  if (id === 'warmth') return `+${Math.round(value * 0.12)}% Oxytocin`;
  if (id === 'depth') return `+${Math.round(value * 0.15)}% Sleep Readiness`;
  return '';
};


export default function ScentSliders({ values, onChange }) {
  return (
    <div>
      <h2 className="text-[10px] uppercase tracking-[0.25em] text-ghalia-gold/100 mb-8 font-body">Scent Parameters
</h2>
      
      <div className="space-y-7">
        {sliderConfig.map((slider) => {
          const Icon = slider.icon;
          const value = values[slider.id] || 0;
          return (
            <div key={slider.id}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Icon className="w-3.5 h-3.5 text-ghalia-gold/40" />
                  <span className="text-xs font-body text-white/85 tracking-wide">
                    {slider.label}
                  </span>
                </div>
                <span
                  className="text-xs font-body font-medium tabular-nums w-10 text-right"
                  style={{
                    background: 'linear-gradient(135deg, #c9a84c, #b8963e, #8a6e2f)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {value}%
                </span>
              </div>
              <EtchedSlider value={value} onChange={(v) => onChange(slider.id, v)} />
            </div>
          );
        })}
      </div>
    </div>
  );
}