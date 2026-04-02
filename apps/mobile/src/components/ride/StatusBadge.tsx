import { View, Text } from 'react-native';

interface StatusBadgeProps {
  status: 'ok' | 'due-soon' | 'overdue';
}

const styles: Record<string, string> = {
  ok: 'bg-success/15',
  'due-soon': 'bg-warning/15',
  overdue: 'bg-destructive/15',
};

const textStyles: Record<string, string> = {
  ok: 'text-success',
  'due-soon': 'text-warning',
  overdue: 'text-destructive',
};

const labels: Record<string, string> = {
  ok: 'OK',
  'due-soon': 'Due soon',
  overdue: 'Overdue',
};

export const StatusBadge = ({ status }: StatusBadgeProps) => (
  <View className={`rounded-full px-2.5 py-0.5 ${styles[status]}`}>
    <Text className={`text-[11px] font-semibold ${textStyles[status]}`}>
      {labels[status]}
    </Text>
  </View>
);
