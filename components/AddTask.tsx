import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Plus } from "~/lib/icons/Plus";
import TaskDialog from "./TaskDialogue";
import { Task } from "./Task";

interface AddTaskProps {
  onAdd: (title: string, category: string) => void;
}

export default function AddTask({ onAdd }: AddTaskProps) {
  const [showDialog, setShowDialog] = React.useState(false);
  const [task, setTask] = React.useState<Task>({
    id: 0,
    title: "",
    category: "",
    isChecked: false,
  });

  // This function will be called when the user saves a new task
  const handleSave = (updatedTask: Task) => {
    // Call the onAdd function with the values from the updated task
    onAdd(updatedTask.title, updatedTask.category);
  };

  // Reset task when dialog closes
  React.useEffect(() => {
    if (!showDialog) {
      setTask({ id: 0, title: "", category: "", isChecked: false });
    }
  }, [showDialog]);

  return (
    <View className="absolute -bottom-0 z-10">
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
        onSave={handleSave}
      />
    </View>
  );
}
