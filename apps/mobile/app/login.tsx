import { useState } from 'react';
import { View, Text, Pressable, TextInput, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Eye, EyeOff } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/theme';
import { handleGoogleLogin } from '../src/lib/auth-client';

export default function LoginScreen() {
  const router = useRouter();
  const [showPw, setShowPw] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView
        className="flex-1 px-6"
        contentContainerStyle={{ paddingTop: 64, paddingBottom: 32 }}
        keyboardShouldPersistTaps="handled"
      >
        <Text className="text-3xl font-extrabold tracking-tight text-foreground">
          Welcome back
        </Text>
        <Text className="mt-2 text-sm text-muted-foreground">Sign in to your RIDE account</Text>

        <View className="mt-10 gap-4">
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
            <View className="relative">
              <TextInput
                secureTextEntry={!showPw}
                placeholder="••••••••"
                placeholderTextColor={colors.mutedForeground}
                className="h-12 w-full rounded-lg border border-divider bg-surface px-4 pr-12 text-sm text-foreground"
              />
              <Pressable
                onPress={() => setShowPw(!showPw)}
                className="absolute right-0 top-0 h-12 w-12 items-center justify-center"
              >
                {showPw
                  ? <EyeOff size={18} color={colors.mutedForeground} />
                  : <Eye size={18} color={colors.mutedForeground} />}
              </Pressable>
            </View>
          </View>

          <Pressable
            onPress={() => router.replace('/(tabs)/dashboard')}
            className="mt-2 h-14 w-full items-center justify-center rounded-xl bg-primary active:opacity-90"
          >
            <Text className="text-base font-bold text-primary-foreground">Sign In</Text>
          </Pressable>

          <View className="relative my-4 flex-row items-center">
            <View className="flex-1 border-t border-divider" />
            <Text className="px-4 text-xs text-muted-foreground">or</Text>
            <View className="flex-1 border-t border-divider" />
          </View>

          <Pressable
            className="h-12 w-full flex-row items-center justify-center gap-2 rounded-lg border border-foreground/20 active:bg-surface"
            onPress={handleGoogleLogin}
          >
            <Text className="text-sm font-semibold text-foreground">Sign in with Google</Text>
          </Pressable>
          <Pressable className="h-12 w-full flex-row items-center justify-center gap-2 rounded-lg border border-foreground/20 active:bg-surface">
            <Text className="text-sm font-semibold text-foreground">Sign in with Apple</Text>
          </Pressable>
        </View>

        <View className="mt-8 flex-row justify-center">
          <Text className="text-sm text-muted-foreground">Don't have an account? </Text>
          <Pressable onPress={() => router.push('/register')}>
            <Text className="text-sm font-semibold text-primary">Register</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
