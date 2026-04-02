import { View, Text, Pressable } from 'react-native';
import { ChevronRight, Bike } from 'lucide-react-native';
import { colors } from '@/theme';

interface BikeCardProps {
  name: string;
  model: string;
  year: number;
  currentKm: number;
  onTap?: () => void;
}

export const BikeCard = ({ name, model, year, currentKm, onTap }: BikeCardProps) => (
  <Pressable
    onPress={onTap}
    className="flex-row w-full items-center gap-3 rounded-lg bg-surface p-3 active:bg-surface-raised"
  >
    <View className="h-14 w-14 flex-shrink-0 items-center justify-center rounded-lg bg-surface-raised">
      <Bike size={24} color={colors.primary} />
    </View>
    <View className="flex-1">
      <Text className="text-sm font-bold text-foreground">{name}</Text>
      <Text className="text-xs text-muted-foreground">
        {model} · {year}
      </Text>
      <Text className="font-mono text-xs text-primary">{currentKm.toLocaleString()} km</Text>
    </View>
    <ChevronRight size={18} color={colors.mutedForeground} />
  </Pressable>
);
