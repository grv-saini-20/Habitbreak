import HabitList from "./../components/project/HabitList";
import AddHabitModal from "./../components/project/AddHabitModal";
import DashboardLayout from "@/components/layouts/DashboardLayout";

function Habits() {
  return (
    <DashboardLayout>
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          My Habits
        </h1>
        <AddHabitModal />
      </div>
      <HabitList />
    </div>
    </DashboardLayout>
  );
}

export default Habits;