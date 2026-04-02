import { View, Text, Pressable } from 'react-native';

interface SpeedReadoutProps {
  speed: number;
  unit?: 'km/h' | 'mph';
  size?: 'md' | 'lg' | 'xl';
  onToggleUnit?: () => void;
}

const sizeClasses: Record<string, string> = {
  md: 'text-4xl',
  lg: 'text-6xl',
  xl: 'text-8xl',
};

export const SpeedReadout = ({ speed, unit = 'km/h', size = 'lg', onToggleUnit }: SpeedReadoutProps) => (
  <Pressable onPress={onToggleUnit} className="flex-col items-center">
    <Text className={`font-mono font-bold text-foreground leading-none ${sizeClasses[size]}`}>
      {speed}
    </Text>
    <Text className="mt-1 text-sm font-medium text-muted-foreground">{unit}</Text>
  </Pressable>
);
