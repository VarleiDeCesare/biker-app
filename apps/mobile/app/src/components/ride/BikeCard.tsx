import { ChevronRight, Bike } from "lucide-react";

interface BikeCardProps {
  name: string;
  model: string;
  year: number;
  currentKm: number;
  photoUrl?: string;
  onTap?: () => void;
}

const BikeCard = ({ name, model, year, currentKm, onTap }: BikeCardProps) => (
  <button
    onClick={onTap}
    className="flex w-full items-center gap-3 rounded-lg bg-surface p-3 text-left active:bg-surface-raised"
  >
    <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-lg bg-surface-raised">
      <Bike size={24} className="text-primary" />
    </div>
    <div className="flex-1">
      <p className="text-sm font-bold text-foreground">{name}</p>
      <p className="text-xs text-muted-foreground">
        {model} · {year}
      </p>
      <p className="font-mono-data text-xs text-primary">{currentKm.toLocaleString()} km</p>
    </div>
    <ChevronRight size={18} className="text-muted-foreground" />
  </button>
);

export default BikeCard;
