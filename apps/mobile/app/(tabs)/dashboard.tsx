import { View, Text, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Play } from 'lucide-react-native';
import { StatCard } from '@/components/ride/StatCard';
import { AlertBanner } from '@/components/ride/AlertBanner';
import { TripCard } from '@/components/ride/TripCard';
import { SectionHeader } from '@/components/ride/SectionHeader';
import { MaintenanceRow } from '@/components/ride/MaintenanceRow';
import { colors } from '@/theme';

export default function DashboardScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 20 }}>
        <View className="px-4 pt-6">
          {/* Greeting */}
          <View className="mb-1">
            <Text className="text-sm text-muted-foreground">Good morning</Text>
            <Text className="text-xl font-bold tracking-tight text-foreground">
              Ninja ZX-6R <Text className="text-primary">·</Text>
            </Text>
          </View>

          {/* Alert */}
          <View className="mt-4">
            <AlertBanner
              message="Oil change overdue — 320 km ago"
              variant="warning"
            />
          </View>

          {/* Quick Stats */}
          <View className="mt-5 flex-row gap-2">
            <StatCard label="This Month" value="1,247" unit="km" />
            <StatCard label="Rides" value="18" />
            <StatCard label="Best" value="162" unit="km/h" variant="primary" />
          </View>

          {/* Start Ride CTA */}
          <Pressable
            onPress={() => router.push('/live-tracking')}
            className="mt-5 flex-row h-14 w-full items-center justify-center gap-2 rounded-xl bg-primary active:opacity-90"
          >
            <Play size={18} color={colors.primaryForeground} fill={colors.primaryForeground} />
            <Text className="text-base font-bold text-primary-foreground">Start a Ride</Text>
          </Pressable>

          {/* Recent Activity */}
          <SectionHeader
            title="Recent Activity"
            action={{ label: 'See all', onClick: () => router.push('/(tabs)/history') }}
          />
          <TripCard
            date="Mar 28, 2026"
            bikeName="Ninja ZX-6R"
            distance="47.3 km"
            duration="1h 12m"
            maxSpeed="138 km/h"
            onTap={() => router.push('/trip-detail')}
          />

          {/* Maintenance */}
          <View className="mt-4">
            <SectionHeader title="Maintenance" action={{ label: 'View all', onClick: () => {} }} />
            <View className="rounded-lg bg-surface p-3">
              <MaintenanceRow
                name="Oil Change"
                lastDone="12,400 km · Jan 15"
                nextDue="15,400 km"
                status="overdue"
              />
              <MaintenanceRow
                name="Chain Adjustment"
                lastDone="14,800 km · Mar 1"
                nextDue="15,800 km"
                status="due-soon"
              />
              <MaintenanceRow
                name="Brake Pads"
                lastDone="10,000 km · Nov 20"
                nextDue="20,000 km"
                status="ok"
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
