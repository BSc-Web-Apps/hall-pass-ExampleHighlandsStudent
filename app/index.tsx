import * as React from "react";
import { View } from "react-native";
import Task from "~/components/Task";

export default function HomeScreen() {
  const tasks = [
    { id: 1, title: "Task 1", category: "Category 1", isChecked: false },
    { id: 2, title: "Task 2", category: "Category 2", isChecked: true },
    { id: 3, title: "Task 3", category: "Category 3", isChecked: false },
    { id: 4, title: "Task 4", category: "Category 2", isChecked: true },
  ];

  return (
    <View className="flex-1 justify-center items-center gap-5 p-6 bg-background">
      {tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </View>
  );
}
