import React from "react";
import { Clock } from "lucide-react";

const schedule = [
  { time: "06:00 – 10:00", mood: "Morning Calm", color: "#FFF4E8", start: 6,  end: 10 },
  { time: "10:00 – 16:00", mood: "Tropical",     color: "#F04A00", start: 10, end: 16 },
  { time: "16:00 – 21:00", mood: "Oriental Dusk",color: "#889682", start: 16, end: 21 },
  { time: "21:00 – 06:00", mood: "Arctic Crisp", color: "#90D5FF", start: 21, end: 30 }, // 30 = 06:00 next day
];

function getCurrentStatus(start, end) {
  const now = new Date();
  const hour = now.getHours() + now.getMinutes() / 60;
  // Arctic Crisp wraps midnight: 21–30 means 21:00–06:00
  if (start === 21) {
    return (hour >= 21 || hour < 6) ? "active" : (hour < 21 ? "future" : "past");
  }
  if (hour >= end) return "past";
  if (hour >= start) return "active";
  return "future";
}

export default function DailySchedule({ activeMood }) {
  return (
    <div>
      <h2 className="text-[10px] uppercase tracking-[0.25em] text-ghalia-gold/100 mb-8 font-body">Daily Schedule</h2>
      <div className="relative">
        <div
          className="absolute left-[7px] top-3 bottom-3 w-px"
          style={{ background: 'linear-gradient(to bottom, rgba(184,150,62,0.08), rgba(184,150,62,0.25), rgba(184,150,62,0.08))' }}
        />

        <div className="space-y-1">
          {schedule.map((slot, i) => {
            const status = getCurrentStatus(slot.start, slot.end);
            const isPast = status === "past";
            const isActive = slot.mood.toLowerCase().replace(" ", "-") === activeMood;

            return (
              <div
                key={i}
                className="relative flex items-center gap-3 pl-6 pr-2 py-3 rounded-md transition-all"
                style={{
                  // Past slots are dimmed to show the day's progression
                  opacity: isPast && !isActive ? 0.35 : 1,
                  ...(isActive
                    ? { border: '0.5px solid rgba(184,150,62,0.4)', background: 'rgba(184,150,62,0.08)' }
                    : { border: '0.5px solid transparent' }),
                }}
              >
                {/* Timeline dot */}
                <div className="absolute left-[4px] flex items-center justify-center w-[7px] h-[7px]">
                  {isActive ? (
                    <>
                      <div
                        className="absolute w-3 h-3 rounded-full"
                        style={{ background: 'rgba(184,150,62,0.2)', animation: 'ping 2.5s cubic-bezier(0,0,0.2,1) infinite' }}
                      />
                      <div
                        className="relative w-[7px] h-[7px] rounded-full"
                        style={{ background: '#b8963e', boxShadow: '0 0 6px rgba(184,150,62,0.7)' }}
                      />
                    </>
                  ) : (
                    <div
                      className="w-[5px] h-[5px] rounded-full"
                      style={{ background: isPast ? 'rgba(184,150,62,0.25)' : 'rgba(255,255,255,0.12)' }}
                    />
                  )}
                </div>

                <Clock className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? "text-ghalia-gold" : "text-white/20"}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <div
                      className="w-[6px] h-[6px] rounded-full flex-shrink-0"
                      style={{ background: slot.color, opacity: isPast ? 0.5 : 1 }}
                    />
                    <p className={`text-xs font-body tracking-wide ${isActive ? "text-ghalia-gold font-medium" : "text-white/50"}`}>
                      {slot.mood}
                    </p>
                  </div>
                  <p className="text-[10px] text-white/25 font-body tabular-nums mt-0.5">
                    {slot.time}
                  </p>
                </div>
                {isActive && (
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-ghalia-gold animate-pulse" />
                    <span className="text-[9px] text-ghalia-gold/60 font-body uppercase tracking-wider">Now</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}