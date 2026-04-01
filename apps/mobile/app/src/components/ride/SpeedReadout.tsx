interface SpeedReadoutProps {
  speed: number;
  unit?: "km/h" | "mph";
  size?: "md" | "lg" | "xl";
  onToggleUnit?: () => void;
}

const sizeClasses = {
  md: "text-4xl",
  lg: "text-6xl",
  xl: "text-8xl",
};

const SpeedReadout = ({ speed, unit = "km/h", size = "lg", onToggleUnit }: SpeedReadoutProps) => (
  <button onClick={onToggleUnit} className="flex flex-col items-center">
    <span className={`font-mono-data font-bold text-foreground leading-none ${sizeClasses[size]}`}>
      {speed}
    </span>
    <span className="mt-1 text-sm font-medium text-muted-foreground">{unit}</span>
  </button>
);

export default SpeedReadout;
