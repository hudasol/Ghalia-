// src/lib/mockData.js

export const insightData = {
  revenueGrowth: [
    { day: "Mon", revenue: 4200, scentIntensity: 45 },
    { day: "Tue", revenue: 4800, scentIntensity: 60 },
    { day: "Wed", revenue: 5100, scentIntensity: 85 },
    { day: "Thu", revenue: 4900, scentIntensity: 75 },
    { day: "Fri", revenue: 6200, scentIntensity: 90 },
    { day: "Sat", revenue: 7500, scentIntensity: 95 },
    { day: "Sun", revenue: 6800, scentIntensity: 80 },
  ],
  dwellTimeByMood: [
    { mood: "Morning Calm", avgMinutes: 12 },
    { mood: "Tropical", avgMinutes: 18 },
    { mood: "Oriental Dusk", avgMinutes: 34 },
    { mood: "Arctic Crisp", avgMinutes: 9 },
  ],
  kpis: {
    totalRevenueLift: "+18.4%",
    avgDwellIncrease: "+22m",
    cartridgeEfficiency: "94.2%",
    guestSatisfaction: "4.9/5"
  },
  revenueTimeline: [
    { hour: "06:00", spend: 210 },
    { hour: "08:00", spend: 245 },
    { hour: "10:00", spend: 310 },
    { hour: "12:00", spend: 480 },
    { hour: "14:00", spend: 520 },
    { hour: "16:00", spend: 595 },
    { hour: "18:00", spend: 710 },
    { hour: "20:00", spend: 890 },
    { hour: "22:00", spend: 760 },
    { hour: "00:00", spend: 520 },
  ],
  zones: [
    { label: "Main Lobby", status: "Optimal", efficiency: 94, note: "High correlation with F&B spend" },
    { label: "Grand Spa", status: "Stable", efficiency: 88, note: "Freshness profile maintaining calm" },
    { label: "Resto-Bar", status: "Peak", efficiency: 91, note: "Oriental Dusk driving dwell time" },
    { label: "Suite West", status: "Balanced", efficiency: 76, note: "Ambient restoration active" },
  ],
  scentWindows: {
    oud: { start: "18:00", end: "22:00", lift: "+34%" }
  }
};

