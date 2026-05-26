import React from "react";
import { motion } from "framer-motion";
// Intelligence Layer: Sourcing real-time cartridge data from The Journal
import { journalStore, SLOT_METADATA, getBadgeDetails } from "../../lib/journalStore";

const noteStyles = {
  slot1: "bg-ghalia-gold/15 text-ghalia-gold border-ghalia-gold/25",
  slot2: "bg-ghalia-teal/15 text-ghalia-teal-light border-ghalia-teal/25",
  slot3: "bg-ghalia-gold-dim/15 text-ghalia-gold-light border-ghalia-gold-dim/25",
  slot4: "bg-ghalia-gold/20 text-ghalia-gold border-ghalia-gold/40 shadow-[0_0_10px_rgba(184,150,62,0.1)]",
};

// All 12×12 viewBox, gold stroke line-art preserved from original
const glyphs = {
  "Bergamot": (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="0.9">
      <circle cx="6" cy="6" r="5" />
      <line x1="6" y1="1" x2="6" y2="11" />
      <line x1="1" y1="6" x2="11" y2="6" />
      <line x1="2.5" y1="2.5" x2="9.5" y2="9.5" />
      <line x1="9.5" y1="2.5" x2="2.5" y2="9.5" />
    </svg>
  ),
  "Lemon Zest": (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="0.9">
      <path d="M6 1 Q11 4 11 9 Q8 11 3 9 Q1 6 6 1Z" />
      <path d="M6 1 Q4 5 5 9" />
      <path d="M6 1 Q8 5 7.5 9" />
    </svg>
  ),
  "Green Tea": (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="0.9">
      <path d="M6 11 Q1 7 2 2 Q7 1 10 5 Q11 9 6 11Z" />
      <line x1="6" y1="11" x2="6" y2="4" />
    </svg>
  ),
  "White Jasmine": (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="0.9">
      <circle cx="6" cy="6" r="1.2" />
      <ellipse cx="6" cy="2.2" rx="1" ry="1.8" />
      <ellipse cx="6" cy="2.2" rx="1" ry="1.8" transform="rotate(72 6 6)" />
      <ellipse cx="6" cy="2.2" rx="1" ry="1.8" transform="rotate(144 6 6)" />
      <ellipse cx="6" cy="2.2" rx="1" ry="1.8" transform="rotate(216 6 6)" />
      <ellipse cx="6" cy="2.2" rx="1" ry="1.8" transform="rotate(288 6 6)" />
    </svg>
  ),
  "Lily of Valley": (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="0.9">
      <line x1="6" y1="1" x2="6" y2="10" />
      <path d="M6 4 Q4 4 4 7 Q5 8 6 7" />
      <path d="M6 6 Q8 6 8 9 Q7 10 6 9" />
    </svg>
  ),
  "Soft Musk": (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="0.9">
      <ellipse cx="6" cy="7" rx="3" ry="2" />
      <circle cx="6" cy="3.5" r="1.5" />
      <line x1="6" y1="5" x2="6" y2="9" />
      <line x1="4" y1="9" x2="3.5" y2="11" />
      <line x1="8" y1="9" x2="8.5" y2="11" />
      <line x1="5" y1="2" x2="4" y2="1" />
      <line x1="7" y1="2" x2="8" y2="1" />
    </svg>
  ),
  "Cedarwood": (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="0.9">
      <polygon points="6,1 10,7 2,7" />
      <polygon points="6,4 10.5,10 1.5,10" />
      <line x1="6" y1="10" x2="6" y2="12" />
    </svg>
  ),
  "Oud": (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="0.9">
      <line x1="6" y1="11" x2="6" y2="4" />
      <path d="M6 4 Q4 2 6 1 Q8 2 6 3" />
      <circle cx="6" cy="4" r="0.8" fill="currentColor" />
    </svg>
  ),
  "Mango": (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="0.9">
      <path d="M6 11 Q2 8 3 4 Q5 1 8 3 Q11 5 9 8 Q8 11 6 11Z" />
      <line x1="6" y1="1" x2="6" y2="3" />
    </svg>
  ),
  "Passionfruit": (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="0.9">
      <circle cx="6" cy="6" r="4.5" />
      <circle cx="6" cy="6" r="1.5" />
      <line x1="6" y1="1.5" x2="6" y2="4.5" />
      <line x1="6" y1="7.5" x2="6" y2="10.5" />
      <line x1="1.5" y1="6" x2="4.5" y2="6" />
      <line x1="7.5" y1="6" x2="10.5" y2="6" />
    </svg>
  ),
  "Coconut": (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="0.9">
      <path d="M2 7 Q2 2 6 2 Q10 2 10 7" />
      <line x1="2" y1="7" x2="10" y2="7" />
      <line x1="6" y1="2" x2="6" y2="7" />
    </svg>
  ),
  "Frangipani": (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="0.9">
      <circle cx="6" cy="6" r="1" />
      <ellipse cx="6" cy="2.5" rx="1.2" ry="2" />
      <ellipse cx="6" cy="2.5" rx="1.2" ry="2" transform="rotate(72 6 6)" />
      <ellipse cx="6" cy="2.5" rx="1.2" ry="2" transform="rotate(144 6 6)" />
      <ellipse cx="6" cy="2.5" rx="1.2" ry="2" transform="rotate(216 6 6)" />
      <ellipse cx="6" cy="2.5" rx="1.2" ry="2" transform="rotate(288 6 6)" />
    </svg>
  ),
  "Tiare Flower": (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="0.9">
      <circle cx="6" cy="6" r="1" />
      <ellipse cx="6" cy="2" rx="0.8" ry="1.8" transform="rotate(0 6 6)" />
      <ellipse cx="6" cy="2" rx="0.8" ry="1.8" transform="rotate(45 6 6)" />
      <ellipse cx="6" cy="2" rx="0.8" ry="1.8" transform="rotate(90 6 6)" />
      <ellipse cx="6" cy="2" rx="0.8" ry="1.8" transform="rotate(135 6 6)" />
      <ellipse cx="6" cy="2" rx="0.8" ry="1.8" transform="rotate(180 6 6)" />
      <ellipse cx="6" cy="2" rx="0.8" ry="1.8" transform="rotate(225 6 6)" />
      <ellipse cx="6" cy="2" rx="0.8" ry="1.8" transform="rotate(270 6 6)" />
      <ellipse cx="6" cy="2" rx="0.8" ry="1.8" transform="rotate(315 6 6)" />
    </svg>
  ),
  "Sandalwood": (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="0.9">
      <rect x="3" y="2" width="6" height="8" rx="1" />
      <line x1="3" y1="5" x2="9" y2="5" />
      <line x1="3" y1="7.5" x2="9" y2="7.5" />
    </svg>
  ),
  "Vanilla": (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="0.9">
      <path d="M4 1 Q3 6 4 11" />
      <path d="M8 1 Q9 6 8 11" />
      <line x1="4" y1="1" x2="8" y2="1" />
      <line x1="4" y1="11" x2="8" y2="11" />
    </svg>
  ),
  "Saffron": (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="0.9">
      <line x1="6" y1="1" x2="6" y2="11" />
      <path d="M4 3 Q6 4 8 3" />
      <path d="M3 6 Q6 7 9 6" />
    </svg>
  ),
  "Cardamom": (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="0.9">
      <ellipse cx="6" cy="7" rx="3" ry="4" />
      <line x1="6" y1="3" x2="6" y2="1" />
      <line x1="4" y1="5" x2="8" y2="5" />
      <line x1="4" y1="7" x2="8" y2="7" />
      <line x1="4" y1="9" x2="8" y2="9" />
    </svg>
  ),
  "Pink Pepper": (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="0.9">
      <circle cx="6" cy="7" r="3.5" />
      <line x1="6" y1="3.5" x2="6" y2="1" />
      <line x1="4.5" y1="2" x2="7.5" y2="2" />
    </svg>
  ),
  "Rose Absolute": (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="0.9">
      <circle cx="6" cy="5.5" r="2" />
      <path d="M6 3.5 Q4 1.5 3 3 Q3 5.5 6 5.5" />
      <path d="M6 3.5 Q8 1.5 9 3 Q9 5.5 6 5.5" />
      <path d="M4 5.5 Q2.5 7 3.5 8.5 Q5 9.5 6 7.5" />
      <path d="M8 5.5 Q9.5 7 8.5 8.5 Q7 9.5 6 7.5" />
      <line x1="6" y1="9.5" x2="6" y2="12" />
    </svg>
  ),
  "Amber": (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="0.9">
      <polygon points="6,1 10,5 8,11 4,11 2,5" />
      <line x1="2" y1="5" x2="10" y2="5" />
      <line x1="6" y1="1" x2="4" y2="5" />
      <line x1="6" y1="1" x2="8" y2="5" />
    </svg>
  ),
  "Benzoin": (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="0.9">
      <path d="M6 1 Q10 5 10 8 Q10 11 6 11 Q2 11 2 8 Q2 5 6 1Z" />
      <path d="M6 4 Q8 6 8 8" />
    </svg>
  ),
  "Musk": (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="0.9">
      <circle cx="6" cy="8" r="1" />
      <path d="M6 7 Q4 4 3 2" />
      <path d="M6 7 Q8 4 9 2" />
      <path d="M3 2 Q2 1 1 2" />
      <path d="M9 2 Q10 1 11 2" />
      <path d="M3 4 Q2.5 3 2 3.5" />
      <path d="M9 4 Q9.5 3 10 3.5" />
    </svg>
  ),
  "Eucalyptus": (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="0.9">
      <path d="M6 11 Q1 8 2 3 Q4 1 8 3 Q11 6 6 11Z" />
      <line x1="6" y1="11" x2="5" y2="4" />
      <path d="M5 6 Q4 5 3 5.5" />
      <path d="M5 8 Q4 7 3 7.5" />
    </svg>
  ),
  "Peppermint": (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="0.9">
      <line x1="6" y1="11" x2="6" y2="1" />
      <ellipse cx="4" cy="4" rx="2" ry="1.2" transform="rotate(-20 4 4)" />
      <ellipse cx="8" cy="6" rx="2" ry="1.2" transform="rotate(20 8 6)" />
      <ellipse cx="4" cy="8.5" rx="2" ry="1.2" transform="rotate(-20 4 8.5)" />
    </svg>
  ),
  "Frost Accord": (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="0.9">
      <line x1="6" y1="1" x2="6" y2="11" />
      <line x1="1" y1="6" x2="11" y2="6" />
      <line x1="2.5" y1="2.5" x2="9.5" y2="9.5" />
      <line x1="9.5" y1="2.5" x2="2.5" y2="9.5" />
      <line x1="6" y1="3" x2="5" y2="2" />
      <line x1="6" y1="3" x2="7" y2="2" />
      <line x1="6" y1="9" x2="5" y2="10" />
      <line x1="6" y1="9" x2="7" y2="10" />
    </svg>
  ),
  "Ice Lily": (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="0.9">
      <line x1="6" y1="11" x2="6" y2="5" />
      <path d="M6 5 Q4 3 3 1" />
      <path d="M6 5 Q8 3 9 1" />
      <path d="M6 5 Q5 2 6 1" />
      <path d="M3 1 Q2 3 4 4" />
      <path d="M9 1 Q10 3 8 4" />
    </svg>
  ),
  "Cool Iris": (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="0.9">
      <line x1="6" y1="12" x2="6" y2="6" />
      <path d="M6 6 Q3 4 2 2 Q5 2 6 5" />
      <path d="M6 6 Q9 4 10 2 Q7 2 6 5" />
      <path d="M6 6 Q5 3 6 1 Q7 3 6 6" />
    </svg>
  ),
  "White Cedar": (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="0.9">
      <polygon points="6,1 10,5.5 2,5.5" />
      <polygon points="6,4 11,10 1,10" />
      <line x1="6" y1="10" x2="6" y2="12" />
    </svg>
  ),
  "Clean Musk": (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="0.9">
      <path d="M1 5 Q3 2 6 5 Q9 8 11 5" />
      <path d="M1 7.5 Q3 4.5 6 7.5 Q9 10.5 11 7.5" />
    </svg>
  ),
};

