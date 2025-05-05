import { Image, View } from "react-native";
import AddTaskLandingBtn from "./AddTaskLandingBtn";
import { Text } from "./ui/text";

export default function LandingScreen() {
  return (
    <View className="flex-1 flex justify-center items-center bg-background px-8 gap-20">
      <View className="flex gap-8">
        <Image
          source={require("../assets/images/landing-image.png")}
          alt="Landing image"
          accessibilityLabel="Landing image"
        />
        <Text className="text-foreground-transparent text-center text-4xl">
          Uni. Sorted.
        </Text>
      </View>
      <AddTaskLandingBtn />
    </View>
  );
}
