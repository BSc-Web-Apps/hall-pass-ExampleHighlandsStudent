import * as React from "react";
import { View } from "react-native";
import { Task } from "./Task";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Text } from "./ui/text";

interface TaskDialogProps {
  task: Task;
  setTask: (task: Task) => void;
  setShowDialog: (showDialog: boolean) => void;
  showDialog: boolean;
  onSave?: () => void;
}

export default function TaskDialog({
  task,
  setTask,
  setShowDialog,
  showDialog,
  onSave,
}: TaskDialogProps) {
  const isNewTask = task.id === 0;

  const [editedTitle, setEditedTitle] = React.useState(task.title);
  const [editedCategory, setEditedCategory] = React.useState(task.category);

  // Reset internal state when dialog opens or task changes
  React.useEffect(() => {
    if (showDialog) {
      setEditedTitle(task.title);
      setEditedCategory(task.category);
    }
  }, [task, showDialog]);

  const handleUpdateTitle = (title: string) => {
    setEditedTitle(title);
  };

  const handleUpdateCategory = (category: string) => {
    setEditedCategory(category);
  };

  const handleSave = () => {
    // Only proceed if title is not empty
    if (editedTitle.trim()) {
      // Update the task in the parent component
      setTask({
        ...task,
        title: editedTitle,
        category: editedCategory,
      });

      // Call the onSave callback if provided
      if (onSave) {
        onSave();
      } else {
        setShowDialog(false);
      }
    } else {
      // Just close the dialog if title is empty
      setShowDialog(false);
    }
  };

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isNewTask ? "Add" : "Edit"} Task</DialogTitle>
          <DialogDescription className="w-80">
            {isNewTask
              ? "Add a new task here."
              : "Make changes to your task details here."}
          </DialogDescription>
        </DialogHeader>

        <View className="gap-4">
          <Input
            value={editedTitle}
            placeholder="Task title"
            onChangeText={handleUpdateTitle}
          />
          <Input
            value={editedCategory}
            placeholder="Category"
            onChangeText={handleUpdateCategory}
          />
        </View>

        <DialogFooter>
          <Button variant="outline" onPress={() => setShowDialog(false)}>
            <Text>Cancel</Text>
          </Button>
          <Button onPress={handleSave}>
            <Text>Save changes</Text>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
