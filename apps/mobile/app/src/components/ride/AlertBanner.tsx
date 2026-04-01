import { AlertTriangle, AlertCircle, Info } from "lucide-react";

interface AlertBannerProps {
  message: string;
  variant?: "warning" | "danger" | "info";
  onTap?: () => void;
}

const config = {
  warning: { icon: AlertTriangle, bg: "bg-primary/10", border: "border-primary/30", text: "text-primary-soft" },
  danger: { icon: AlertCircle, bg: "bg-destructive/10", border: "border-destructive/30", text: "text-destructive" },
  info: { icon: Info, bg: "bg-surface", border: "border-divider", text: "text-muted-foreground" },
};

const AlertBanner = ({ message, variant = "warning", onTap }: AlertBannerProps) => {
  const { icon: Icon, bg, border, text } = config[variant];
  return (
    <button
      onClick={onTap}
      className={`flex w-full items-center gap-3 rounded-lg border ${border} ${bg} px-4 py-3 text-left`}
    >
      <Icon size={18} className={text} />
      <span className={`text-sm font-medium ${text}`}>{message}</span>
    </button>
  );
};

export default AlertBanner;
