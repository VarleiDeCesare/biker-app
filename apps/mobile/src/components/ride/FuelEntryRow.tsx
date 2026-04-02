import { View, Text } from 'react-native';
import { Fuel } from 'lucide-react-native';
import { colors } from '@/theme';

interface FuelEntryRowProps {
  date: string;
  liters: number;
  pricePerLiter: number;
  kmAtFueling: number;
}

export const FuelEntryRow = ({ date, liters, pricePerLiter, kmAtFueling }: FuelEntryRowProps) => (
  <View className="flex-row items-center gap-3 border-b border-divider py-3">
    <View className="h-9 w-9 items-center justify-center rounded-lg bg-surface-raised">
      <Fuel size={16} color={colors.primarySoft} />
    </View>
    <View className="flex-1">
      <Text className="text-sm font-medium text-foreground">{date}</Text>
      <Text className="text-xs text-muted-foreground">
        {liters}L · ${pricePerLiter.toFixed(2)}/L · {kmAtFueling.toLocaleString()} km
      </Text>
    </View>
    <Text className="font-mono text-sm font-semibold text-foreground">
      ${(liters * pricePerLiter).toFixed(2)}
    </Text>
  </View>
);
