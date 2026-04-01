import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/ride/BottomNav";
import BikeCard from "@/components/ride/BikeCard";
import { Bike, ChevronRight } from "lucide-react";

const PreRidePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="px-4 pt-14">
        <h1 className="text-xl font-bold tracking-tight text-foreground">Start a Ride</h1>
        <p className="mt-1 text-sm text-muted-foreground">Select your bike and hit the road</p>

        {/* Bike selector - horizontal scroll */}
        <div className="mt-6 -mx-4 px-4">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
            {[
              { name: "Ninja ZX-6R", model: "Kawasaki", year: 2023, km: 15720, selected: true },
              { name: "MT-07", model: "Yamaha", year: 2021, km: 8430, selected: false },
            ].map((bike) => (
              <div
                key={bike.name}
                className={`flex-shrink-0 w-[280px] rounded-xl p-4 border-2 transition-colors ${
                  bike.selected
                    ? "border-primary bg-primary/5"
                    : "border-divider bg-surface"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-surface-raised">
                    <Bike size={22} className={bike.selected ? "text-primary" : "text-muted-foreground"} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">{bike.name}</p>
                    <p className="text-xs text-muted-foreground">{bike.model} · {bike.year}</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="font-mono-data text-sm text-primary">{bike.km.toLocaleString()} km</span>
                  {bike.selected && <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">Selected</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected bike info */}
        <div className="mt-6 rounded-xl bg-surface p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-foreground">Kawasaki Ninja ZX-6R</p>
              <p className="text-xs text-muted-foreground">2023 · Sport</p>
            </div>
            <div className="text-right">
              <p className="font-mono-data text-lg font-bold text-foreground">15,720</p>
              <p className="text-[10px] text-muted-foreground">current km</p>
            </div>
          </div>
        </div>

        {/* Start button */}
        <button
          onClick={() => navigate("/ride/live")}
          className="mt-8 flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-primary text-lg font-bold text-primary-foreground active:opacity-90"
        >
          Start Ride
        </button>
      </div>

      <BottomNav />
    </div>
  );
};

export default PreRidePage;
