import { View, Text, Pressable } from 'react-native';
import { AlertTriangle, AlertCircle, Info } from 'lucide-react-native';
import { colors } from '@/theme';

interface AlertBannerProps {
  message: string;
  variant?: 'warning' | 'danger' | 'info';
  onTap?: () => void;
}

const config = {
  warning: {
    Icon: AlertTriangle,
    bg: 'bg-primary/10',
    border: 'border-primary/30',
    text: 'text-primary-soft',
    iconColor: colors.primarySoft,
  },
  danger: {
    Icon: AlertCircle,
    bg: 'bg-destructive/10',
    border: 'border-destructive/30',
    text: 'text-destructive',
    iconColor: colors.destructive,
  },
  info: {
    Icon: Info,
    bg: 'bg-surface',
    border: 'border-divider',
    text: 'text-muted-foreground',
    iconColor: colors.mutedForeground,
  },
};

export const AlertBanner = ({ message, variant = 'warning', onTap }: AlertBannerProps) => {
  const { Icon, bg, border, text, iconColor } = config[variant];
  return (
    <Pressable
      onPress={onTap}
      className={`flex-row w-full items-center gap-3 rounded-lg border ${border} ${bg} px-4 py-3`}
    >
      <Icon size={18} color={iconColor} />
      <Text className={`text-sm font-medium ${text}`}>{message}</Text>
    </Pressable>
  );
};
