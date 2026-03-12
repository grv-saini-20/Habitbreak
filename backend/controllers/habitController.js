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

    const updatedHabit = await habit.save();
    res.status(201).json(updatedHabit);
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
    res.status(201).json({message: "Habit Removed"});
})

export {createHabit, getAllHabits, updateHabit, deleteHabit};

