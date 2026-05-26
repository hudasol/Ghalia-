import React from "react";
import { motion } from "framer-motion";
import { Sun, Palmtree, Moon, Snowflake } from "lucide-react";

const moods = [
  {
    id: "morning-calm",
    label: "Morning Calm",
    subtitle: "Gentle & Serene",
    icon: Sun,
  },
  {
    id: "tropical",
    label: "Tropical",
    subtitle: "Warm & Exotic",
    icon: Palmtree,
  },
  {
    id: "oriental-dusk",
    label: "Oriental Dusk",
    subtitle: "Rich & Deep",
    icon: Moon,
  },
  {
    id: "arctic-crisp",
    label: "Arctic Crisp",
    subtitle: "Cool & Fresh",
    icon: Snowflake,
  },
];

export default function MoodSelector({ activeMood, onMoodChange }) {
  return (
    <div>
      <h2 className="text-[10px] uppercase tracking-[0.25em] text-[#cbab5b] opacity-100 mb-8 font-body">Mood Selection</h2>
      
      <div className="flex gap-3 items-stretch">
        {moods.map((mood) => {
          const isActive = activeMood === mood.id;
          const Icon = mood.icon;
          return (
            <motion.button
              key={mood.id}
              onClick={() => onMoodChange(mood.id)}
              whileTap={{ scale: 0.98 }}
              animate={{ flex: isActive ? 3 : 1 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              style={isActive ? {
                boxShadow: 'inset 0 0 60px rgba(184,150,62,0.14), inset 0 0 24px rgba(184,150,62,0.10), 0 0 30px rgba(184,150,62,0.10)',
                border: '1px solid #b8963e',
                background: 'rgba(184,150,62,0.06)',
                opacity: 1,
              } : {
                border: '0.5px solid rgba(184,150,62,0.05)',
                background: 'rgba(0,0,0,0.2)',
                opacity: 0.3,
              }}
              className="relative py-6 rounded-lg text-center transition-colors duration-700 group overflow-hidden"
            >
              <div className="flex flex-col items-center justify-center gap-3 px-3">
                <div className={`rounded-full flex items-center justify-center transition-all duration-700 ${
                  isActive ? "w-12 h-12 bg-ghalia-gold/30" : "w-8 h-8"
                }`}>
                  <Icon className={`transition-all duration-700 ${
                    isActive ? "w-6 h-6 text-ghalia-gold" : "w-4 h-4 text-white/80"
                  }`} />
                </div>
                <div>
                  <p className={`text-[11px] font-body tracking-wide transition-all duration-700 whitespace-nowrap ${
                    isActive ? "text-ghalia-gold font-medium" : "text-white/80 font-light"
                  }`}>
                    {mood.label}
                  </p>
                  {isActive && (
                    <p className="text-[10px] font-body mt-0.5 text-ghalia-gold/90">
                      {mood.subtitle}
                    </p>
                  )}
                </div>
              </div>
              {isActive && (
                <motion.div
                  layoutId="moodIndicator"
                  className="absolute -bottom-px left-1/2 -translate-x-1/2 w-12 h-0.5 bg-ghalia-gold rounded-full"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}