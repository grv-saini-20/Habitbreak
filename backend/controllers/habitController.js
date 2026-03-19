import asyncHandler from "express-async-handler";
import Habit from "../models/habitModel.js";
import HabitLog from "../models/habitLogModel.js";

//@desc create habit
//@route POST /api/habits/create
//@access Private
const createHabit = asyncHandler(async(req, res) => {
    const {title, description, type,frequency} = req.body;

    const habit = await Habit.create({
        user: req.user._id,
        title,
        description,
        type,
        frequency
    })

    res.status(201).json(habit);
})

//@desc create habit
//@route GET /api/habits
//@access Private
const getAllHabits = asyncHandler(async(req,res) => {
    const habits = await Habit.find({user: req.user._id});
    res.status(200).json(habits);
})

//@desc update habit
//@route PATCH /api/habit/:id
//@access private
const updateHabit = asyncHandler(async(req, res) => {
    const habit = await Habit.findById(req.params.id);

    if(!habit) {
        res.status(404);
        throw new Error("Habit not found");
    }

    if(habit.user._id.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error("Not Authorized");
    }

    habit.title = req.body.title || habit.title;
    habit.description = req.body.description || habit.description;
    habit.currentStreak = req.body.currentStreak || habit.currentStreak;

    const updatedHabit = await habit.save();
    res.status(201).json(updatedHabit);
})

//@desc get habit
//@route GET /api/habits/:id
//@access private
const getHabit = asyncHandler(async(req, res) => {
    const habit = await Habit.findById(req.params.id);

    if(!habit) {
        res.status(404);
        throw new Error("Habit not found");
    }

    if(habit.user._id.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error("Not Autherised");
    }

    res.status(200).json(habit);
})

//@desc delete habit
//@route DELETE /api/habits/:id
//@access private 
const deleteHabit = asyncHandler(async(req, res) => {
    const habit = await Habit.findById(req.params.id);

    if(!habit) {
        res.status(404);
        throw new Error("Habit not found");
    }

    if(habit.user._id.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error("Not Authorized");
    }

    await habit.deleteOne();
    res.status(200).json({message: "Habit Removed"});
})

//@desc complete habit
//@route /api/habits/:id/complete
//@access private
const completeHabit = asyncHandler(async (req, res) => {
    const habit = await Habit.findById(req.params.id);

    if (!habit) {
        res.status(404);
        throw new Error("Habit not found");
    }

    const today = new Date().toISOString().split("T")[0];

    const existing = await HabitLog.findOne({
        habit: habit._id,
        date: today
    });

    if (existing) {
        res.status(400);
        throw new Error("Habit already completed today");
    }

    const lastLog = await HabitLog.findOne({ habit: habit._id })
        .sort({ date: -1 });

    let newStreak = 1;

    if (lastLog) {
        const lastDate = new Date(lastLog.date);
        const currentDate = new Date(today);

        const diffDays = Math.floor(
            (currentDate - lastDate) / (1000 * 60 * 60 * 24)
        );

        if (diffDays === 1) {
            newStreak = habit.currentStreak + 1;
        } else if (diffDays > 1) {
            newStreak = 1;
        }
    }

    await HabitLog.create({
        habit: habit._id,
        date: today,
        completed: true
    });

    habit.currentStreak = newStreak;

    if (habit.currentStreak > habit.longestStreak) {
        habit.longestStreak = habit.currentStreak;
    }

    await habit.save();

    res.status(201).json({
        message: "Habit completed",
        streak: habit.currentStreak
    });
});

export {createHabit, getAllHabits, getHabit, updateHabit, deleteHabit, completeHabit};

