import { View, Text, Pressable } from 'react-native';

interface SectionHeaderProps {
  title: string;
  action?: { label: string; onClick: () => void };
}

export const SectionHeader = ({ title, action }: SectionHeaderProps) => (
  <View className="flex-row items-center justify-between py-2">
    <Text className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
      {title}
    </Text>
    {action && (
      <Pressable
        onPress={action.onClick}
        className="min-h-[48px] min-w-[48px] items-center justify-center"
      >
        <Text className="text-sm font-semibold text-primary">{action.label}</Text>
      </Pressable>
    )}
  </View>
);
