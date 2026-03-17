import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { useCreateHabitMutation } from "@/services/habitApi";

function AddHabitModal() {
  const [createHabit] = useCreateHabitMutation();
  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [habitType, setHabitType] = useState("build");
  const [frequency, setFrequency] = useState("daily");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createHabit({
      title,
      description,
      type: habitType,
      frequency
    });

    setTitle("");
    setDescription("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>

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

         <Select value={habitType} onValueChange={setHabitType}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select frequency" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="build">Build</SelectItem>
              <SelectItem value="break">Break</SelectItem>
            </SelectContent>
          </Select>

          <Select value={frequency} onValueChange={setFrequency}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select frequency" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
            </SelectContent>
          </Select>

          <Button type="submit" className="w-full">
            Create Habit
          </Button>

        </form>

      </DialogContent>
    </Dialog>
  );
}

export default AddHabitModal;