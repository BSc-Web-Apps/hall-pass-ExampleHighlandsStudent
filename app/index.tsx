import * as React from "react";
import { ScrollView, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AddTask from "~/components/AddTask";
import Task from "~/components/Task";
import { Text } from "~/components/ui/text";

interface TaskItem {
  id: number;
  title: string;
  category: string;
  isChecked: boolean;
}

// Key for storing tasks in AsyncStorage
const TASKS_STORAGE_KEY = "hallpass_tasks";

export default function HomeScreen() {
  const [tasks, setTasks] = React.useState<TaskItem[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  // Load tasks from storage when app starts
  React.useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem(TASKS_STORAGE_KEY);
        if (storedTasks !== null) {
          setTasks(JSON.parse(storedTasks));
        }
      } catch (error) {
        console.error("Failed to load tasks:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTasks();
  }, []);

  // Save tasks to storage whenever they change
  const saveTasks = async (updatedTasks: TaskItem[]) => {
    try {
      await AsyncStorage.setItem(
        TASKS_STORAGE_KEY,
        JSON.stringify(updatedTasks)
      );
    } catch (error) {
      console.error("Failed to save tasks:", error);
    }
  };

  const handleAddTask = (title: string, category: string) => {
    const nextId =
      tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
    const updatedTasks = [
      ...tasks,
      { id: nextId, title, category, isChecked: false },
    ];
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const handleTaskUpdate = (updatedTask: TaskItem) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  return (
    <View className="flex-1 flex justify-between bg-background">
      <View className="flex flex-row justify-center">
        <Text className="pt-20 pb-8 text-foreground font-bold text-6xl">
          HallPass
        </Text>
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
            <Task key={task.id} task={task} onUpdate={handleTaskUpdate} />
          ))
        )}
      </ScrollView>
      <View className="relative flex items-center">
        <AddTask onAdd={handleAddTask} />
      </View>
    </View>
  );
}
