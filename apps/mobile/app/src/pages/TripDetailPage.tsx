import { useNavigate } from "react-router-dom";
import StatCard from "@/components/ride/StatCard";
import { ArrowLeft, Share2 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, CartesianGrid, AreaChart, Area } from "recharts";

const speedData = Array.from({ length: 30 }, (_, i) => ({
  min: i * 2,
  speed: Math.floor(40 + Math.random() * 100 + Math.sin(i / 3) * 30),
}));

const elevationData = Array.from({ length: 30 }, (_, i) => ({
  km: (i * 1.6).toFixed(1),
  elevation: Math.floor(100 + Math.sin(i / 4) * 80 + i * 5),
}));

const TripDetailPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Map */}
      <div className="relative h-52 bg-[#0a0a0a]">
        <div className="absolute inset-0 opacity-10">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="absolute w-full border-t border-foreground/5" style={{ top: `${i * 8.33}%` }} />
          ))}
        </div>
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 390 208" fill="none">
          <path
            d="M30 170 C70 140, 130 80, 200 70 S280 50, 340 35"
            stroke="hsl(20, 100%, 50%)"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
        </svg>

        {/* Top bar */}
        <div className="absolute left-0 right-0 top-0 flex items-center justify-between px-4 pt-12">
          <button onClick={() => navigate(-1)} className="flex h-10 w-10 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm">
            <ArrowLeft size={18} className="text-foreground" />
          </button>
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm">
            <Share2 size={18} className="text-foreground" />
          </button>
        </div>
      </div>

      <div className="px-4 pt-5">
        <h1 className="text-lg font-bold text-foreground">Mar 28, 2026</h1>
        <p className="text-xs text-muted-foreground">Ninja ZX-6R · 1h 12m</p>

        {/* Stats */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          <StatCard label="Distance" value="47.3" unit="km" />
          <StatCard label="Avg Speed" value="65" unit="km/h" />
          <StatCard label="Max Speed" value="138" unit="km/h" variant="primary" />
        </div>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <StatCard label="Duration" value="1:12" unit="h" />
          <StatCard label="Elevation" value="342" unit="m" />
        </div>

        {/* Speed Chart */}
        <div className="mt-6">
          <p className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Speed over Time</p>
          <div className="h-36 rounded-lg bg-surface p-3">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={speedData}>
                <CartesianGrid stroke="hsl(0, 0%, 16.5%)" strokeDasharray="3 3" />
                <XAxis dataKey="min" tick={{ fontSize: 10, fill: '#888' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#888' }} axisLine={false} tickLine={false} width={30} />
                <Line type="monotone" dataKey="speed" stroke="hsl(20, 100%, 50%)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Elevation Chart */}
        <div className="mt-5">
          <p className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Elevation Profile</p>
          <div className="h-36 rounded-lg bg-surface p-3">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={elevationData}>
                <CartesianGrid stroke="hsl(0, 0%, 16.5%)" strokeDasharray="3 3" />
                <XAxis dataKey="km" tick={{ fontSize: 10, fill: '#888' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#888' }} axisLine={false} tickLine={false} width={30} />
                <Area type="monotone" dataKey="elevation" stroke="hsl(24, 100%, 63%)" fill="hsl(24, 100%, 63%)" fillOpacity={0.1} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripDetailPage;
