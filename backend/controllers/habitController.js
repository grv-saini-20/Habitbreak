import asyncHandler from "express-async-handler";
import Habit from "../models/habitModel.js";

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
    res.status(201).json(habits);
})

export {createHabit, getAllHabits};