interface SegmentedControlProps {
  segments: string[];
  active: number;
  onChange: (index: number) => void;
}

const SegmentedControl = ({ segments, active, onChange }: SegmentedControlProps) => (
  <div className="flex rounded-lg bg-surface p-1">
    {segments.map((label, i) => (
      <button
        key={label}
        onClick={() => onChange(i)}
        className={`flex-1 rounded-md py-2 text-sm font-semibold transition-colors ${
          i === active
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground"
        }`}
      >
        {label}
      </button>
    ))}
  </div>
);

export default SegmentedControl;
