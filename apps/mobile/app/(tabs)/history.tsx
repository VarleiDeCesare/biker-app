import { View, Text, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Filter } from 'lucide-react-native';
import { TripCard } from '@/components/ride/TripCard';
import { SectionHeader } from '@/components/ride/SectionHeader';
import { colors } from '@/theme';

const TRIPS = [
  { date: 'Mar 28, 2026', bike: 'Ninja ZX-6R', dist: '47.3 km', dur: '1h 12m', max: '138 km/h' },
  { date: 'Mar 25, 2026', bike: 'Ninja ZX-6R', dist: '23.1 km', dur: '0h 34m', max: '95 km/h' },
  { date: 'Mar 22, 2026', bike: 'MT-07', dist: '112.7 km', dur: '2h 45m', max: '162 km/h' },
  { date: 'Mar 18, 2026', bike: 'Ninja ZX-6R', dist: '15.8 km', dur: '0h 22m', max: '78 km/h' },
  { date: 'Mar 14, 2026', bike: 'MT-07', dist: '89.4 km', dur: '1h 55m', max: '144 km/h' },
];

const FILTERS = ['All Bikes', 'This Month', 'Ninja ZX-6R', 'MT-07'];

export default function HistoryScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 20 }}>
        <View className="px-4 pt-6">
          <View className="flex-row items-center justify-between">
            <Text className="text-xl font-bold tracking-tight text-foreground">Ride History</Text>
            <Pressable className="h-[48px] w-[48px] items-center justify-center">
              <Filter size={20} color={colors.mutedForeground} />
            </Pressable>
          </View>

          {/* Filters */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 8, paddingBottom: 8, marginTop: 16 }}
          >
            {FILTERS.map((f, i) => (
              <Pressable
                key={f}
                className={`rounded-full px-4 py-2 ${
                  i === 0 ? 'bg-primary' : 'bg-surface'
                }`}
              >
                <Text
                  className={`text-xs font-semibold ${
                    i === 0 ? 'text-primary-foreground' : 'text-muted-foreground'
                  }`}
                >
                  {f}
                </Text>
              </Pressable>
            ))}
          </ScrollView>

          {/* Trip list */}
          <View className="mt-4 gap-2">
            {TRIPS.map((t, i) => (
              <TripCard
                key={i}
                date={t.date}
                bikeName={t.bike}
                distance={t.dist}
                duration={t.dur}
                maxSpeed={t.max}
                onTap={() => router.push('/trip-detail')}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
