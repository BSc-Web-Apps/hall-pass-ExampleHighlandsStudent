import * as React from "react";
import { TouchableOpacity, View } from "react-native";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Text } from "~/components/ui/text";

interface TaskProps {
  title: string;
  category: string;
  isChecked: boolean;
  onEdit?: (newTitle: string, newCategory: string) => void;
}
function Task({ title, category, isChecked, onEdit }: TaskProps) {
  const [checked, setChecked] = React.useState(isChecked);
  const [showDialog, setShowDialog] = React.useState(false);

  return (
    <>
      <TouchableOpacity
        className="flex flex-row w-full"
        delayLongPress={500}
        onLongPress={() => setShowDialog(true)}
      >
        <View className="px-8 py-5 flex w-24 h-full">
          <Checkbox
            className="border-foreground checked:bg-foreground"
            checked={checked}
            onCheckedChange={setChecked}
          />
        </View>
        <View className="py-4 flex gap-1 flex-1 h-full border-b border-foreground-transparent">
          <Text className="text-foreground text-xl">{title}</Text>
          <Text className="text-foreground-transparent text-xl">
            {category}
          </Text>
        </View>
      </TouchableOpacity>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
            <DialogDescription>
              Make changes to your task details here.
            </DialogDescription>
          </DialogHeader>

          <View className="gap-4">
            <Input defaultValue={title} placeholder="Task title" />
            <Input defaultValue={category} placeholder="Category" />
          </View>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">
                <Text>Cancel</Text>
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button>
                <Text>Save changes</Text>
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
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
