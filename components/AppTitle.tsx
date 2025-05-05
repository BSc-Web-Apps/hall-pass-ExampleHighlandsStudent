import { View } from "react-native";
import { Text } from "~/components/ui/text";
import { CircleCheck } from "~/lib/icons/CircleCheck";

interface AppTitleProps {
  hasTasks?: boolean;
}
export default function AppTitle({ hasTasks = false }: AppTitleProps) {
  return (
    <View
      className={`flex flex-row justify-center pt-12 transition duration-1000 delay-200 ${
        hasTasks ? "scale-100" : "scale-125"
      }`}
    >
      <Text className={`pt-20 pb-8 text-foreground font-bold text-5xl`}>
        HallPass
      </Text>
      <CircleCheck
        className="pt-40 pb-8 ml-4 text-foreground-transparent"
        size={56}
      />
    </View>
  );
}
