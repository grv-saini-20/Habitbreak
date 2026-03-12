import mongoose from "mongoose";

const habitLogSchema = new mongoose.Schema(
    {
        habit: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Habit",
            required: true
        },
        date: {
            type: String,
            required: true
        },
        completed: {
            type: Boolean,
            default: false
        }
    },
    {timestamps:  true}
)

const HabitLog = mongoose.model("HabitLog", habitLogSchema);
export default HabitLog;