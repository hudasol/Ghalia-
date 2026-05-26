import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sun, Snowflake, Moon, Leaf, Waves, Droplets } from "lucide-react";
import TopBar from "../components/ghalia/TopBar";

const studyIcons = {
  calm: Moon,
  clean: Snowflake,
  awake: Sun,
  feel: Leaf,
  mood: Waves,
  memory: Droplets,
};

const studies = [
  {
    id: "calm",
    title: "Calm",
    summary: "Lavender and sandalwood activate the parasympathetic nervous system, measurably lowering cortisol levels within twelve minutes of diffusion.",
    body: "Research from the University of Vienna found that linalool — the primary terpene in lavender — binds directly to GABA receptors in the brain, producing a calming effect comparable to low-dose benzodiazepines without the sedative side effects. Combined with sandalwood's alpha-santalol compound, which reduces systolic blood pressure, a Morning Calm blend creates a physiologically measurable state of composed alertness. Ideal for spa arrival lounges and meditation spaces where guests need to transition from street-pace to sanctuary.",
  },
  {
    id: "clean",
    title: "Clean",
    summary: "Crisp green and aquatic notes signal environmental purity to the brain, boosting perceived hygiene and raising guests' confidence in a space.",
    body: "Studies published in the Journal of Environmental Psychology demonstrate that ambient scent perceived as 'clean' correlates with a 34% increase in guests rating a hotel room as hygienic, even when the room's actual cleanliness was controlled. Eucalyptus and cool iris contain natural antimicrobial volatiles that further support this effect by genuinely reducing airborne bacteria. This dual mechanism — symbolic and chemical — makes Arctic Crisp profiles the ideal choice for fitness centres, treatment rooms, and high-traffic corridors.",
  },
  {
    id: "awake",
    title: "Awake",
    summary: "Citrus top notes stimulate the noradrenergic system in milliseconds, producing an immediate and sustained uplift in alertness and mood.",
    body: "The olfactory bulb has a uniquely direct pathway to the locus coeruleus, the brain's alertness centre, bypassing the thalamic relay used by all other senses. Bergamot and lemon zest trigger norepinephrine release within 250 milliseconds of inhalation — faster than caffeine's 45-minute metabolic cycle. Research from Northumbria University found that rosemary aroma alone improved working memory scores by 15%. These findings underpin the selection of bright top notes in morning-profile blends for breakfast venues, lobbies at check-in, and pre-treatment consultation areas.",
  },
  {
    id: "feel",
    title: "Feel",
    summary: "Rich florals and warm ambers activate the limbic system's emotional memory centres, creating an immediate sense of comfort and luxury.",
    body: "Scent is the only sense with a direct anatomical connection to the hippocampus and amygdala — the brain structures responsible for emotional memory encoding. Rose absolute contains phenylethylamine, a compound also released during positive social bonding, which produces a subtle warmth in mood. Amber's labdanum resin has been shown in clinical settings to reduce state anxiety by 18% in unfamiliar environments. This explains why Oriental Dusk profiles are consistently rated highest for 'feeling welcomed' in luxury hospitality research — the guest's brain interprets these molecules as a signal of safety and abundance.",
  },
  {
    id: "mood",
    title: "Mood",
    summary: "Tropical and exotic blends elevate dopamine baseline through novelty signalling, sustaining a heightened sense of pleasure and anticipation.",
    body: "Neuroimaging studies show that unfamiliar but pleasant scents produce greater activation in the nucleus accumbens — the brain's reward hub — than familiar ones. Frangipani and tiare flower, rarely encountered in temperate climates, trigger sustained dopamine release because the brain continues predicting and anticipating rather than habituating. Research conducted across resort environments found that guests exposed to tropical profiles rated their overall stay satisfaction 22% higher than control groups, without any change in service delivery. This 'mood premium' makes exotic blends particularly valuable for pool decks and dining venues where experiential uplift drives loyalty.",
  },
  {
    id: "memory",
    title: "Memory",
    summary: "Signature scents encode brand memory at a neurological level, making recall of a space twice as durable as visual or auditory branding alone.",
    body: "The Proust Phenomenon — vivid autobiographical memory triggered by smell — has a well-documented neurological basis: olfactory memories are stored with greater emotional intensity and resist extinction longer than declarative memories. A landmark study across four Marriott properties found that guests exposed to a consistent signature scent across three stays showed 2.3x higher unprompted brand recall at six months versus control groups. The same study noted that 68% of guests reported the scent as a key factor in their decision to rebook. Ghalia's scent library is designed with this in mind — each profile is engineered not just for immediate effect, but for long-term imprinting of your venue's identity.",
  },
];

