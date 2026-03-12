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
} from "@/services/habitApi";

function HabitCard({ habit }) {
  const [deleteHabit] = useDeleteHabitMutation();
  const [completeHabit] = useCompleteHabitMutation();

  const handleComplete = async () => {
    await completeHabit(habit._id);
  };

  const handleDelete = async () => {
    await deleteHabit(habit._id);
  };

  return (
    <Card>

      <CardHeader className="flex flex-row justify-between items-center">

        <CardTitle>{habit.title}</CardTitle>

        <Badge variant={habit.habitType === "build" ? "default" : "destructive"}>
          {habit.habitType}
        </Badge>

      </CardHeader>

      <CardContent>

        <p className="text-sm text-muted-foreground">
          {habit.description}
        </p>

        <p className="text-sm mt-2">
          Current Streak: {habit.currentStreak}
        </p>

      </CardContent>

      <CardFooter className="flex gap-2">

        <Button onClick={handleComplete}>
          Complete
        </Button>

        <Button variant="destructive" onClick={handleDelete}>
          Delete
        </Button>

      </CardFooter>

    </Card>
  );
}

export default HabitCard;