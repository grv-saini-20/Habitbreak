import Habit from "../models/habitModel";
import asyncHandler from "express-async-handler";

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

export {createHabit};