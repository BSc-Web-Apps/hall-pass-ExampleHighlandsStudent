import * as React from "react";
import { View } from "react-native";
import { Checkbox } from "~/components/ui/checkbox";
import { Text } from "~/components/ui/text";

interface TaskProps {
  title: string;
  category: string;
  isChecked: boolean;
}
function Task({ title, category, isChecked }: TaskProps) {
  const [checked, setChecked] = React.useState(isChecked);

  return (
    <View className="flex flex-row w-full">
      <View className="px-8 py-5 flex w-24 h-full">
        <Checkbox
          className="border-foreground checked:bg-foreground"
          checked={checked}
          onCheckedChange={setChecked}
        />
      </View>
      <View className="py-4 flex gap-1 flex-1 h-full border-b border-foreground-transparent">
        <Text className="text-foreground text-xl">{title}</Text>
        <Text className="text-foreground-transparent text-xl">{category}</Text>
      </View>
    </View>
  );
}

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
        <Task
          key={task.id}
          title={task.title}
          category={task.category}
          isChecked={task.isChecked}
        />
      ))}
    </View>
  );
}
