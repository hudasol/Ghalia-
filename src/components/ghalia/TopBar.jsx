import React, { useState, useEffect } from "react";
import { MapPin } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "Command Centre", path: "/" },
  { label: "The Library", path: "/library" },
  { label: "Insights", path: "/insights" },
];

export default function TopBar() {
  const [time, setTime] = useState(new Date());
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedTime = time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  const formattedDate = time.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="h-16 flex items-center justify-between px-8 border-b border-ghalia-gold/100" style={{ borderBottomWidth: '0.5px', background: '#2a0101' }}>
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="flex flex-col items-start leading-none">
          <span className="text-ghalia-gold/100 font-heading text-2xl font-semibold tracking-wide">
            غالية
          </span>
          <span className="text-ghalia-gold/90 font-heading text-xs tracking-[0.3em] uppercase -mt-1">
            Ghalia
          </span>
        </div>
        <div className="w-px h-8 bg-ghalia-gold/90 mx-3" />
        <span className="text-[10px] tracking-[0.2em] uppercase text-ghalia-gold/100 font-body">
          Scent Experience Management
        </span>
      </div>

      {/* Nav */}
      <nav className="flex items-center gap-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className="relative px-4 py-1.5 text-[11px] font-body tracking-[0.18em] uppercase transition-all duration-300"
              style={{ color: isActive ? '#b8963e' : 'rgba(184,150,62,0.4)' }}
            >
              {item.label}
              {isActive && (
                <span className="absolute bottom-0 left-4 right-4 h-px" style={{ background: 'linear-gradient(90deg, transparent, #b8963e, transparent)' }} />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Venue & Time */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-white/90">
          <MapPin className="w-3.5 h-3.5 text-ghalia-gold/100" />
          <span className="text-xs font-body tracking-wide">The Royal Palms Resort & Spa</span>
        </div>
        <div className="w-px h-8 bg-ghalia-gold/90" />
        <div className="text-right">
          <div className="text-ghalia-gold/90 font-body text-sm font-medium tabular-nums tracking-wider">
            {formattedTime}
          </div>
          <div className="text-white/90 text-[10px] tracking-wide font-body">
            {formattedDate}
          </div>
        </div>
      </div>
    </div>
  );
}