interface SectionHeaderProps {
  title: string;
  action?: { label: string; onClick: () => void };
}

const SectionHeader = ({ title, action }: SectionHeaderProps) => (
  <div className="flex items-center justify-between py-2">
    <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">{title}</h3>
    {action && (
      <button
        onClick={action.onClick}
        className="min-h-[48px] min-w-[48px] flex items-center justify-center text-sm font-semibold text-primary"
      >
        {action.label}
      </button>
    )}
  </div>
);

export default SectionHeader;
