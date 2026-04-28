import { View, Text, Pressable, ScrollView, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Award, Bell, Ruler, Info, ChevronRight, LogOut, Plus } from 'lucide-react-native';
import { useQuery } from '@tanstack/react-query';
import { StatCard } from '@/components/ride/StatCard';
import { BikeCard } from '@/components/ride/BikeCard';
import { SectionHeader } from '@/components/ride/SectionHeader';
import { colors } from '@/theme';
import { authClient, handleLogout } from '@/lib/auth-client';
import { getRiderStats, getTotalRides } from '@/lib/api';

const ACHIEVEMENTS = [
  { label: 'Century', unlocked: true },
  { label: 'Iron Butt', unlocked: true },
  { label: 'Night Owl', unlocked: false },
  { label: 'Summit', unlocked: false },
];

const SETTINGS = [
  { Icon: Bell, label: 'Notifications', sub: 'Reminders & alerts' },
  { Icon: Ruler, label: 'Units', sub: 'km/h, Liters' },
  { Icon: User, label: 'Edit Profile', sub: '' },
  { Icon: Info, label: 'About', sub: 'v1.0.0' },
];

export default function ProfileScreen() {
  const router = useRouter();
  const { data, isPending } = authClient.useSession();

  //FIXME:
  const { data: stats } = useQuery({ queryKey: ['rider-stats'], queryFn: getRiderStats });
  const { data: ridesData } = useQuery({ queryKey: ['total-rides'], queryFn: getTotalRides });

  if (isPending) {
    return (
      <SafeAreaView className="flex-1 bg-background items-center justify-center">
        <ActivityIndicator color={colors.primary} />
      </SafeAreaView>
    );
  }

  const user = data?.user;

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 20 }}>
        <View className="px-4 pt-6">
          <View className="flex-row items-center gap-4">
            <View className="h-16 w-16 items-center justify-center rounded-full bg-surface-raised">
              <User size={28} color={colors.mutedForeground} />
            </View>
            <View>
              <Text className="text-lg font-bold text-foreground">{user?.name ?? '—'}</Text>
              <Text className="text-sm text-muted-foreground">5 years riding.</Text>
            </View>
          </View>
          <View className="mt-5 flex-row gap-2">
            <StatCard label="Total KM" value={stats ? stats.kmTotal.toLocaleString() : '—'} />
            <StatCard label="Rides" value={ridesData ? ridesData.rides.toLocaleString() : '—'} />
            <StatCard label="Hours" value="312" />
          </View>

          {/* Achievements */}
          <View className="mt-4">
            <SectionHeader title="Achievements" />
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 8, paddingBottom: 8 }}
            >
              {ACHIEVEMENTS.map((badge) => (
                <View
                  key={badge.label}
                  className={`w-20 items-center justify-center rounded-lg p-3 ${
                    badge.unlocked ? 'bg-primary/10' : 'bg-surface'
                  }`}
                >
                  <Award
                    size={24}
                    color={badge.unlocked ? colors.primary : `${colors.mutedForeground}4D`}
                  />
                  <Text
                    className={`mt-1.5 text-[10px] font-semibold ${
                      badge.unlocked ? 'text-primary' : 'text-muted-foreground/40'
                    }`}
                  >
                    {badge.label}
                  </Text>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* My Bikes */}
          <View className="mt-4">
            <SectionHeader title="My Bikes" action={{ label: '+ Add', onClick: () => {} }} />
            <View className="gap-2">
              <BikeCard
                name="Ninja ZX-6R"
                model="Kawasaki"
                year={2023}
                currentKm={15720}
                onTap={() => router.push('/bike-detail')}
              />
              <BikeCard
                name="MT-07"
                model="Yamaha"
                year={2021}
                currentKm={8430}
                onTap={() => router.push('/bike-detail')}
              />
            </View>
          </View>
          <View className="mt-6">
            <SectionHeader title="Settings" />
            <View className="rounded-lg bg-surface">
              {SETTINGS.map(({ Icon, label, sub }, i) => (
                <Pressable
                  key={label}
                  className={`flex-row w-full items-center gap-3 px-4 py-3.5 ${
                    i < SETTINGS.length - 1 ? 'border-b border-divider' : ''
                  }`}
                >
                  <Icon size={18} color={colors.mutedForeground} />
                  <View className="flex-1">
                    <Text className="text-sm font-medium text-foreground">{label}</Text>
                    {sub ? <Text className="text-xs text-muted-foreground">{sub}</Text> : null}
                  </View>
                  <ChevronRight size={16} color={colors.mutedForeground} />
                </Pressable>
              ))}
            </View>
          </View>

          <Pressable
            onPress={async () => await handleLogout('/login')}
            className="mt-4 flex-row h-12 w-full items-center justify-center gap-2 rounded-lg"
          >
            <LogOut size={16} color={colors.destructive} />
            <Text className="text-sm font-semibold text-destructive">Sign Out</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
