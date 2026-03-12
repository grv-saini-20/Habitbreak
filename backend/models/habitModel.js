import mongoose from "mongoose";

const habitSchema = new mongoose.Schema (
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },

        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true
        },

        type : {
            type: String,
            enum: ["build", "break"],
            required: true
        },

        frequency: {
            type: String,
            enum: ["daily", "weekly"],
            default: "daily"
        },

        currentStreak: {
            type: Number,
            default: 0,
        },

        longestStreak: {
            type: Number,
            default: 0,
        },

        isArchived: {
            type: Boolean,
            default: false,
        }
    },
    {timestamps: true}
)

const Habit = mongoose.model("Habit", habitSchema);
export default Habit;