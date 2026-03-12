import HabitCard from "./HabitCard";
import { useGetHabitsQuery } from "@/services/habitApi";

function HabitList() {
  const { data: habits, isLoading } = useGetHabitsQuery();

  if (isLoading) return <p>Loading habits...</p>;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {habits?.map((habit) => (
        <HabitCard key={habit._id} habit={habit} />
      ))}
    </div>
  );
}

export default HabitList;