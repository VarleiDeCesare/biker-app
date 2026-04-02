import { useState } from 'react';
import { View, Text, Pressable, TextInput, ScrollView, Modal, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronDown, Check } from 'lucide-react-native';
import { colors } from '@/theme';

const BIKE_TYPES = ['Sport', 'Naked', 'Adventure', 'Cruiser', 'Touring'];

export default function RegisterScreen() {
  const router = useRouter();
  const [bikeType, setBikeType] = useState('');
  const [pickerVisible, setPickerVisible] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView
        className="flex-1 px-6"
        contentContainerStyle={{ paddingTop: 64, paddingBottom: 32 }}
        keyboardShouldPersistTaps="handled"
      >
        <Text className="text-3xl font-extrabold tracking-tight text-foreground">
          Create account
        </Text>
        <Text className="mt-2 text-sm text-muted-foreground">Set up your rider profile</Text>

        <View className="mt-10 gap-4">
          <View>
            <Text className="mb-1.5 text-xs font-medium text-muted-foreground">Name</Text>
            <TextInput
              placeholder="Your name"
              placeholderTextColor={colors.mutedForeground}
              className="h-12 w-full rounded-lg border border-divider bg-surface px-4 text-sm text-foreground"
            />
          </View>
          <View>
            <Text className="mb-1.5 text-xs font-medium text-muted-foreground">Email</Text>
            <TextInput
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="rider@email.com"
              placeholderTextColor={colors.mutedForeground}
              className="h-12 w-full rounded-lg border border-divider bg-surface px-4 text-sm text-foreground"
            />
          </View>
          <View>
            <Text className="mb-1.5 text-xs font-medium text-muted-foreground">Password</Text>
            <TextInput
              secureTextEntry
              placeholder="••••••••"
              placeholderTextColor={colors.mutedForeground}
              className="h-12 w-full rounded-lg border border-divider bg-surface px-4 text-sm text-foreground"
            />
          </View>

          <View className="mt-2 border-t border-divider pt-6">
            <Text className="text-sm font-semibold text-foreground">Rider Profile</Text>
            <Text className="mb-4 text-xs text-muted-foreground">
              Tell us about your riding experience
            </Text>

            <View className="gap-4">
              <View>
                <Text className="mb-1.5 text-xs font-medium text-muted-foreground">
                  Years Riding
                </Text>
                <TextInput
                  keyboardType="numeric"
                  placeholder="e.g. 5"
                  placeholderTextColor={colors.mutedForeground}
                  className="h-12 w-full rounded-lg border border-divider bg-surface px-4 text-sm text-foreground"
                />
              </View>
              <View>
                <Text className="mb-1.5 text-xs font-medium text-muted-foreground">
                  Preferred Bike Type
                </Text>
                <Pressable
                  onPress={() => setPickerVisible(true)}
                  className="h-12 w-full flex-row items-center justify-between rounded-lg border border-divider bg-surface px-4"
                >
                  <Text
                    className={`text-sm ${bikeType ? 'text-foreground' : 'text-muted-foreground'}`}
                  >
                    {bikeType || 'Select type'}
                  </Text>
                  <ChevronDown size={18} color={colors.mutedForeground} />
                </Pressable>
              </View>
            </View>
          </View>

          <Pressable
            onPress={() => router.replace('/(tabs)/dashboard')}
            className="mt-4 h-14 w-full items-center justify-center rounded-xl bg-primary active:opacity-90"
          >
            <Text className="text-base font-bold text-primary-foreground">Create Account</Text>
          </Pressable>
        </View>

        <View className="mt-8 flex-row justify-center">
          <Text className="text-sm text-muted-foreground">Already have an account? </Text>
          <Pressable onPress={() => router.push('/login')}>
            <Text className="text-sm font-semibold text-primary">Sign in</Text>
          </Pressable>
        </View>
      </ScrollView>

      {/* Bike type picker modal */}
      <Modal
        visible={pickerVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setPickerVisible(false)}
      >
        <Pressable
          className="flex-1 bg-black/50"
          onPress={() => setPickerVisible(false)}
        />
        <View className="rounded-t-2xl bg-surface p-4">
          <Text className="mb-4 text-base font-bold text-foreground">Preferred Bike Type</Text>
          <FlatList
            data={BIKE_TYPES}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => {
                  setBikeType(item);
                  setPickerVisible(false);
                }}
                className="flex-row items-center justify-between py-4 border-b border-divider"
              >
                <Text className="text-sm font-medium text-foreground">{item}</Text>
                {bikeType === item && <Check size={16} color={colors.primary} />}
              </Pressable>
            )}
          />
          <View className="h-8" />
        </View>
      </Modal>
    </SafeAreaView>
  );
}
