import { useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, Bike } from 'lucide-react-native';
import { StatCard } from '@/components/ride/StatCard';
import { SegmentedControl } from '@/components/ride/SegmentedControl';
import { MaintenanceRow } from '@/components/ride/MaintenanceRow';
import { FuelEntryRow } from '@/components/ride/FuelEntryRow';
import { SectionHeader } from '@/components/ride/SectionHeader';
import { colors } from '@/theme';

export default function BikeDetailScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [tab, setTab] = useState(0);

  return (
    <View className="flex-1 bg-background">
      {/* Hero */}
      <View className="relative h-48 bg-surface-raised items-center justify-center">
        <Bike size={64} color={`${colors.primary}33`} />
        <View className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
        <Pressable
          onPress={() => router.back()}
          className="absolute left-4 flex h-10 w-10 items-center justify-center rounded-full bg-background/80"
          style={{ top: insets.top + 8 }}
        >
          <ArrowLeft size={18} color={colors.foreground} />
        </Pressable>
        <View className="absolute bottom-3 left-4">
          <Text className="text-xl font-bold text-foreground">Ninja ZX-6R</Text>
          <Text className="text-xs text-muted-foreground">Kawasaki · 2023</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 32 }}>
        <View className="px-4 pt-4">
          {/* Quick stats */}
          <View className="flex-row gap-2">
            <StatCard label="Total KM" value="15,720" />
            <StatCard label="Rides" value="87" />
            <StatCard label="Last Ride" value="Mar 28" />
          </View>

          {/* Tabs */}
          <View className="mt-5">
            <SegmentedControl
              segments={['Maintenance', 'Fuel']}
              active={tab}
              onChange={setTab}
            />
          </View>

          {tab === 0 && (
            <View className="mt-4">
              <View className="rounded-lg bg-surface p-3">
                <MaintenanceRow name="Oil Change" lastDone="12,400 km · Jan 15" nextDue="15,400 km" status="overdue" />
                <MaintenanceRow name="Tires" lastDone="10,000 km · Nov 20" nextDue="20,000 km" status="ok" />
                <MaintenanceRow name="Brakes" lastDone="10,000 km · Nov 20" nextDue="20,000 km" status="ok" />
                <MaintenanceRow name="Chain" lastDone="14,800 km · Mar 1" nextDue="15,800 km" status="due-soon" />
                <MaintenanceRow name="Air Filter" lastDone="8,000 km · Aug 10" nextDue="16,000 km" status="ok" />
                <MaintenanceRow name="Brake Fluid" lastDone="5,000 km · Apr 5" nextDue="15,000 km" status="overdue" />
              </View>
              <Pressable className="mt-4 h-12 w-full items-center justify-center rounded-lg border border-primary active:bg-primary/10">
                <Text className="text-sm font-bold text-primary">Log Service</Text>
              </Pressable>
            </View>
          )}

          {tab === 1 && (
            <View className="mt-4">
              <View className="flex-row gap-2">
                <StatCard label="Avg Consumption" value="18.2" unit="km/l" variant="primary" />
                <StatCard label="This Month" value="$87" />
              </View>

              <View className="mt-4 rounded-lg bg-surface p-3">
                <FuelEntryRow date="Mar 26" liters={12.5} pricePerLiter={1.45} kmAtFueling={15720} />
                <FuelEntryRow date="Mar 18" liters={11.8} pricePerLiter={1.42} kmAtFueling={15480} />
                <FuelEntryRow date="Mar 10" liters={13.2} pricePerLiter={1.48} kmAtFueling={15200} />
              </View>

              <Pressable className="mt-4 h-12 w-full items-center justify-center rounded-lg bg-primary active:opacity-90">
                <Text className="text-sm font-bold text-primary-foreground">Add Fuel Entry</Text>
              </Pressable>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
