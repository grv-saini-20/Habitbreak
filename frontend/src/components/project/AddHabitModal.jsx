import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { useCreateHabitMutation } from "@/services/habitApi";

function AddHabitModal() {
  const [createHabit] = useCreateHabitMutation();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [habitType, setHabitType] = useState("build");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createHabit({
      title,
      description,
      type: habitType,
    });

    setTitle("");
    setDescription("");
  };

  return (
    <Dialog>

      <DialogTrigger asChild>
        <Button>Add Habit</Button>
      </DialogTrigger>

      <DialogContent>

        <DialogHeader>
          <DialogTitle>Create Habit</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">

          <Input
            placeholder="Habit title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <select
            className="w-full border rounded-md p-2"
            value={habitType}
            onChange={(e) => setHabitType(e.target.value)}
          >
            <option value="build">Build Habit</option>
            <option value="break">Break Habit</option>
          </select>

          <Button type="submit" className="w-full">
            Create Habit
          </Button>

        </form>

      </DialogContent>
    </Dialog>
  );
}

export default AddHabitModal;