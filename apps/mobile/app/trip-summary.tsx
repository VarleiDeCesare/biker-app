import { View, Text, Pressable, ScrollView, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path, Line } from 'react-native-svg';
import { X, Check } from 'lucide-react-native';
import { StatCard } from '@/components/ride/StatCard';
import { SimpleLineChart } from '@/components/charts/SimpleLineChart';
import { colors } from '@/theme';

const speedData = Array.from({ length: 30 }, (_, i) => ({
  x: i * 2,
  y: Math.floor(40 + Math.sin(i / 3) * 40 + (i / 30) * 60),
}));

export default function TripSummaryScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  return (
    <View className="flex-1 bg-background">
      {/* Map snapshot */}
      <View className="relative h-52 bg-[#0a0a0a]">
        <Svg
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
          viewBox="0 0 390 208"
        >
          <Path
            d="M40 180 C80 150, 120 100, 180 90 S260 60, 300 50 S350 30, 370 25"
            stroke={colors.primary}
            strokeWidth={3}
            strokeLinecap="round"
            fill="none"
          />
        </Svg>
        <View
          className="absolute left-4"
          style={{ top: insets.top + 12 }}
        >
          <Text className="text-lg font-bold text-foreground">Ride Complete</Text>
          <Text className="text-xs text-muted-foreground">Mar 28, 2026 · Ninja ZX-6R</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 32 }}>
        <View className="px-4 pt-5">
          {/* Stats grid */}
          <View className="flex-row gap-2">
            <StatCard label="Distance" value="47.3" unit="km" />
            <StatCard label="Duration" value="1:12" unit="h" />
            <StatCard label="Avg Speed" value="65" unit="km/h" />
          </View>
          <View className="mt-2 flex-row gap-2">
            <StatCard label="Max Speed" value="138" unit="km/h" variant="primary" />
            <StatCard label="Elevation" value="342" unit="m" />
          </View>

          {/* Speed chart */}
          <View className="mt-6">
            <Text className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Speed over Time
            </Text>
            <View className="h-40 rounded-lg bg-surface p-3 overflow-hidden">
              <SimpleLineChart
                data={speedData}
                width={width - 56}
                height={128}
                color={colors.primary}
              />
            </View>
          </View>

          {/* Actions */}
          <View className="mt-6 flex-row gap-3">
            <Pressable
              onPress={() => router.replace('/(tabs)/history')}
              className="flex-row h-14 flex-1 items-center justify-center gap-2 rounded-xl border border-foreground/20 active:bg-surface"
            >
              <X size={18} color={colors.foreground} />
              <Text className="text-sm font-bold text-foreground">Discard</Text>
            </Pressable>
            <Pressable
              onPress={() => router.replace('/(tabs)/history')}
              className="flex-row h-14 flex-1 items-center justify-center gap-2 rounded-xl bg-primary active:opacity-90"
            >
              <Check size={18} color={colors.primaryForeground} />
              <Text className="text-sm font-bold text-primary-foreground">Save Ride</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
