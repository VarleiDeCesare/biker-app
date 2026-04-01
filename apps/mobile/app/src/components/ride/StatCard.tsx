interface StatCardProps {
  label: string;
  value: string | number;
  unit?: string;
  variant?: "default" | "primary";
}

const StatCard = ({ label, value, unit, variant = "default" }: StatCardProps) => (
  <div className="flex flex-1 flex-col items-center rounded-lg bg-surface p-3">
    <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
      {label}
    </span>
    <div className="mt-1 flex items-baseline gap-1">
      <span
        className={`font-mono-data text-xl font-bold ${
          variant === "primary" ? "text-primary" : "text-foreground"
        }`}
      >
        {value}
      </span>
      {unit && (
        <span className="text-[11px] font-medium text-muted-foreground">{unit}</span>
      )}
    </div>
  </div>
);

export default StatCard;
