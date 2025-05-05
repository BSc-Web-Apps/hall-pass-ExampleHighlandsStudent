import * as React from "react";
import { TouchableOpacity, View } from "react-native";
import { BottomDialogContent } from "~/components/ui/bottom-dialog";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import {
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Text } from "~/components/ui/text";
import { useTasks } from "~/lib/TaskContext";
import { Trash } from "~/lib/icons/Trash";
import TaskDialog from "./TaskDialogue";

export interface Task {
  id: number;
  title: string;
  category: string;
  isChecked: boolean;
}

export interface TaskProps {
  task: Task;
  onUpdate?: (task: Task) => void;
}

export default function Task({ task: propTask, onUpdate }: TaskProps) {
  const { updateTask, deleteTask } = useTasks();
  const [task, setTask] = React.useState(propTask);
  const [showDialog, setShowDialog] = React.useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(false);
  const { title, category, isChecked } = task;

  const handleSetChecked = () => {
    const updatedTask = { ...task, isChecked: !task.isChecked };
    setTask(updatedTask);

    // Use the provided onUpdate or fall back to context
    if (onUpdate) {
      onUpdate(updatedTask);
    } else {
      updateTask(updatedTask);
    }
  };

  const handleTaskUpdate = (updatedTask: Task) => {
    setTask(updatedTask);

    // Use the provided onUpdate or fall back to context
    if (onUpdate) {
      onUpdate(updatedTask);
    } else {
      updateTask(updatedTask);
    }
  };

  const handleDeleteTask = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    setShowDeleteConfirm(false);
    try {
      await deleteTask(task.id);
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  return (
    <>
      <TouchableOpacity
        className="flex flex-row w-full"
        delayLongPress={300}
        onLongPress={() => setShowDialog(true)}
      >
        <View className="px-8 pt-8 w-24 h-full">
          <Checkbox
            className="border-foreground checked:bg-foreground"
            checked={isChecked}
            onCheckedChange={handleSetChecked}
          />
        </View>
        <View className="py-4 flex gap-1 flex-1 h-full border-b border-foreground-transparent">
          <Text
            className={`text-foreground ${
              isChecked ? "line-through opacity-60" : ""
            } text-xl`}
          >
            {title}
          </Text>
          <Text
            className={`text-foreground-transparent text-xl ${
              isChecked ? "line-through opacity-60" : ""
            }`}
          >
            {category}
          </Text>
        </View>
        <TouchableOpacity
          onPress={handleDeleteTask}
          className="px-4 py-8 justify-center"
        >
          <Trash size={24} className="text-brand-primary" />
        </TouchableOpacity>
      </TouchableOpacity>

      <TaskDialog
        task={task}
        setTask={handleTaskUpdate}
        showDialog={showDialog}
        setShowDialog={setShowDialog}
      />

      {/* Delete Confirmation Dialog - Using Bottom Dialog */}
      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <BottomDialogContent className="flex gap-4">
          <DialogHeader>
            <DialogTitle>Delete Task</DialogTitle>
            <DialogDescription className="w-80 mb-4">
              Are you sure you want to delete this task? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-4">
            <Button
              variant="outline"
              onPress={() => setShowDeleteConfirm(false)}
            >
              <Text>Cancel</Text>
            </Button>
            <Button variant="destructive" onPress={confirmDelete}>
              <Text>Delete</Text>
            </Button>
          </DialogFooter>
        </BottomDialogContent>
      </Dialog>
    </>
  );
}
