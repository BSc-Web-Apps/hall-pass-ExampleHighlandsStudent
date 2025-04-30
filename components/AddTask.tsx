import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Plus } from "~/lib/icons/Plus";
import TaskDialog from "./TaskDialogue";

export default function AddTask() {
  const startId = 4;
  const [task, setTask] = React.useState({
    id: startId,
    title: "",
    category: "",
    isChecked: false,
  });
  const [showDialog, setShowDialog] = React.useState(false);

  return (
    <>
      <View className="w-24 h-24 p-1 bg-brand-primary rounded-full flex items-center justify-center">
        <TouchableOpacity onPress={() => setShowDialog(true)}>
          <View className="w-full h-auto p-3 bg-brand-primary rounded-full flex items-center justify-center border-4 border-background">
            <Plus size={48} className="text-background" />
          </View>
        </TouchableOpacity>
      </View>

      <TaskDialog
        task={task}
        setTask={setTask}
        showDialog={showDialog}
        setShowDialog={setShowDialog}
      />
    </>
  );
}
