import React from "react";
import { useTasks } from "~/lib/TaskContext";
import { Task } from "./Task";
import TaskDialog from "./TaskDialogue";

interface AddTaskProps {
  children: React.ReactNode;
  showDialogProp?: boolean;
  setShowDialogProp?: (show: boolean) => void;
}

export default function AddTask({
  children,
  showDialogProp,
  setShowDialogProp,
}: AddTaskProps) {
  const blankTask: Task = { id: 0, title: "", category: "", isChecked: false };
  const { addTask } = useTasks();

  // Use external state if provided, otherwise manage internally
  const [internalShowDialog, setInternalShowDialog] = React.useState(false);
  const showDialog =
    showDialogProp !== undefined ? showDialogProp : internalShowDialog;
  const setShowDialog = setShowDialogProp || setInternalShowDialog;

  const [isSaving, setIsSaving] = React.useState(false);
  const [task, setTask] = React.useState(blankTask);

  const handleSave = async (updatedTask: Task) => {
    if (!updatedTask.title.trim()) {
      setShowDialog(false);
      return;
    }

    setIsSaving(true);
    try {
      // Use the context's addTask function
      await addTask(updatedTask.title, updatedTask.category || "");
      setTask(blankTask); // Reset the task
      setShowDialog(false); // Close the dialog after saving
    } catch (error) {
      console.error("Failed to add task:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      {children}

      <TaskDialog
        task={blankTask}
        setTask={setTask}
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        onSave={handleSave}
      />
    </>
  );
}
