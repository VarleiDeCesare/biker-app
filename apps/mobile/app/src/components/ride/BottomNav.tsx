import { useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Play, Clock, User } from "lucide-react";

const tabs = [
  { path: "/dashboard", icon: LayoutDashboard, label: "Home" },
  { path: "/ride", icon: Play, label: "Ride" },
  { path: "/history", icon: Clock, label: "History" },
  { path: "/profile", icon: User, label: "Profile" },
];

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-divider bg-background safe-bottom">
      <div className="flex h-14 items-center justify-around">
        {tabs.map((tab) => {
          const active = isActive(tab.path);
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className="flex min-h-[48px] min-w-[48px] flex-col items-center justify-center gap-0.5"
            >
              <tab.icon
                size={22}
                className={active ? "text-primary" : "text-muted-foreground"}
                strokeWidth={active ? 2.5 : 2}
              />
              <span
                className={`text-[10px] font-medium ${
                  active ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
