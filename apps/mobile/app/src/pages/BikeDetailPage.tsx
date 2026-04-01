import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SegmentedControl from "@/components/ride/SegmentedControl";
import MaintenanceRow from "@/components/ride/MaintenanceRow";
import FuelEntryRow from "@/components/ride/FuelEntryRow";
import StatCard from "@/components/ride/StatCard";
import SectionHeader from "@/components/ride/SectionHeader";
import { ArrowLeft, Bike } from "lucide-react";

const BikeDetailPage = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Hero */}
      <div className="relative h-48 bg-surface-raised flex items-center justify-center">
        <Bike size={64} className="text-primary/20" />
        <div className="absolute left-0 right-0 bottom-0 bg-gradient-to-t from-background to-transparent h-16" />
        <button
          onClick={() => navigate(-1)}
          className="absolute left-4 top-12 flex h-10 w-10 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm"
        >
          <ArrowLeft size={18} className="text-foreground" />
        </button>
        <div className="absolute bottom-3 left-4">
          <h1 className="text-xl font-bold text-foreground">Ninja ZX-6R</h1>
          <p className="text-xs text-muted-foreground">Kawasaki · 2023</p>
        </div>
      </div>

      <div className="px-4 pt-4">
        {/* Quick stats */}
        <div className="flex gap-2">
          <StatCard label="Total KM" value="15,720" />
          <StatCard label="Rides" value="87" />
          <StatCard label="Last Ride" value="Mar 28" />
        </div>

        {/* Tabs */}
        <div className="mt-5">
          <SegmentedControl segments={["Maintenance", "Fuel"]} active={tab} onChange={setTab} />
        </div>

        {tab === 0 && (
          <div className="mt-4">
            <div className="rounded-lg bg-surface p-3">
              <MaintenanceRow name="Oil Change" lastDone="12,400 km · Jan 15" nextDue="15,400 km" status="overdue" />
              <MaintenanceRow name="Tires" lastDone="10,000 km · Nov 20" nextDue="20,000 km" status="ok" />
              <MaintenanceRow name="Brakes" lastDone="10,000 km · Nov 20" nextDue="20,000 km" status="ok" />
              <MaintenanceRow name="Chain" lastDone="14,800 km · Mar 1" nextDue="15,800 km" status="due-soon" />
              <MaintenanceRow name="Air Filter" lastDone="8,000 km · Aug 10" nextDue="16,000 km" status="ok" />
              <MaintenanceRow name="Brake Fluid" lastDone="5,000 km · Apr 5" nextDue="15,000 km" status="overdue" />
            </div>
            <button className="mt-4 flex h-12 w-full items-center justify-center rounded-lg border border-primary text-sm font-bold text-primary active:bg-primary/10">
              Log Service
            </button>
          </div>
        )}

        {tab === 1 && (
          <div className="mt-4">
            {/* Summary */}
            <div className="flex gap-2">
              <StatCard label="Avg Consumption" value="18.2" unit="km/l" variant="primary" />
              <StatCard label="This Month" value="$87" />
            </div>

            <div className="mt-4 rounded-lg bg-surface p-3">
              <FuelEntryRow date="Mar 26" liters={12.5} pricePerLiter={1.45} kmAtFueling={15720} />
              <FuelEntryRow date="Mar 18" liters={11.8} pricePerLiter={1.42} kmAtFueling={15480} />
              <FuelEntryRow date="Mar 10" liters={13.2} pricePerLiter={1.48} kmAtFueling={15200} />
            </div>

            <button className="mt-4 flex h-12 w-full items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground active:opacity-90">
              Add Fuel Entry
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BikeDetailPage;
