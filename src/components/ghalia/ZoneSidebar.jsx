import React from "react";
import { motion } from "framer-motion";
import {
  DoorOpen,
  BedDouble,
  Waves,
  UtensilsCrossed,
  Palmtree,
  Sofa,
  Hotel,
} from "lucide-react";

const zones = [
  { id: "lobby", label: "Lobby", icon: DoorOpen },
  { id: "suite-corridor", label: "Suite Corridor", icon: Hotel },
  { id: "spa", label: "Spa", icon: Waves },
  { id: "restaurant", label: "Restaurant", icon: UtensilsCrossed },
  { id: "pool-deck", label: "Pool Deck", icon: Palmtree },
  { id: "bedroom", label: "Bedroom", icon: BedDouble },
  { id: "living-room", label: "Living Room", icon: Sofa },
];

export default function ZoneSidebar({ activeZone, onZoneChange }) {
  return (
    <div className="w-56 flex flex-col" style={{ background: '#2a0101', boxShadow: 'inset -1px 0 0 rgba(184,150,62,0.12)' }}>
      {/* Header */}
      <div className="px-5 pt-8 pb-5">
        <h2 className="text-[10px] uppercase tracking-[0.25em] text-ghalia-gold/100 mb-8 font-body">Venue Zones </h2>
      </div>
      {/* Zone List */}
      <nav className="flex-1 px-3 space-y-0.5">
        {zones.map((zone) => {
          const isActive = activeZone === zone.id;
          const Icon = zone.icon;
          return (
            <button
              key={zone.id}
              onClick={() => onZoneChange(zone.id)}
              className={`
                relative w-full flex items-center gap-3 px-3 py-3 rounded-md text-left transition-all duration-300
                ${isActive
                  ? "text-ghalia-gold"
                  : "text-white/80 hover:text-white/90"
                }
              `}
            >
              {isActive && (
                <motion.div
                  layoutId="activeZone"
                  className="absolute inset-0 rounded-md"
                  style={{
                    boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.55), inset 0 0 0 0.5px rgba(184,150,62,0.2), inset 0 1px 0 rgba(201,168,76,0.12), inset 0 -1px 0 rgba(0,0,0,0.4)',
                    background: 'rgba(30,0,0,0.45)',
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <Icon className={`w-4 h-4 relative z-10 ${isActive ? "text-ghalia-gold" : ""}`} />
              <span className={`text-sm font-body relative z-10 tracking-wide ${isActive ? "font-medium" : "font-light"}`}>
                {zone.label}
              </span>
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-ghalia-gold relative z-50" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Status */}
      <div className="p-6" style={{ boxShadow: 'inset 0 1px 0 rgba(184,150,62,0.1)' }}>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500" style={{ animation: 'pulse 2s ease-in-out infinite', boxShadow: '0 0 6px rgba(52,211,153,0.5)' }} />
          <span className="text-[11px] text-ghalia-gold/90 tracking-wider font-body uppercase">
            System Active
          </span>
        </div>
      </div>
    </div>
  );
}