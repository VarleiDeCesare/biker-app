import { View, Text, Pressable } from 'react-native';
import { MapPin, Clock, Gauge } from 'lucide-react-native';
import { colors } from '@/theme';

interface TripCardProps {
  date: string;
  bikeName: string;
  distance: string;
  duration: string;
  maxSpeed: string;
  onTap?: () => void;
}

export const TripCard = ({ date, bikeName, distance, duration, maxSpeed, onTap }: TripCardProps) => (
  <Pressable
    onPress={onTap}
    className="flex-row w-full gap-3 rounded-lg bg-surface p-3 active:bg-surface-raised"
  >
    <View className="h-16 w-16 flex-shrink-0 rounded-md bg-surface-raised items-center justify-center">
      <MapPin size={20} color={`${colors.primary}66`} />
    </View>
    <View className="flex-1 justify-between">
      <View>
        <Text className="text-sm font-semibold text-foreground">{date}</Text>
        <Text className="text-xs text-muted-foreground">{bikeName}</Text>
      </View>
      <View className="flex-row gap-3">
        <View className="flex-row items-center gap-1">
          <MapPin size={12} color={colors.mutedForeground} />
          <Text className="font-mono text-xs text-foreground">{distance}</Text>
        </View>
        <View className="flex-row items-center gap-1">
          <Clock size={12} color={colors.mutedForeground} />
          <Text className="font-mono text-xs text-foreground">{duration}</Text>
        </View>
        <View className="flex-row items-center gap-1">
          <Gauge size={12} color={colors.mutedForeground} />
          <Text className="font-mono text-xs text-primary">{maxSpeed}</Text>
        </View>
      </View>
    </View>
  </Pressable>
);
