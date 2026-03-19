import {useState, useEffect} from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"

import { Progress } from "@/components/ui/progress"
import { useGetHabitsQuery } from "@/services/habitApi"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { Loader } from "lucide-react";

const data = [
  { day: "Mon", completed: 2 },
  { day: "Tue", completed: 3 },
  { day: "Wed", completed: 1 },
  { day: "Thu", completed: 4 },
  { day: "Fri", completed: 3 },
  { day: "Sat", completed: 5 },
  { day: "Sun", completed: 2 },
]

export default function Dashboard() {
  const { data: habits, isLoading } = useGetHabitsQuery();
  const [completedHabits, setCompletedHabits] = useState([]);
  const [consistency, setConsistency] = useState(0);

  useEffect(() => {
  const today = new Date().toDateString();
  const completed = habits?.filter(item => {
    return new Date(item.updatedAt).toDateString() === today;
  });

  setCompletedHabits(completed);

  const progress = (completed?.length/habits?.length) * 100;
  setConsistency(progress);
}, [habits]);

  return (
    <DashboardLayout>
    {isLoading ? <div className="min-h-screen w-full flex items-center justify-center"><Loader/></div> :
    <div className="flex-1 p-8 space-y-6">
        <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          My Habits
        </h1>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

        <Card>
          <CardHeader>
            <CardTitle>Total Habits</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{habits?.length || 0}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Completed Today</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{completedHabits?.length || 0}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Current Streak</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">7 🔥</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Consistency</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={consistency} />
            <p className="text-sm mt-2 text-muted-foreground">
              {consistency}% completion
            </p>
          </CardContent>
        </Card>

      </div>

      {/* Graph Section */}

      <Card>
        <CardHeader>
          <CardTitle>Weekly Habit Progress</CardTitle>
        </CardHeader>

        <CardContent>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>

              <XAxis dataKey="day" />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="completed"
                stroke="#0ea5e9"
                strokeWidth={3}
                />

            </LineChart>
          </ResponsiveContainer>

        </CardContent>

      </Card>

    </div>
    }
    </DashboardLayout>
  )
}