import { MapPin, Clock, Gauge } from "lucide-react";

interface TripCardProps {
  date: string;
  bikeName: string;
  distance: string;
  duration: string;
  maxSpeed: string;
  onTap?: () => void;
}

const TripCard = ({ date, bikeName, distance, duration, maxSpeed, onTap }: TripCardProps) => (
  <button
    onClick={onTap}
    className="flex w-full gap-3 rounded-lg bg-surface p-3 text-left active:bg-surface-raised"
  >
    {/* Mini map placeholder */}
    <div className="h-16 w-16 flex-shrink-0 rounded-md bg-surface-raised flex items-center justify-center">
      <MapPin size={20} className="text-primary/40" />
    </div>
    <div className="flex flex-1 flex-col justify-between">
      <div>
        <p className="text-sm font-semibold text-foreground">{date}</p>
        <p className="text-xs text-muted-foreground">{bikeName}</p>
      </div>
      <div className="flex gap-3">
        <div className="flex items-center gap-1">
          <MapPin size={12} className="text-muted-foreground" />
          <span className="font-mono-data text-xs text-foreground">{distance}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock size={12} className="text-muted-foreground" />
          <span className="font-mono-data text-xs text-foreground">{duration}</span>
        </div>
        <div className="flex items-center gap-1">
          <Gauge size={12} className="text-muted-foreground" />
          <span className="font-mono-data text-xs text-primary">{maxSpeed}</span>
        </div>
      </div>
    </div>
  </button>
);

export default TripCard;
