import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/ride/BottomNav";
import StatCard from "@/components/ride/StatCard";
import AlertBanner from "@/components/ride/AlertBanner";
import TripCard from "@/components/ride/TripCard";
import SectionHeader from "@/components/ride/SectionHeader";
import MaintenanceRow from "@/components/ride/MaintenanceRow";
import { Play } from "lucide-react";

const DashboardPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="px-4 pt-14">
        {/* Greeting */}
        <div className="mb-1">
          <p className="text-sm text-muted-foreground">Good morning</p>
          <h1 className="text-xl font-bold tracking-tight text-foreground">
            Ninja ZX-6R <span className="text-primary">·</span>
          </h1>
        </div>

        {/* Alert */}
        <div className="mt-4">
          <AlertBanner
            message="Oil change overdue — 320 km ago"
            variant="warning"
          />
        </div>

        {/* Quick Stats */}
        <div className="mt-5 flex gap-2">
          <StatCard label="This Month" value="1,247" unit="km" />
          <StatCard label="Rides" value="18" />
          <StatCard label="Best" value="162" unit="km/h" variant="primary" />
        </div>

        {/* Start Ride CTA */}
        <button
          onClick={() => navigate("/ride")}
          className="mt-5 flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-primary text-base font-bold text-primary-foreground active:opacity-90"
        >
          <Play size={18} fill="currentColor" />
          Start a Ride
        </button>

        {/* Recent Activity */}
        <SectionHeader title="Recent Activity" action={{ label: "See all", onClick: () => navigate("/history") }} />
        <TripCard
          date="Mar 28, 2026"
          bikeName="Ninja ZX-6R"
          distance="47.3 km"
          duration="1h 12m"
          maxSpeed="138 km/h"
          onTap={() => navigate("/history/trip-detail")}
        />

        {/* Maintenance */}
        <div className="mt-4">
          <SectionHeader title="Maintenance" action={{ label: "View all", onClick: () => {} }} />
          <div className="rounded-lg bg-surface p-3">
            <MaintenanceRow
              name="Oil Change"
              lastDone="12,400 km · Jan 15"
              nextDue="15,400 km"
              status="overdue"
            />
            <MaintenanceRow
              name="Chain Adjustment"
              lastDone="14,800 km · Mar 1"
              nextDue="15,800 km"
              status="due-soon"
            />
            <MaintenanceRow
              name="Brake Pads"
              lastDone="10,000 km · Nov 20"
              nextDue="20,000 km"
              status="ok"
            />
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default DashboardPage;
