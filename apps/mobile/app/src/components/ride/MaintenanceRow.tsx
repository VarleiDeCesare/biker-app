import StatusBadge from "./StatusBadge";
import { ChevronRight } from "lucide-react";

interface MaintenanceRowProps {
  name: string;
  lastDone: string;
  nextDue: string;
  status: "ok" | "due-soon" | "overdue";
}

const MaintenanceRow = ({ name, lastDone, nextDue, status }: MaintenanceRowProps) => (
  <div className="flex items-center justify-between border-b border-divider py-3 last:border-b-0">
    <div className="flex-1">
      <p className="text-sm font-semibold text-foreground">{name}</p>
      <p className="mt-0.5 text-xs text-muted-foreground">
        Last: {lastDone} · Next: {nextDue}
      </p>
    </div>
    <div className="flex items-center gap-2">
      <StatusBadge status={status} />
      <ChevronRight size={16} className="text-muted-foreground" />
    </div>
  </div>
);

export default MaintenanceRow;
