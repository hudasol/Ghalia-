import React from "react";
import { motion } from "framer-motion";

const profiles = {
  "morning-calm": {
    top: ["Bergamot", "Lemon Zest", "Green Tea"],
    heart: ["White Jasmine", "Lily of Valley"],
    base: ["Soft Musk", "Cedarwood"],
  },
  tropical: {
    top: ["Mango", "Passionfruit", "Coconut"],
    heart: ["Frangipani", "Tiare Flower"],
    base: ["Sandalwood", "Vanilla"],
  },
  "oriental-dusk": {
    top: ["Saffron", "Cardamom", "Pink Pepper"],
    heart: ["Rose Absolute", "Oud"],
    base: ["Amber", "Benzoin", "Musk"],
  },
  "arctic-crisp": {
    top: ["Eucalyptus", "Peppermint", "Frost Accord"],
    heart: ["Ice Lily", "Cool Iris", "Lavender"],
    base: ["White Cedar", "Clean Musk"],
  },
};

const noteStyles = {
  top: "bg-ghalia-gold/15 text-ghalia-gold border-ghalia-gold/25",
  heart: "bg-ghalia-teal/15 text-ghalia-teal-light border-ghalia-teal/25",
  base: "bg-ghalia-gold-dim/15 text-ghalia-gold-light border-ghalia-gold-dim/25",
};

const noteLabels = {
  top: "Top Notes",
  heart: "Heart Notes",
  base: "Base Notes",
};

