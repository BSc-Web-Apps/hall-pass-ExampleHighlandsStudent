import React from "react";
import { Plus } from "lucide-react-native";
import { Dimensions, TouchableOpacity, View } from "react-native";
import AddTask from "./AddTask";

export default function AddTaskTabBtn() {
  const [showDialogue, setShowDialogue] = React.useState(false);

  // Get screen width for centering
  const screenWidth = Dimensions.get("window").width;
  const buttonWidth = 40 * 2; // Based on your w-24 class (24 units × 2 sides)
  const leftPosition = (screenWidth - buttonWidth) / 2;

  const handleShowDialogue = () => {
    setShowDialogue(true);
  };

  return (
    <AddTask showDialogProp={showDialogue} setShowDialogProp={setShowDialogue}>
      <View
        className="absolute bottom-6"
        style={{
          left: leftPosition,
          zIndex: 50,
        }}
      >
        <View className="w-24 h-24 p-1 bg-brand-primary rounded-full flex items-center justify-center">
          <TouchableOpacity onPress={handleShowDialogue}>
            <View className="w-full h-auto p-3 bg-brand-primary rounded-full flex items-center justify-center border-4 border-background">
              <Plus size={48} color="hsl(11, 72%, 3%)" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </AddTask>
  );
}
