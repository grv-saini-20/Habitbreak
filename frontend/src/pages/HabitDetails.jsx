import { useParams } from "react-router-dom";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

import {
  useGetHabitQuery,
  useCompleteHabitMutation,
  useDeleteHabitMutation,
} from "@/services/habitApi";
import DashboardLayout from "@/components/layouts/DashboardLayout";

export default function HabitDetails() {
  const { id } = useParams();

  const { data: habit, isLoading } = useGetHabitQuery(id);
  console.log(habit);
  const [completeHabit] = useCompleteHabitMutation();
  const [deleteHabit] = useDeleteHabitMutation();

  if (isLoading) return <p>Loading...</p>;

  const completionRate = Math.min(
    (habit?.currentStreak || 0 / (habit?.targetDays || 10)) * 100,
    100
  );

  return (
    <DashboardLayout>

    <div className="p-8 space-y-6">

      {/* Main Card */}
      <Card>

        <CardHeader className="flex flex-row justify-between items-center">

          <CardTitle>{habit?.title || "title"}</CardTitle>

          <Badge variant={habit.type === "build" ? "default" : "destructive"}>
            {habit?.type}
          </Badge>

        </CardHeader>

        <CardContent className="space-y-4">

          <p className="text-muted-foreground">
            {habit?.description}
          </p>

          <Separator />

          {/* Streak Info */}
          <div className="grid grid-cols-2 gap-4">

            <div>
              <p className="text-sm text-muted-foreground">Current Streak</p>
              <p className="text-xl font-bold">
                {habit?.currentStreak || 0} 🔥
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Best Streak</p>
              <p className="text-xl font-bold">
                {habit?.longestStreak || 0}
              </p>
            </div>

          </div>

          <Separator />

          {/* Progress */}
          <div>
            <p className="text-sm mb-2">Progress</p>
            <Progress value={completionRate} />
          </div>

        </CardContent>

        <CardFooter className="flex gap-2">

          <Button onClick={() => completeHabit(id)}>
            Mark Complete
          </Button>

          <Button variant="destructive" onClick={() => deleteHabit(id)}>
            Delete
          </Button>

        </CardFooter>

      </Card>

      {/* History Section */}
      <Card>

        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>

        <CardContent className="space-y-2">

          {habit.completedDates?.length > 0 ? (
            habit.completedDates.slice(-5).map((date, index) => (
              <div
                key={index}
                className="flex justify-between text-sm border-b pb-1"
              >
                <span>Completed</span>
                <span>{new Date(date).toLocaleDateString()}</span>
              </div>
            ))
          ) : (
            <p className="text-muted-foreground text-sm">
              No activity yet
            </p>
          )}

        </CardContent>

      </Card>

    </div>
</DashboardLayout>
  );
}