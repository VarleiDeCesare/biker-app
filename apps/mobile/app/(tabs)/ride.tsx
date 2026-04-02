import { View, Text, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bike } from 'lucide-react-native';
import { BikeCard } from '@/components/ride/BikeCard';
import { colors } from '@/theme';

const BIKES = [
  { name: 'Ninja ZX-6R', model: 'Kawasaki', year: 2023, km: 15720, selected: true },
  { name: 'MT-07', model: 'Yamaha', year: 2021, km: 8430, selected: false },
];

export default function RideScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 20 }}>
        <View className="px-4 pt-6">
          <Text className="text-xl font-bold tracking-tight text-foreground">Start a Ride</Text>
          <Text className="mt-1 text-sm text-muted-foreground">
            Select your bike and hit the road
          </Text>

          {/* Bike selector - horizontal scroll */}
          <View className="mt-6 -mx-4">
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}
            >
              {BIKES.map((bike) => (
                <View
                  key={bike.name}
                  className={`w-[280px] rounded-xl p-4 border-2 ${
                    bike.selected ? 'border-primary bg-primary/5' : 'border-divider bg-surface'
                  }`}
                >
                  <View className="flex-row items-center gap-3">
                    <View className="h-12 w-12 items-center justify-center rounded-lg bg-surface-raised">
                      <Bike
                        size={22}
                        color={bike.selected ? colors.primary : colors.mutedForeground}
                      />
                    </View>
                    <View>
                      <Text className="text-sm font-bold text-foreground">{bike.name}</Text>
                      <Text className="text-xs text-muted-foreground">
                        {bike.model} · {bike.year}
                      </Text>
                    </View>
                  </View>
                  <View className="mt-3 flex-row items-center justify-between">
                    <Text className="font-mono text-sm text-primary">
                      {bike.km.toLocaleString()} km
                    </Text>
                    {bike.selected && (
                      <Text className="text-[10px] font-semibold uppercase tracking-wider text-primary">
                        Selected
                      </Text>
                    )}
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* Selected bike info */}
          <View className="mt-6 rounded-xl bg-surface p-4">
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-sm font-bold text-foreground">Kawasaki Ninja ZX-6R</Text>
                <Text className="text-xs text-muted-foreground">2023 · Sport</Text>
              </View>
              <View className="items-end">
                <Text className="font-mono text-lg font-bold text-foreground">15,720</Text>
                <Text className="text-[10px] text-muted-foreground">current km</Text>
              </View>
            </View>
          </View>

          {/* Start button */}
          <Pressable
            onPress={() => router.push('/live-tracking')}
            className="mt-8 flex-row h-14 w-full items-center justify-center gap-2 rounded-xl bg-primary active:opacity-90"
          >
            <Text className="text-lg font-bold text-primary-foreground">Start Ride</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
