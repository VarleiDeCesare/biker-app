interface StatusBadgeProps {
  status: "ok" | "due-soon" | "overdue";
}

const styles = {
  ok: "bg-success/15 text-success",
  "due-soon": "bg-warning/15 text-warning",
  overdue: "bg-destructive/15 text-destructive",
};

const labels = {
  ok: "OK",
  "due-soon": "Due soon",
  overdue: "Overdue",
};

const StatusBadge = ({ status }: StatusBadgeProps) => (
  <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${styles[status]}`}>
    {labels[status]}
  </span>
);

export default StatusBadge;
