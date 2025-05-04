import * as React from "react";
import { ScrollView, View } from "react-native";
import Task from "~/components/Task";
import { Text } from "~/components/ui/text";
import { CircleCheck } from "~/lib/icons/CircleCheck";
import { useTasks } from "~/lib/TaskContext";

export default function HomeScreen() {
  const { tasks, isLoading, updateTask } = useTasks();

  return (
    <View className="flex-1 flex justify-between bg-background pb-10">
      <View className="flex flex-row justify-center">
        <Text className="pt-20 pb-8 text-foreground font-bold text-5xl">
          HallPass
        </Text>
        <CircleCheck
          className="pt-40 pb-8 ml-4 text-foreground-transparent"
          size={56}
        />
      </View>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingVertical: 16,
        }}
      >
        {isLoading ? (
          <Text className="text-center text-foreground text-lg">
            Loading tasks...
          </Text>
        ) : tasks.length === 0 ? (
          <Text className="text-center text-foreground text-lg">
            Please add your first task...
          </Text>
        ) : (
          tasks.map((task) => (
            <Task key={task.id} task={task} onUpdate={updateTask} />
          ))
        )}
      </ScrollView>
    </View>
  );
}
