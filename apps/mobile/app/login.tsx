import { View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { handleGoogleLogin } from '../src/lib/auth-client';

export default function LoginScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 items-center justify-center px-6 gap-8">
        <View className="items-center gap-2">
          <Text className="text-3xl font-extrabold tracking-tight text-foreground">
            Welcome to RIDE
          </Text>
          <Text className="text-sm text-muted-foreground">Sign in to continue</Text>
        </View>

        <Pressable
          className="h-14 w-full flex-row items-center justify-center gap-3 rounded-xl border border-foreground/20 bg-surface active:opacity-80"
          onPress={handleGoogleLogin}
        >
          <Text className="text-base font-semibold text-foreground">Sign in with Google</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
