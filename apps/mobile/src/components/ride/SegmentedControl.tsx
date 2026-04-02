import { View, Text, Pressable } from 'react-native';

interface SegmentedControlProps {
  segments: string[];
  active: number;
  onChange: (index: number) => void;
}

export const SegmentedControl = ({ segments, active, onChange }: SegmentedControlProps) => (
  <View className="flex-row rounded-lg bg-surface p-1">
    {segments.map((label, i) => (
      <Pressable
        key={label}
        onPress={() => onChange(i)}
        className={`flex-1 rounded-md py-2 items-center ${
          i === active ? 'bg-primary' : ''
        }`}
      >
        <Text
          className={`text-sm font-semibold ${
            i === active ? 'text-primary-foreground' : 'text-muted-foreground'
          }`}
        >
          {label}
        </Text>
      </Pressable>
    ))}
  </View>
);
