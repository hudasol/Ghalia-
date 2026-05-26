import React, { useState, useEffect } from "react";

// Intelligence Layer: Synchronizing mood and physiological goals
const schedule = [
  { mood: "morning-calm", label: "Morning Calm", goal: "Awaken & Focus", start: 6,  end: 10, defaultIntensity: 85 },
  { mood: "tropical",     label: "Tropical",     goal: "Energize & Uplift", start: 10, end: 16, defaultIntensity: 45 },
  { mood: "oriental-dusk",label: "Oriental Dusk",goal: "Sensory Warmth",   start: 16, end: 21, defaultIntensity: 90 },
  { mood: "arctic-crisp", label: "Arctic Crisp", goal: "Deep Restoration", start: 21, end: 30, defaultIntensity: 15 },
];

function getCurrentSlot() {
  const now = new Date();
  const hour = now.getHours() + now.getMinutes() / 60 + now.getSeconds() / 3600;
  for (const slot of schedule) {
    if (slot.start === 21) {
      if (hour >= 21 || hour < 6) return slot;
    } else {
      if (hour >= slot.start && hour < slot.end) return slot;
    }
  }
  return schedule[0];
}

function getRemaining(slot) {
  const now = new Date();
  const h = now.getHours();
  const m = now.getMinutes();
  const s = now.getSeconds();
  const totalNowSec = h * 3600 + m * 60 + s;
  if (slot.start === 21) {
    const endSec = 6 * 3600;
    const remainSec = h >= 21
      ? (24 * 3600 - totalNowSec) + endSec
      : endSec - totalNowSec;
    return remainSec;
  }
  return Math.max(0, slot.end * 3600 - totalNowSec);
}

function formatRemaining(sec) {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  if (h > 0) return `${h}h ${m}m remaining`;
  return `${m}m remaining`;
}

function MistIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
      <path d="M3 10 Q3.5 8 3 6 Q2.5 4 3 2" />
      <path d="M6 10 Q6.6 7.5 6 5 Q5.4 2.5 6 1" />
      <path d="M9 10 Q9.5 8 9 6 Q8.5 4 9 2" />
    </svg>
  );
}

export default function DiffusingBar({ activeMood, sliderValues }) {
  const [, setTick] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTick(n => n + 1), 1000);
    return () => clearInterval(t);
  }, []);

  // 1. Get Scheduled Context for Auto-scaling info
  const scheduledSlot = getCurrentSlot();
  
  // 2. Determine Active Mood (Manual selection from MoodSelector overrides schedule)
  const currentMoodData = schedule.find(s => s.mood === activeMood) || scheduledSlot;

  // 3. COLLABORATION LOGIC: Calculate Average Intensity from all Scent Parameters
  // This ensures the bar updates when any individual cartridge slider moves.
  const allValues = Object.values(sliderValues);
  const collaborativeIntensity = Math.round(
    allValues.reduce((a, b) => a + b, 0) / allValues.length
  );

  // 4. Intelligence Check: Is this a Dubai Peak Hour?
  const h = new Date().getHours();
  const isPeak = (h >= 8 && h <= 11) || (h >= 18 && h <= 22);
  const remainStr = formatRemaining(getRemaining(scheduledSlot));

  return (
    <div 
      className="relative flex items-center justify-between px-6" 
      style={{
        height: '42px',
        borderRadius: '4px',
        background: 'rgb(184, 150, 62)', // Solid Ghalia Gold Base
        boxShadow: 'inset 0 1px 4px rgba(0,0,0,0.3), 0 4px 20px rgba(0,0,0,0.2)',
        border: '0.5px solid rgba(184,150,62,0.5)',
      }}
    >
      <div className="flex items-center gap-4">
        {/* Animated Pulse dot */}
        <div className="relative flex items-center justify-center w-3 h-3">
          <div className="absolute w-full h-full rounded-full bg-[#2c0000]/20 animate-ping" />
          <div className="w-2 h-2 rounded-full bg-[#2c0000]" />
        </div>

        {/* Dynamic Labels connected to Mood Selection */}
        <div className="flex items-center gap-3">
          <span className="text-[12px] uppercase tracking-[0.2em] font-body text-[#2c0000] font-bold">
            Currently Diffusing
          </span>
          <span className="text-[#2c0000]/30 text-[10px]">|</span>
          <span className="font-body text-[13px] font-semibold text-[#2c0000] leading-none uppercase">
            {currentMoodData.label}
          </span>
          <span className="text-[10px] uppercase tracking-wider text-[#2c0000]/90 ml-1">
             {currentMoodData.goal}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-6">
        {/* Intensity connected to Collaborative Slider Average */}
        <div className="flex flex-col items-end">
          <span className="text-[12px] font-body tabular-nums text-[#2c0000] font-bold">
            {collaborativeIntensity}% Intensity
          </span>
          <span className="text-[8px] uppercase tracking-wider text-[#2c0000]/90">
            {isPeak ? "Active Collaboration: Peak Mode" : "Manual Override: Optimized"}
          </span>
        </div>

        {/* Time Remaining with Mist Icon */}
        <div className="flex items-center gap-2 bg-[#2c0000]/10 px-3 py-1 rounded-full">
          <MistIcon />
          <span className="text-[11px] font-body tabular-nums text-[#2c0000] font-medium">
            {remainStr}
          </span>
        </div>
      </div>
    </div>
  );
}