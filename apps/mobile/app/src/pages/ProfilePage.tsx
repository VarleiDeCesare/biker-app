import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/ride/BottomNav";
import StatCard from "@/components/ride/StatCard";
import BikeCard from "@/components/ride/BikeCard";
import SectionHeader from "@/components/ride/SectionHeader";
import { User, Award, Settings, LogOut, ChevronRight, Bell, Ruler, Info, Plus } from "lucide-react";

const ProfilePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="px-4 pt-14">
        {/* Rider Profile */}
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-surface-raised">
            <User size={28} className="text-muted-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">Alex Rider</h1>
            <p className="text-sm text-muted-foreground">5 years riding · Sport</p>
          </div>
        </div>

        {/* Lifetime Stats */}
        <div className="mt-5 flex gap-2">
          <StatCard label="Total KM" value="24,380" />
          <StatCard label="Rides" value="142" />
          <StatCard label="Hours" value="312" />
        </div>

        {/* Achievements */}
        <div className="mt-4">
          <SectionHeader title="Achievements" />
          <div className="flex gap-2 overflow-x-auto pb-2">
            {[
              { label: "Century", unlocked: true },
              { label: "Iron Butt", unlocked: true },
              { label: "Night Owl", unlocked: false },
              { label: "Summit", unlocked: false },
            ].map((badge) => (
              <div
                key={badge.label}
                className={`flex-shrink-0 flex flex-col items-center justify-center rounded-lg p-3 w-20 ${
                  badge.unlocked ? "bg-primary/10" : "bg-surface"
                }`}
              >
                <Award
                  size={24}
                  className={badge.unlocked ? "text-primary" : "text-muted-foreground/30"}
                />
                <span className={`mt-1.5 text-[10px] font-semibold ${
                  badge.unlocked ? "text-primary" : "text-muted-foreground/40"
                }`}>
                  {badge.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* My Bikes */}
        <div className="mt-4">
          <SectionHeader title="My Bikes" action={{ label: "+ Add", onClick: () => {} }} />
          <div className="flex flex-col gap-2">
            <BikeCard
              name="Ninja ZX-6R"
              model="Kawasaki"
              year={2023}
              currentKm={15720}
              onTap={() => navigate("/profile/bike-detail")}
            />
            <BikeCard
              name="MT-07"
              model="Yamaha"
              year={2021}
              currentKm={8430}
              onTap={() => navigate("/profile/bike-detail")}
            />
          </div>
        </div>

        {/* Settings */}
        <div className="mt-6">
          <SectionHeader title="Settings" />
          <div className="rounded-lg bg-surface">
            {[
              { icon: Bell, label: "Notifications", sub: "Reminders & alerts" },
              { icon: Ruler, label: "Units", sub: "km/h, Liters" },
              { icon: User, label: "Edit Profile", sub: "" },
              { icon: Info, label: "About", sub: "v1.0.0" },
            ].map(({ icon: Icon, label, sub }, i) => (
              <button
                key={label}
                className={`flex w-full items-center gap-3 px-4 py-3.5 text-left ${
                  i < 3 ? "border-b border-divider" : ""
                }`}
              >
                <Icon size={18} className="text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{label}</p>
                  {sub && <p className="text-xs text-muted-foreground">{sub}</p>}
                </div>
                <ChevronRight size={16} className="text-muted-foreground" />
              </button>
            ))}
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={() => navigate("/")}
          className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-lg text-sm font-semibold text-destructive"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>

      <BottomNav />
    </div>
  );
};

export default ProfilePage;
