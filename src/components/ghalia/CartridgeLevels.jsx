import React from "react";
import { motion } from "framer-motion";
import { TriangleAlert } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const cartridges = [
  { id: "citrus", label: "Citrus Base", level: 78, color: "#c9a84c" },
  { id: "floral", label: "Floral Blend", level: 54, color: "#3d9b89" },
  { id: "woody", label: "Woody Musk", level: 91, color: "#d4b96a" },
  { id: "oud", label: "Oud Reserve", level: 32, color: "#8a7235", warn: true },
];

/**
 * Advanced Data Science Logic: Weighted Channel Consumption
 * Baseline: 5ml/hr total at 100% intensity.
 * Each cartridge has a "Primary Driver" slider.
 */
const calculateHoursRemaining = (cartId, level, sliderValues) => {
  const totalCapacity = 200; // ml
  const currentMl = (level / 100) * totalCapacity;
  const intensity = sliderValues.intensity / 100;

  // Weighted Logic: Map specific sliders to specific ingredient channels
  let weight = 0.25; // Default even draw
  if (cartId === "oud" || cartId === "woody") {
    weight = sliderValues.warmth / 100; // Warmth drives these
  } else if (cartId === "citrus" || cartId === "floral") {
    weight = sliderValues.freshness / 100; // Freshness drives these
  }

  // Final Consumption Rate = Base Rate * Weight * Intensity
  const consumptionRatePerHr = 5 * weight * intensity;
  
  if (consumptionRatePerHr === 0) return "∞"; 
  return Math.max(0, Math.round(currentMl / consumptionRatePerHr));
};

export default function CartridgeLevels({ sliderValues }) {
  // Identify the most depleted cartridge for the alert system
  const criticalCart = cartridges.find((c) => c.level <= 35);
  
  // Intelligence Layer: Calculate hours based on weighted channel math
  const hoursLeft = criticalCart 
    ? calculateHoursRemaining(criticalCart.id, criticalCart.level, sliderValues) 
    : 0;

  // Calculate overall collaborative intensity for the alert text
  const avgIntensity = Math.round(
    Object.values(sliderValues).reduce((a, b) => a + b, 0) / Object.values(sliderValues).length
  );

  return (
    <div className="w-full">
      <h2 className="text-[10px] uppercase tracking-[0.25em] text-[#cbab5b] opacity-100 mb-8 font-body">Cartridge Levels</h2>
      <div className="space-y-6">
        {cartridges.map((cart) => (
          <div key={cart.id}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                {cart.level <= 35 && (
                  <TriangleAlert className="w-3 h-3 flex-shrink-0" style={{ color: '#b8963e' }} />
                )}
                <span className="text-xs font-body text-white/75 tracking-wide uppercase">
                  {cart.label}
                </span>
              </div>
              <span
                className="text-xs font-body font-medium tabular-nums"
                style={cart.level <= 35 ? { color: '#f59e0b' } : {
                  background: 'linear-gradient(135deg, #c9a84c, #b8963e, #8a6e2f)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
                }}
              >
                {cart.level}%
              </span>
            </div>

            {/* Progress Bar Track */}
            <div className="rounded-full bg-white/5 overflow-hidden" style={{ height: '2px' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ 
                  width: `${cart.level}%`,
                  opacity: cart.level <= 35 ? [0.45, 1, 0.45] : 1 
                }}
                transition={{
                  width: { duration: 1.2, ease: "easeOut" },
                  opacity: cart.level <= 35 ? { duration: 3, ease: "easeInOut", repeat: Infinity } : {},
                }}
                className="h-full rounded-full"
                style={{ 
                  background: cart.level <= 35 
                    ? 'linear-gradient(90deg, #92400e60, #f59e0b)' 
                    : `linear-gradient(90deg, ${cart.color}40, ${cart.color})` 
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Dynamic Ghalia Alert: Shows only if a cartridge is below 35% */}
      {criticalCart && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8"
        >
          <Alert variant="warning" className="bg-white/[0.02] border-white/30">
            <TriangleAlert className="h-4 w-4" style={{ color: '#b8963e' }} />
            <AlertTitle className="font-heading tracking-[0.2em] uppercase text-[10px] mb-2 text-white/90">
              Resource Depletion
            </AlertTitle>
            <AlertDescription className="font-body text-[11px] leading-relaxed text-white/80">
              {criticalCart.label} is at {criticalCart.level}%.
              Based on current {avgIntensity}% collaborative intensity, depletion is estimated in <span className="text-[#cbab5b] font-medium">{hoursLeft} hours</span>.
            </AlertDescription>
          </Alert>
        </motion.div>
      )}
    </div>
  );
}
