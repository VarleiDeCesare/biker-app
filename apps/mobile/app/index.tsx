import { useState, useRef } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { ChevronRight, Route, Gauge, Wrench } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { APP_NAME } from '@biker-app/shared';
import { colors } from '@/theme';

const slides = [
  {
    Icon: Route,
    title: 'Track Every Ride',
    description: 'GPS-powered ride tracking with live speed, distance and route mapping.',
  },
  {
    Icon: Gauge,
    title: 'Performance Data',
    description: 'Detailed stats for every trip — speed, elevation, fuel economy and more.',
  },
  {
    Icon: Wrench,
    title: 'Maintenance on Point',
    description: 'Never miss an oil change or service interval. Your bike stays road-ready.',
  },
];

export default function OnboardingScreen() {
  const [step, setStep] = useState(0);
  const router = useRouter();
  const opacity = useSharedValue(1);

  const goTo = (nextStep: number) => {
    opacity.value = withTiming(0, { duration: 150 }, () => {
      runOnJS(setStep)(nextStep);
      opacity.value = withTiming(1, { duration: 150 });
    });
  };

  const next = () => {
    if (step < slides.length - 1) {
      goTo(step + 1);
    } else {
      router.push('/login');
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));
  const { Icon, title, description } = slides[step];

  return (
    <SafeAreaView className="flex-1 bg-background px-6">
      {/* Logo */}
      <View className="flex-row items-center justify-between pt-8 pb-8">
        <Text className="text-2xl font-extrabold tracking-tight text-foreground">
          {APP_NAME}
          <Text className="text-primary">.</Text>
        </Text>
        {step < slides.length - 1 && (
          <Pressable onPress={() => router.push('/login')} className="min-h-[48px] justify-center">
            <Text className="text-sm font-medium text-muted-foreground">Skip</Text>
          </Pressable>
        )}
      </View>

      {/* Slide content */}
      <View className="flex-1 items-center justify-center">
        <Animated.View style={animatedStyle} className="items-center text-center">
          <View className="mb-8 h-24 w-24 items-center justify-center rounded-2xl bg-primary/10">
            <Icon size={40} color={colors.primary} />
          </View>
          <Text className="text-2xl font-bold tracking-tight text-foreground text-center">
            {title}
          </Text>
          <Text className="mt-3 max-w-[280px] text-sm leading-relaxed text-muted-foreground text-center">
            {description}
          </Text>
        </Animated.View>
      </View>

      {/* Dots & CTA */}
      <View className="pb-12">
        <View className="mb-6 flex-row justify-center gap-2">
          {slides.map((_, i) => (
            <View
              key={i}
              className={`h-1.5 rounded-full ${i === step ? 'w-6 bg-primary' : 'w-1.5 bg-muted'}`}
            />
          ))}
        </View>
        <Pressable
          onPress={next}
          className="flex-row h-14 w-full items-center justify-center rounded-xl bg-primary active:opacity-90"
        >
          <Text className="text-base font-bold text-primary-foreground">
            {step === slides.length - 1 ? 'Get Started' : 'Next'}
          </Text>
          <ChevronRight size={18} color={colors.primaryForeground} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