const defaultGlyph = (
  <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="0.9">
    <circle cx="6" cy="6" r="4" />
    <circle cx="6" cy="6" r="1.5" />
  </svg>
);

/**
 * ScentProfile Component
 * Bridges classical perfumery identities with functional experiential language.
 */
export default function ScentProfile({ activeZone = "lobby" }) {
  // Pull live configuration from the Journal Store [cite: 455]
  const zoneConfig = journalStore.data[activeZone];

  return (
    <div className="space-y-8">
      <h2 className="text-[10px] uppercase tracking-[0.25em] text-ghalia-gold opacity-100 font-body">
        Live Scent Composition
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-12">
        {Object.keys(SLOT_METADATA).map((slotKey) => {
          const meta = SLOT_METADATA[slotKey];
          const oilName = zoneConfig[slotKey];
          const badge = getBadgeDetails(oilName);
          
          // Logic: Extract specific note for glyph lookup if it's an official Ghalia oil [cite: 440]
          // e.g. "Ghalia · Citrus · Bergamot" -> "Bergamot"
          const displayNote = oilName.includes(" · ") ? oilName.split(" · ").pop() : oilName;

          return (
            <motion.div 
              key={slotKey}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col gap-2"
            >
              {/* Dual-Labeling: Perfumery Identity · Experiential Function  */}
              <span className="text-[9px] uppercase tracking-[0.2em] text-ghalia-gold/60 font-body">
                {meta.perfumery} · {meta.function}
              </span>

              <div className="flex items-center gap-3">
                {/* Intelligent Badging for Official vs Custom [cite: 431, 480] */}
                {badge.badge && (
                  <span className="w-4 h-4 flex-shrink-0 rounded-sm bg-ghalia-gold text-ghalia-dark1 flex items-center justify-center text-[9px] font-bold">
                    {badge.badge}
                  </span>
                )}
                
                {/* Primary Oil Name - 100% Opacity  */}
                <span className={`text-[14px] font-body tracking-wide transition-all ${badge.badge ? 'text-white' : 'text-white/80'}`}>
                  {oilName}
                </span>

                {/* Custom/Empty Tags [cite: 480, 482] */}
                {!badge.badge && oilName !== "Name your oil" && (
                   <span className="text-[8px] uppercase tracking-widest text-white/30 border border-white/10 px-1.5 py-0.5 rounded">
                     Custom
                   </span>
                )}
              </div>

              {/* Dynamic Note Pills with persistent botanical icons */}
              <div className="flex flex-wrap gap-2 mt-1">
                <span className={`
                  inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-body border tracking-wide
                  ${noteStyles[slotKey]}
                `}>
                  <span className="opacity-70 flex-shrink-0">
                    {glyphs[displayNote] || defaultGlyph}
                  </span>
                  {displayNote}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}