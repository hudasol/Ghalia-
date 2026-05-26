import React, { useState, useEffect } from "react"; 
import TopBar from "../components/ghalia/TopBar";
import ZoneSidebar from "../components/ghalia/ZoneSidebar";
import MoodSelector from "../components/ghalia/MoodSelector";
import ScentSliders from "../components/ghalia/ScentSliders";
import ScentProfile from "../components/ghalia/ScentProfile";
import CartridgeLevels from "../components/ghalia/CartridgeLevels";
import DailySchedule from "../components/ghalia/DailySchedule";
import DiffusingBar from "../components/ghalia/DiffusingBar";

const moods = [
  { id: "morning-calm", label: "Morning Calm" },
  { id: "tropical", label: "Tropical" },
  { id: "oriental-dusk", label: "Oriental Dusk" },
  { id: "arctic-crisp", label: "Arctic Crisp" },
];

const defaultSliders = {
  warmth: 65,
  freshness: 42,
  intensity: 78,
  depth: 55,
};

// Intelligence Layer: Helper to find the mood ID based on the current time
const getScheduledMoodId = () => {
  const now = new Date();
  const hour = now.getHours() + now.getMinutes() / 60;
  
  if (hour >= 6 && hour < 10) return "morning-calm";
  if (hour >= 10 && hour < 16) return "tropical";
  if (hour >= 16 && hour < 21) return "oriental-dusk";
  return "arctic-crisp"; // 21:00 - 06:00
};

export default function Dashboard() {
  const [activeZone, setActiveZone] = useState("lobby");
  const [sliderValues, setSliderValues] = useState(defaultSliders);
  
  // Intelligence Layer: Initialize state from the live schedule
  const [activeMood, setActiveMood] = useState(getScheduledMoodId());
  const [isManualOverride, setIsOverride] = useState(false);

  useEffect(() => {
    // If the GM manually clicked a mood, we stop the auto-timer
    if (isManualOverride) return; 

    const interval = setInterval(() => {
      const scheduledId = getScheduledMoodId();
      if (activeMood !== scheduledId) {
        setActiveMood(scheduledId);
      }
    }, 60000); 

    return () => clearInterval(interval);
  }, [activeMood, isManualOverride]);

  // CRITICAL: Updated to use handleMoodChange instead of setActiveMood directly
  const handleMoodChange = (id) => {
    setIsOverride(true); // Effectively activates "Manual Override" mode
    setActiveMood(id);
  };

  const handleSliderChange = (id, value) => {
    setSliderValues((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden" style={{background: '#380100'}}>
      <TopBar />
      <div style={{ height: '0.5px', background: '#b8963e', opacity: 0.5 }} />

      <div className="flex-1 flex overflow-hidden">
        <ZoneSidebar activeZone={activeZone} onZoneChange={setActiveZone} />
        
        <div style={{ width: '1px', background: 'transparent', flexShrink: 0, boxShadow: 'inset -1px 0 0 rgba(184,150,62,0.14)' }} />

        {/* Centre Panel */}
        <div className="flex-1 overflow-y-auto px-8 py-10 space-y-12 bg-ghalia-dark1">
          
          {/*Changed onMoodChange to handleMoodChange */}
          <MoodSelector activeMood={activeMood} onMoodChange={handleMoodChange} />

          <DiffusingBar activeMood={activeMood} sliderValues={sliderValues} />
          
          <div className="w-full h-px bg-gradient-to-r from-transparent via-ghalia-gold/15 to-transparent" />
          
          <ScentSliders values={sliderValues} onChange={handleSliderChange} />
          
          <div style={{ height: '1rem' }} />
          
          <ScentProfile activeMood={activeMood} />
        </div>

        <div style={{ width: '1px', background: 'transparent', flexShrink: 0, boxShadow: 'inset -1px 0 0 rgba(184,150,62,0.14)' }} />

        {/* Right Panel */}
        <div className="w-72 overflow-y-auto px-8 py-10 space-y-12 bg-ghalia-dark1">
          <CartridgeLevels sliderValues={sliderValues} />
          <div className="w-full h-px bg-gradient-to-r from-transparent via-ghalia-gold/15 to-transparent" />
          
          {/* SYNC: Passing activeMood to DailySchedule */}
          <DailySchedule activeMood={activeMood} />
        </div>
      </div>
    </div>
  );  
}
