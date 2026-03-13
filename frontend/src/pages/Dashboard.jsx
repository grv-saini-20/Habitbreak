import DashboardLayout from "@/components/layouts/DashboardLayout"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"

import { Progress } from "@/components/ui/progress"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

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
  return (
    <DashboardLayout>
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
            <p className="text-3xl font-bold">12</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Completed Today</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">5</p>
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
            <Progress value={70} />
            <p className="text-sm mt-2 text-muted-foreground">
              70% completion
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
    </DashboardLayout>
  )
}