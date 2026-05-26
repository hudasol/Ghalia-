/**
 * Ghalia Journal Store & Configuration Logic
 * Scent Experience Operating System (Version 2.0)
 * * This file manages the "Intelligence Hub" between the Journal configuration
 * and the Dashboard's live Scent Profile.
 */

// Part 1: The Synthesis — Slot Definition
// Mapping Perfumery Identity to Experiential Function [cite: 354, 360]
export const SLOT_METADATA = {
  slot1: { perfumery: "Opening", function: "Freshness", id: "freshness" },
  slot2: { perfumery: "Heart",   function: "Warmth",    id: "warmth"    },
  slot3: { perfumery: "Foundation", function: "Depth",  id: "depth"     },
  slot4: { perfumery: "Character", function: "Intensity", id: "intensity" }
};

// Part 2: Initial Default State
// Sourced from your "Three Worlds" scent library [cite: 80, 289]
const initialJournalData = {
  lobby: {
    slot1: "Ghalia · Citrus · Bergamot", // Official Convention [cite: 431]
    slot2: "White Jasmine",              // Custom Entry
    slot3: "Cedarwood",                  // Custom Entry
    slot4: "Ghalia · Oud · Omani",       // Official Convention
    notes: "Oud works better in the mornings in the lobby than citrus — guests seem warmer." // [cite: 462]
  },
  spa: {
    slot1: "Ghalia · Herbal · Lavender",
    slot2: "Neroli",
    slot3: "Soft Musk",
    slot4: "Ghalia · Aquatic · Sea Salt",
    notes: "Maintaining high freshness for deep restoration." 
  },
  restaurant: {
    slot1: "Pink Pepper",
    slot2: "Rose Absolute",
    slot3: "Ghalia · Woody · Sandalwood",
    slot4: "Ghalia · Oud · Bahraini",
    notes: "Intense Omani oud provides better dwell-time than citrus for brunch."
  }
};

// Part 3: The Intelligence Layer Logic
/**
 * detectOilType: Implementation of the Naming Convention [cite: 430, 442]
 * Returns whether an oil is 'official' (starts with Ghalia ·) or 'custom'.
 */
export const detectOilType = (name) => {
  if (!name || name.trim() === "" || name === "Name your oil") return "empty";
  return name.startsWith("Ghalia ·") ? "official" : "custom";
};

/**
 * getBadgeDetails: Returns visual properties based on oil status [cite: 479, 480]
 */
export const getBadgeDetails = (name) => {
  const type = detectOilType(name);
  if (type === "official") return { label: "Official", color: "#B8963E", badge: "G" };
  if (type === "custom") return { label: "Custom", color: "rgba(255,255,255,0.4)", badge: null };
  return { label: "Name your oil", color: "#F59E0B", badge: null }; // Muted amber [cite: 238]
};

// Part 4: The Database Mock (Journal Store)
// For local persistence before you integrate real hardware APIs
export const journalStore = {
  data: initialJournalData,
  
  // Method to update a slot for a specific zone [cite: 454]
  updateSlot: (zone, slotId, newName) => {
    if (journalStore.data[zone]) {
      journalStore.data[zone][slotId] = newName;
      return true;
    }
    return false;
  },

  // Method to update freeform notes [cite: 458, 459]
  updateNotes: (zone, newNotes) => {
    if (journalStore.data[zone]) {
      journalStore.data[zone].notes = newNotes;
    }
  }
};