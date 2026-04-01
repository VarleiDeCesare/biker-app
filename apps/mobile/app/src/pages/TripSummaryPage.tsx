import { useNavigate } from "react-router-dom";
import StatCard from "@/components/ride/StatCard";
import { MapPin, Check, X } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from "recharts";

const speedData = Array.from({ length: 30 }, (_, i) => ({
  min: i * 2,
  speed: Math.floor(40 + Math.random() * 100 + Math.sin(i / 3) * 30),
}));

const TripSummaryPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Map snapshot */}
      <div className="relative h-52 bg-[#0a0a0a]">
        <div className="absolute inset-0 opacity-10">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="absolute w-full border-t border-foreground/5" style={{ top: `${i * 8.33}%` }} />
          ))}
        </div>
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 390 208" fill="none">
          <path
            d="M40 180 C80 150, 120 100, 180 90 S260 60, 300 50 S350 30, 370 25"
            stroke="hsl(20, 100%, 50%)"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
        <div className="absolute left-4 top-12">
          <h1 className="text-lg font-bold text-foreground">Ride Complete</h1>
          <p className="text-xs text-muted-foreground">Mar 28, 2026 · Ninja ZX-6R</p>
        </div>
      </div>

      <div className="px-4 pt-5">
        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-2">
          <StatCard label="Distance" value="47.3" unit="km" />
          <StatCard label="Duration" value="1:12" unit="h" />
          <StatCard label="Avg Speed" value="65" unit="km/h" />
        </div>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <StatCard label="Max Speed" value="138" unit="km/h" variant="primary" />
          <StatCard label="Elevation" value="342" unit="m" />
        </div>

        {/* Speed chart */}
        <div className="mt-6">
          <p className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Speed over Time</p>
          <div className="h-40 rounded-lg bg-surface p-3">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={speedData}>
                <CartesianGrid stroke="hsl(0, 0%, 16.5%)" strokeDasharray="3 3" />
                <XAxis dataKey="min" tick={{ fontSize: 10, fill: '#888' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#888' }} axisLine={false} tickLine={false} width={30} />
                <Line
                  type="monotone"
                  dataKey="speed"
                  stroke="hsl(20, 100%, 50%)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={() => navigate("/history")}
            className="flex h-14 flex-1 items-center justify-center gap-2 rounded-xl border border-foreground/20 text-sm font-bold text-foreground active:bg-surface"
          >
            <X size={18} />
            Discard
          </button>
          <button
            onClick={() => navigate("/history")}
            className="flex h-14 flex-1 items-center justify-center gap-2 rounded-xl bg-primary text-sm font-bold text-primary-foreground active:opacity-90"
          >
            <Check size={18} />
            Save Ride
          </button>
        </div>
      </div>
    </div>
  );
};

export default TripSummaryPage;
