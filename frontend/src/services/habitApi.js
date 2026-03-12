import { apiSlice } from "./apiSlice";

export const habitApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //get all habits
        getHabits: builder.query({
            query: () => "/habits",
            providedTags: ["Habit"]
        }),
        //create a new habit
        createHabit: builder.mutation({
            query: (data) => ({
                url: "/habits/create",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Habit"]
        })
    })
}) 