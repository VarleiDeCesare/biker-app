import { View, Text } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { StatusBadge } from './StatusBadge';
import { colors } from '@/theme';

interface MaintenanceRowProps {
  name: string;
  lastDone: string;
  nextDue: string;
  status: 'ok' | 'due-soon' | 'overdue';
}

export const MaintenanceRow = ({ name, lastDone, nextDue, status }: MaintenanceRowProps) => (
  <View className="flex-row items-center justify-between border-b border-divider py-3 last:border-b-0">
    <View className="flex-1">
      <Text className="text-sm font-semibold text-foreground">{name}</Text>
      <Text className="mt-0.5 text-xs text-muted-foreground">
        Last: {lastDone} · Next: {nextDue}
      </Text>
    </View>
    <View className="flex-row items-center gap-2">
      <StatusBadge status={status} />
      <ChevronRight size={16} color={colors.mutedForeground} />
    </View>
  </View>
);
