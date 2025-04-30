import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Plus } from "~/lib/icons/Plus";
import TaskDialog from "./TaskDialogue";

interface AddTaskProps {
  onAdd: (title: string, category: string) => void;
}

export default function AddTask({ onAdd }: AddTaskProps) {
  const [showDialog, setShowDialog] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [category, setCategory] = React.useState("");

  // This function will be called when the user saves a new task
  const handleSave = () => {
    if (title.trim()) {
      // Call the onAdd function passed from the parent component
      onAdd(title, category);

      // Reset the form fields and close dialog
      setTitle("");
      setCategory("");
      setShowDialog(false);
    }
  };

  // Reset fields when dialog closes
  React.useEffect(() => {
    if (!showDialog) {
      setTitle("");
      setCategory("");
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
        task={{ id: 0, title, category, isChecked: false }}
        setTask={(newTask) => {
          setTitle(newTask.title);
          setCategory(newTask.category);
        }}
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        onSave={handleSave}
      />
    </View>
  );
}
