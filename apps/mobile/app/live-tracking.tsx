import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path, Circle, Line } from 'react-native-svg';
import { Square, MapPin } from 'lucide-react-native';
import { SpeedReadout } from '@/components/ride/SpeedReadout';
import { colors } from '@/theme';

export default function LiveTrackingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [unit, setUnit] = useState<'km/h' | 'mph'>('km/h');

  return (
    <View className="flex-1 bg-background">
      {/* Map area */}
      <View className="relative flex-1">
        <View className="absolute inset-0 bg-[#0a0a0a]">
          {/* Grid lines simulation */}
          <Svg style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} width="100%" height="100%">
            {Array.from({ length: 10 }).map((_, i) => (
              <Line
                key={`h-${i}`}
                x1="0"
                y1={`${i * 10}%`}
                x2="100%"
                y2={`${i * 10}%`}
                stroke={colors.foreground}
                strokeWidth={0.3}
                opacity={0.05}
              />
            ))}
            {Array.from({ length: 7 }).map((_, i) => (
              <Line
                key={`v-${i}`}
                x1={`${i * 16.66}%`}
                y1="0"
                x2={`${i * 16.66}%`}
                y2="100%"
                stroke={colors.foreground}
                strokeWidth={0.3}
                opacity={0.05}
              />
            ))}
          </Svg>

          {/* Route polyline */}
          <Svg
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
            viewBox="0 0 390 500"
          >
            <Path
              d="M80 400 C120 350, 160 300, 200 280 S280 200, 300 150 S320 100, 330 80"
              stroke={colors.primary}
              strokeWidth={4}
              strokeLinecap="round"
              fill="none"
              opacity={0.9}
            />
            <Circle cx={330} cy={80} r={6} fill={colors.primary} />
          </Svg>

          {/* Current location dot */}
          <View
            className="absolute items-center justify-center"
            style={{ right: 64, top: 80 }}
          >
            <View className="h-4 w-4 rounded-full bg-primary" />
            <View
              className="absolute h-8 w-8 rounded-full bg-primary/20"
            />
          </View>
        </View>

        {/* Top bar */}
        <View
          className="absolute left-0 right-0 top-0 flex-row items-center justify-between px-4"
          style={{ paddingTop: insets.top + 16 }}
        >
          <View className="rounded-lg bg-background/80 px-3 py-2">
            <Text className="text-xs font-semibold text-foreground">Ninja ZX-6R</Text>
          </View>
          <Pressable
            onPress={() => router.replace('/trip-summary')}
            className="h-12 w-12 items-center justify-center rounded-full bg-destructive active:opacity-90"
          >
            <Square size={18} color={colors.destructiveForeground} fill={colors.destructiveForeground} />
          </Pressable>
        </View>
      </View>

      {/* Bottom overlay */}
      <View
        className="bg-background px-6 pt-6"
        style={{ paddingBottom: insets.bottom + 24 }}
      >
        <View className="items-center">
          <SpeedReadout
            speed={87}
            unit={unit}
            size="xl"
            onToggleUnit={() => setUnit((u) => (u === 'km/h' ? 'mph' : 'km/h'))}
          />

          <View className="mt-6 w-full flex-row justify-around">
            <View className="items-center">
              <Text className="font-mono text-2xl font-bold text-foreground">23:47</Text>
              <Text className="mt-0.5 text-[11px] text-muted-foreground">Duration</Text>
            </View>
            <View className="h-10 w-px bg-divider" />
            <View className="items-center">
              <Text className="font-mono text-2xl font-bold text-primary">18.4</Text>
              <Text className="mt-0.5 text-[11px] text-muted-foreground">km</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
