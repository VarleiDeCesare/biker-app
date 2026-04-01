import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SpeedReadout from "@/components/ride/SpeedReadout";
import { Square, MapPin } from "lucide-react";

const LiveTrackingPage = () => {
  const navigate = useNavigate();
  const [unit, setUnit] = useState<"km/h" | "mph">("km/h");

  return (
    <div className="fixed inset-0 flex flex-col bg-background">
      {/* Map area */}
      <div className="relative flex-1 bg-surface">
        {/* Simulated dark map */}
        <div className="absolute inset-0 bg-[#0a0a0a]">
          {/* Grid lines to simulate a map */}
          <div className="absolute inset-0 opacity-10">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={`h-${i}`} className="absolute w-full border-t border-foreground/5" style={{ top: `${i * 5}%` }} />
            ))}
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={`v-${i}`} className="absolute h-full border-l border-foreground/5" style={{ left: `${i * 8.33}%` }} />
            ))}
          </div>
          {/* Route polyline simulation */}
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 390 500" fill="none">
            <path
              d="M80 400 C120 350, 160 300, 200 280 S280 200, 300 150 S320 100, 330 80"
              stroke="hsl(20, 100%, 50%)"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
              opacity="0.9"
            />
            <circle cx="330" cy="80" r="6" fill="hsl(20, 100%, 50%)" className="animate-pulse-glow" />
          </svg>
          {/* Current location dot */}
          <div className="absolute right-16 top-20 flex items-center justify-center">
            <div className="h-4 w-4 rounded-full bg-primary animate-pulse-glow" />
            <div className="absolute h-8 w-8 rounded-full bg-primary/20" />
          </div>
        </div>

        {/* Top bar */}
        <div className="absolute left-0 right-0 top-0 flex items-center justify-between px-4 pt-12">
          <div className="rounded-lg bg-background/80 px-3 py-2 backdrop-blur-sm">
            <p className="text-xs font-semibold text-foreground">Ninja ZX-6R</p>
          </div>
          <button
            onClick={() => navigate("/ride/summary")}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive active:opacity-90"
          >
            <Square size={18} className="text-destructive-foreground" fill="currentColor" />
          </button>
        </div>
      </div>

      {/* Bottom overlay */}
      <div className="bg-background px-6 pb-8 pt-6 safe-bottom">
        <div className="flex flex-col items-center">
          <SpeedReadout
            speed={87}
            unit={unit}
            size="xl"
            onToggleUnit={() => setUnit(u => u === "km/h" ? "mph" : "km/h")}
          />

          <div className="mt-6 flex w-full justify-around">
            <div className="flex flex-col items-center">
              <span className="font-mono-data text-2xl font-bold text-foreground">23:47</span>
              <span className="mt-0.5 text-[11px] text-muted-foreground">Duration</span>
            </div>
            <div className="h-10 w-px bg-divider" />
            <div className="flex flex-col items-center">
              <span className="font-mono-data text-2xl font-bold text-primary">18.4</span>
              <span className="mt-0.5 text-[11px] text-muted-foreground">km</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveTrackingPage;
