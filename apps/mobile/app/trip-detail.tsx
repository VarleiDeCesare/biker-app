import { View, Text, Pressable, ScrollView, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { ArrowLeft, Share2 } from 'lucide-react-native';
import { StatCard } from '@/components/ride/StatCard';
import { SimpleLineChart } from '@/components/charts/SimpleLineChart';
import { colors } from '@/theme';

const speedData = Array.from({ length: 30 }, (_, i) => ({
  x: i * 2,
  y: Math.floor(40 + Math.sin(i / 3) * 40 + (i / 30) * 60),
}));

const elevationData = Array.from({ length: 30 }, (_, i) => ({
  x: parseFloat((i * 1.6).toFixed(1)),
  y: Math.floor(100 + Math.sin(i / 4) * 80 + i * 5),
}));

export default function TripDetailScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  return (
    <View className="flex-1 bg-background">
      {/* Map */}
      <View className="relative h-52 bg-[#0a0a0a]">
        <Svg
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
          viewBox="0 0 390 208"
        >
          <Path
            d="M30 170 C70 140, 130 80, 200 70 S280 50, 340 35"
            stroke={colors.primary}
            strokeWidth={3}
            strokeLinecap="round"
            fill="none"
          />
        </Svg>

        {/* Top bar */}
        <View
          className="absolute left-0 right-0 flex-row items-center justify-between px-4"
          style={{ top: insets.top + 8 }}
        >
          <Pressable
            onPress={() => router.back()}
            className="h-10 w-10 items-center justify-center rounded-full bg-background/80"
          >
            <ArrowLeft size={18} color={colors.foreground} />
          </Pressable>
          <Pressable className="h-10 w-10 items-center justify-center rounded-full bg-background/80">
            <Share2 size={18} color={colors.foreground} />
          </Pressable>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 32 }}>
        <View className="px-4 pt-5">
          <Text className="text-lg font-bold text-foreground">Mar 28, 2026</Text>
          <Text className="text-xs text-muted-foreground">Ninja ZX-6R · 1h 12m</Text>

          {/* Stats */}
          <View className="mt-4 flex-row gap-2">
            <StatCard label="Distance" value="47.3" unit="km" />
            <StatCard label="Avg Speed" value="65" unit="km/h" />
            <StatCard label="Max Speed" value="138" unit="km/h" variant="primary" />
          </View>
          <View className="mt-2 flex-row gap-2">
            <StatCard label="Duration" value="1:12" unit="h" />
            <StatCard label="Elevation" value="342" unit="m" />
          </View>

          {/* Speed Chart */}
          <View className="mt-6">
            <Text className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Speed over Time
            </Text>
            <View className="h-36 rounded-lg bg-surface p-3 overflow-hidden">
              <SimpleLineChart
                data={speedData}
                width={width - 56}
                height={108}
                color={colors.primary}
              />
            </View>
          </View>

          {/* Elevation Chart */}
          <View className="mt-5">
            <Text className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Elevation Profile
            </Text>
            <View className="h-36 rounded-lg bg-surface p-3 overflow-hidden">
              <SimpleLineChart
                data={elevationData}
                width={width - 56}
                height={108}
                color={colors.primarySoft}
                filled
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
