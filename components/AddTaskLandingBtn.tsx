import React from "react";
import AddTask from "./AddTask";
import { Button } from "./ui/button";
import { Text } from "./ui/text";

export default function AddTaskLandingBtn() {
  const [showDialogue, setShowDialogue] = React.useState(false);

  const handleShowDialogue = () => {
    setShowDialogue(true);
  };

  return (
    <AddTask showDialogProp={showDialogue} setShowDialogProp={setShowDialogue}>
      <Button className="w-full" onPress={handleShowDialogue} size={"lg"}>
        <Text>Get Started</Text>
      </Button>
    </AddTask>
  );
}
