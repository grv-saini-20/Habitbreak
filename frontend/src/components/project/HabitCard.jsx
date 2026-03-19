import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  useDeleteHabitMutation,
  useCompleteHabitMutation,
  useUpdateHabitMutation,
} from "@/services/habitApi";
import { ArrowBigRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

function HabitCard({ habit }) {
  const [deleteHabit] = useDeleteHabitMutation();
  const [completeHabit] = useCompleteHabitMutation();

  const navigate = useNavigate();

  const handleComplete = async () => {
    await completeHabit(habit._id);
  };

  const handleDelete = async () => {
    await deleteHabit(habit._id);
  };

  const handleCardDetail= () => {
    navigate(`/habits/${habit._id}`)
  }

  return (
    <Card>

      <CardHeader className="flex flex-row justify-between items-center">

        <CardTitle>{habit.title}</CardTitle>

        <div className="flex gap-2">
        <Badge variant={habit.type === "build" ? "default" : "destructive"}>
          {habit.type}
        </Badge>

        <Badge variant={"secondary"}>
          {habit.frequency}
        </Badge>
        </div>

      </CardHeader>

      <CardContent>

        <p className="text-sm text-muted-foreground">
          {habit.description}
        </p>

        <p className="text-sm mt-2">
          Current Streak: {habit.currentStreak}
        </p>

      </CardContent>

      <CardFooter className="flex justify-between">
        <div className="flex gap-2">
        <Button onClick={handleComplete}>
          Complete
        </Button>

        <Button variant="destructive" onClick={handleDelete}>
          Delete
        </Button>
        </div>

        <Button variant="icon" onClick={handleCardDetail}>
          <ArrowBigRight/>
        </Button>

      </CardFooter>

    </Card>
  );
}

export default HabitCard;