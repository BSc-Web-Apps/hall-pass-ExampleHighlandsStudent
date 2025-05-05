import * as React from "react";
import { ScrollView, View } from "react-native";
import AppTitle from "~/components/AppTitle";
import LandingScreen from "~/components/LandingScreen";
import Task from "~/components/Task";
import { Text } from "~/components/ui/text";
import { useTasks } from "~/lib/TaskContext";

export default function HomeScreen() {
  const { tasks, isLoading, updateTask } = useTasks();

  return (
    <View className="flex-1 flex justify-between bg-background pb-10 min-h-screen">
      <AppTitle hasTasks={tasks.length > 0} />

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
          <LandingScreen />
        ) : (
          tasks.map((task) => (
            <Task key={task.id} task={task} onUpdate={updateTask} />
          ))
        )}
      </ScrollView>
    </View>
  );
}
