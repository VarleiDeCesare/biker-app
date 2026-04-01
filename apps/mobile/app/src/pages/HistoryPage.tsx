import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/ride/BottomNav";
import TripCard from "@/components/ride/TripCard";
import SectionHeader from "@/components/ride/SectionHeader";
import { Filter } from "lucide-react";

const trips = [
  { date: "Mar 28, 2026", bike: "Ninja ZX-6R", dist: "47.3 km", dur: "1h 12m", max: "138 km/h" },
  { date: "Mar 25, 2026", bike: "Ninja ZX-6R", dist: "23.1 km", dur: "0h 34m", max: "95 km/h" },
  { date: "Mar 22, 2026", bike: "MT-07", dist: "112.7 km", dur: "2h 45m", max: "162 km/h" },
  { date: "Mar 18, 2026", bike: "Ninja ZX-6R", dist: "15.8 km", dur: "0h 22m", max: "78 km/h" },
  { date: "Mar 14, 2026", bike: "MT-07", dist: "89.4 km", dur: "1h 55m", max: "144 km/h" },
];

const HistoryPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="px-4 pt-14">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-tight text-foreground">Ride History</h1>
          <button className="flex min-h-[48px] min-w-[48px] items-center justify-center">
            <Filter size={20} className="text-muted-foreground" />
          </button>
        </div>

        {/* Filters */}
        <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
          {["All Bikes", "This Month", "Ninja ZX-6R", "MT-07"].map((f, i) => (
            <button
              key={f}
              className={`flex-shrink-0 rounded-full px-4 py-2 text-xs font-semibold ${
                i === 0
                  ? "bg-primary text-primary-foreground"
                  : "bg-surface text-muted-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Trip list */}
        <div className="mt-4 flex flex-col gap-2">
          {trips.map((t, i) => (
            <TripCard
              key={i}
              date={t.date}
              bikeName={t.bike}
              distance={t.dist}
              duration={t.dur}
              maxSpeed={t.max}
              onTap={() => navigate("/history/trip-detail")}
            />
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default HistoryPage;