export default function Library() {
  const [selected, setSelected] = useState(null);
  const active = studies.find(s => s.id === selected);

  return (
    <div className="h-screen flex flex-col overflow-hidden" style={{ background: '#380100' }}>
      <TopBar />
      <div style={{ height: '0.5px', background: '#b8963e', opacity: 0.5 }} />

      <div className="flex-1 overflow-y-auto px-10 py-10">
        {/* Header */}
        <div className="mb-10">
          <h1 className="font-heading text-3xl font-light text-ghalia-gold tracking-wider mb-2">
            The Library
          </h1>
          <p className="text-[13px] font-body text-white/50 tracking-wide italic font-light">
            What scent does to the mind, the body, and the memory.
          </p>
          <div className="mt-4 w-16 h-px" style={{ background: 'linear-gradient(90deg, #b8963e, transparent)' }} />
        </div>

        {/* 2×3 Grid */}
        <div className="grid grid-cols-2 gap-5 max-w-4xl">
          {studies.map((study, i) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, duration: 0.5, ease: "easeOut" }}
              className="relative rounded-lg p-6 cursor-pointer group transition-all duration-500"
              style={{
                background: 'rgba(30,2,2,0.7)',
                border: '0.5px solid rgba(184,150,62,0.15)',
              }}
              whileHover={{ borderColor: 'rgba(184,150,62,0.35)' }}
              onClick={() => setSelected(study.id)}
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-6 right-6 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(184,150,62,0.3), transparent)' }} />

              {/* Mood icon — top right */}
              {(() => { const Icon = studyIcons[study.id]; return Icon ? <Icon className="absolute top-5 right-5 w-4 h-4" style={{ color: 'rgba(184,150,62,0.3)' }} /> : null; })()}

              {/* Roman numeral */}
              <span className="text-[9px] font-body tracking-[0.3em] uppercase" style={{ color: 'rgba(184,150,62,0.3)' }}>
                {["I", "II", "III", "IV", "V", "VI"][i]}
              </span>

              <h2 className="font-heading text-2xl font-light text-ghalia-gold mt-2 mb-3 tracking-wide">
                {study.title}
              </h2>

              <p className="text-[12px] font-body text-white/50 leading-relaxed mb-5">
                {study.summary}
              </p>

              <button
                className="text-[11px] font-body tracking-[0.25em] uppercase transition-all duration-300 group-hover:text-ghalia-gold inline-block pb-0.5"
                style={{
                  color: 'rgba(184,150,62,0.6)',
                  letterSpacing: '0.22em',
                  borderBottom: '1px solid rgba(184,150,62,0.35)',
                }}
              >
                Read More →
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {active && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              style={{ background: 'rgba(10,0,0,0.75)' }}
              onClick={() => setSelected(null)}
            />
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="fixed inset-x-0 bottom-0 z-50 mx-auto max-w-2xl rounded-t-2xl p-10"
              style={{ background: '#1e0202', border: '0.5px solid rgba(184,150,62,0.25)', borderBottom: 'none' }}
            >
              <div className="absolute top-0 left-12 right-12 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(184,150,62,0.45), transparent)' }} />
              <button
                onClick={() => setSelected(null)}
                className="absolute top-5 right-6 text-white/30 hover:text-ghalia-gold transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <span className="text-[9px] font-body tracking-[0.3em] uppercase" style={{ color: 'rgba(184,150,62,0.4)' }}>
                {["I","II","III","IV","V","VI"][studies.findIndex(s => s.id === active.id)]}
              </span>
              <h2 className="font-heading text-3xl font-light text-ghalia-gold mt-1 mb-5 tracking-wide">
                {active.title}
              </h2>
              <p className="text-[13px] font-body text-white/60 leading-loose">
                {active.body}
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}