// Tiny SVG glyphs — all 12×12 viewBox, gold stroke line-art
const glyphs = {
  // Citrus slice
  "Bergamot": (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="0.9">
      <circle cx="6" cy="6" r="5" />
      <line x1="6" y1="1" x2="6" y2="11" />
      <line x1="1" y1="6" x2="11" y2="6" />
      <line x1="2.5" y1="2.5" x2="9.5" y2="9.5" />
      <line x1="9.5" y1="2.5" x2="2.5" y2="9.5" />
    </svg>
  ),
  // Lemon wedge
  "Lemon Zest": (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="0.9">
      <path d="M6 1 Q11 4 11 9 Q8 11 3 9 Q1 6 6 1Z" />
      <path d="M6 1 Q4 5 5 9" />
      <path d="M6 1 Q8 5 7.5 9" />
    </svg>
  ),
  // Leaf
  "Green Tea": (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="0.9">
      <path d="M6 11 Q1 7 2 2 Q7 1 10 5 Q11 9 6 11Z" />
      <line x1="6" y1="11" x2="6" y2="4" />
    </svg>
  ),
  // Five-petal flower
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
  // Bell flower cluster
  "Lily of Valley": (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="0.9">
      <line x1="6" y1="1" x2="6" y2="10" />
      <path d="M6 4 Q4 4 4 7 Q5 8 6 7" />
      <path d="M6 6 Q8 6 8 9 Q7 10 6 9" />
    </svg>
  ),
  // Deer silhouette simplified
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
  // Pine/cedar tree outline
  "Cedarwood": (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="0.9">
      <polygon points="6,1 10,7 2,7" />
      <polygon points="6,4 10.5,10 1.5,10" />
      <line x1="6" y1="10" x2="6" y2="12" />
    </svg>
  ),
  // Incense stick with smoke
  "Oud": (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="0.9">
      <line x1="6" y1="11" x2="6" y2="4" />
      <path d="M6 4 Q4 2 6 1 Q8 2 6 3" />
      <circle cx="6" cy="4" r="0.8" fill="currentColor" />
    </svg>
  ),
  // Tropical fruit drip
  "Mango": (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="0.9">
      <path d="M6 11 Q2 8 3 4 Q5 1 8 3 Q11 5 9 8 Q8 11 6 11Z" />
      <line x1="6" y1="1" x2="6" y2="3" />
    </svg>
  ),
  // Passionfruit — star circle
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
  // Coconut half
  "Coconut": (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="0.9">
      <path d="M2 7 Q2 2 6 2 Q10 2 10 7" />
      <line x1="2" y1="7" x2="10" y2="7" />
      <line x1="6" y1="2" x2="6" y2="7" />
    </svg>
  ),
  // Simple 5-petal
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
  // Eight-petal star
  "Tiare Flower": (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="0.9">
      <circle cx="6" cy="6" r="1" />
      <ellipse cx="6" cy="2" rx="0.8" ry="1.8" />
      <ellipse cx="6" cy="2" rx="0.8" ry="1.8" transform="rotate(45 6 6)" />
      <ellipse cx="6" cy="2" rx="0.8" ry="1.8" transform="rotate(90 6 6)" />
      <ellipse cx="6" cy="2" rx="0.8" ry="1.8" transform="rotate(135 6 6)" />
      <ellipse cx="6" cy="2" rx="0.8" ry="1.8" transform="rotate(180 6 6)" />
      <ellipse cx="6" cy="2" rx="0.8" ry="1.8" transform="rotate(225 6 6)" />
      <ellipse cx="6" cy="2" rx="0.8" ry="1.8" transform="rotate(270 6 6)" />
      <ellipse cx="6" cy="2" rx="0.8" ry="1.8" transform="rotate(315 6 6)" />
    </svg>
  ),
  // Sandalwood grain
  "Sandalwood": (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="0.9">
      <rect x="3" y="2" width="6" height="8" rx="1" />
      <line x1="3" y1="5" x2="9" y2="5" />
      <line x1="3" y1="7.5" x2="9" y2="7.5" />
    </svg>
  ),
  // Vanilla pod
  "Vanilla": (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="0.9">
      <path d="M4 1 Q3 6 4 11" />
      <path d="M8 1 Q9 6 8 11" />
      <line x1="4" y1="1" x2="8" y2="1" />
      <line x1="4" y1="11" x2="8" y2="11" />
    </svg>
  ),
  // Saffron threads
  "Saffron": (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="0.9">
      <line x1="6" y1="1" x2="6" y2="11" />
      <path d="M4 3 Q6 4 8 3" />
      <path d="M3 6 Q6 7 9 6" />
    </svg>
  ),
  // Cardamom pod
  "Cardamom": (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="0.9">
      <ellipse cx="6" cy="7" rx="3" ry="4" />
      <line x1="6" y1="3" x2="6" y2="1" />
      <line x1="4" y1="5" x2="8" y2="5" />
      <line x1="4" y1="7" x2="8" y2="7" />
      <line x1="4" y1="9" x2="8" y2="9" />
    </svg>
  ),
  // Peppercorn
  "Pink Pepper": (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="0.9">
      <circle cx="6" cy="7" r="3.5" />
      <line x1="6" y1="3.5" x2="6" y2="1" />
      <line x1="4.5" y1="2" x2="7.5" y2="2" />
    </svg>
  ),
  // Rose
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
  // Amber gem
  "Amber": (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="0.9">
      <polygon points="6,1 10,5 8,11 4,11 2,5" />
      <line x1="2" y1="5" x2="10" y2="5" />
      <line x1="6" y1="1" x2="4" y2="5" />
      <line x1="6" y1="1" x2="8" y2="5" />
    </svg>
  ),
  // Resin drop
  "Benzoin": (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="0.9">
      <path d="M6 1 Q10 5 10 8 Q10 11 6 11 Q2 11 2 8 Q2 5 6 1Z" />
      <path d="M6 4 Q8 6 8 8" />
    </svg>
  ),
  // Musk — deer antler shape
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
  // Eucalyptus leaf
  "Eucalyptus": (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="0.9">
      <path d="M6 11 Q1 8 2 3 Q4 1 8 3 Q11 6 6 11Z" />
      <line x1="6" y1="11" x2="5" y2="4" />
      <path d="M5 6 Q4 5 3 5.5" />
      <path d="M5 8 Q4 7 3 7.5" />
    </svg>
  ),
  // Peppermint sprig
  "Peppermint": (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="0.9">
      <line x1="6" y1="11" x2="6" y2="1" />
      <ellipse cx="4" cy="4" rx="2" ry="1.2" transform="rotate(-20 4 4)" />
      <ellipse cx="8" cy="6" rx="2" ry="1.2" transform="rotate(20 8 6)" />
      <ellipse cx="4" cy="8.5" rx="2" ry="1.2" transform="rotate(-20 4 8.5)" />
    </svg>
  ),
  // Snowflake
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
  // Lily / iris
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
  // Iris bloom
  "Cool Iris": (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="0.9">
      <line x1="6" y1="12" x2="6" y2="6" />
      <path d="M6 6 Q3 4 2 2 Q5 2 6 5" />
      <path d="M6 6 Q9 4 10 2 Q7 2 6 5" />
      <path d="M6 6 Q5 3 6 1 Q7 3 6 6" />
    </svg>
  ),
  // Cedar wood plank
  "White Cedar": (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="0.9">
      <polygon points="6,1 10,5.5 2,5.5" />
      <polygon points="6,4 11,10 1,10" />
      <line x1="6" y1="10" x2="6" y2="12" />
    </svg>
  ),
  // Clean musk – abstract wave
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

export default function ScentProfile({ activeMood }) {
  const profile = profiles[activeMood] || profiles["morning-calm"];

  return (
    <div>
      <h2 className="text-[10px] uppercase tracking-[0.25em] text-ghalia-gold/100 mb-8 font-body">Scent Profile</h2>
      <div className="space-y-5">
        {["top", "heart", "base"].map((noteType) => (
          <div key={noteType}>
            <span className="text-[10px] text-white/80 font-body tracking-wider uppercase">
              {noteLabels[noteType]}
            </span>
            <div className="flex flex-wrap gap-2 mt-2">
              {profile[noteType].map((note, i) => (
                <motion.span
                  key={note}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className={`
                    inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-body border tracking-wide
                    ${noteStyles[noteType]}
                  `}
                >
                  <span className="opacity-70 flex-shrink-0">
                    {glyphs[note] || defaultGlyph}
                  </span>
                  {note}
                </motion.span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}