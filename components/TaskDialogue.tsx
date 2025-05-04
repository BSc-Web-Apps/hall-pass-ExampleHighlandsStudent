import * as React from "react";
import { View } from "react-native";
import { Task } from "./Task";
import { BottomDialogContent } from "./ui/bottom-dialog";
import { Button } from "./ui/button";
import {
  Dialog,
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
  onSave?: (updatedTask: Task) => void;
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
      // Create the updated task
      const updatedTask = {
        ...task,
        title: editedTitle,
        category: editedCategory,
      };

      // First close the dialog
      setShowDialog(false);

      // Then update the task and call onSave
      // This ensures the dialog is closed before any state updates
      setTimeout(() => {
        setTask(updatedTask);
        if (onSave) {
          onSave(updatedTask);
        }
      }, 0);
    } else {
      // Just close the dialog if title is empty
      setShowDialog(false);
    }
  };

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <BottomDialogContent className="flex gap-12">
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
            className="rounded-full bg-input-background placeholder:text-foreground-transparent"
            value={editedTitle}
            placeholder="Task title"
            onChangeText={handleUpdateTitle}
          />
          <Input
            className="rounded-full bg-input-background placeholder:text-foreground-transparent"
            value={editedCategory}
            placeholder="Category"
            onChangeText={handleUpdateCategory}
          />
        </View>

        <DialogFooter className="flex gap-4">
          <Button
            className="bg-brand-primary rounded-full"
            onPress={handleSave}
          >
            <Text className="text-foreground">Save changes</Text>
          </Button>
          <Button
            className="rounded-full"
            variant="outline"
            onPress={() => setShowDialog(false)}
          >
            <Text>Cancel</Text>
          </Button>
        </DialogFooter>
      </BottomDialogContent>
    </Dialog>
  );
}
