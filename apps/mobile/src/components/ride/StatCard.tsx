import { View, Text } from 'react-native';

interface StatCardProps {
  label: string;
  value: string | number;
  unit?: string;
  variant?: 'default' | 'primary';
}

export const StatCard = ({ label, value, unit, variant = 'default' }: StatCardProps) => (
  <View className="flex-1 flex-col items-center rounded-lg bg-surface p-3">
    <Text className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
      {label}
    </Text>
    <View className="mt-1 flex-row items-baseline gap-1">
      <Text
        className={`font-mono text-xl font-bold ${
          variant === 'primary' ? 'text-primary' : 'text-foreground'
        }`}
      >
        {value}
      </Text>
      {unit && (
        <Text className="text-[11px] font-medium text-muted-foreground">{unit}</Text>
      )}
    </View>
  </View>
);
