import { Fuel } from "lucide-react";

interface FuelEntryRowProps {
  date: string;
  liters: number;
  pricePerLiter: number;
  kmAtFueling: number;
}

const FuelEntryRow = ({ date, liters, pricePerLiter, kmAtFueling }: FuelEntryRowProps) => (
  <div className="flex items-center gap-3 border-b border-divider py-3 last:border-b-0">
    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-raised">
      <Fuel size={16} className="text-primary-soft" />
    </div>
    <div className="flex-1">
      <p className="text-sm font-medium text-foreground">{date}</p>
      <p className="text-xs text-muted-foreground">
        {liters}L · ${pricePerLiter.toFixed(2)}/L · {kmAtFueling.toLocaleString()} km
      </p>
    </div>
    <span className="font-mono-data text-sm font-semibold text-foreground">
      ${(liters * pricePerLiter).toFixed(2)}
    </span>
  </div>
);

export default FuelEntryRow;
