import { apiSlice } from "./apiSlice";

export const habitApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //get all habits
        getHabits: builder.query({
            query: () => "/habits",
            providesTags: ["Habit"]
        }),
        //create a new habit
        createHabit: builder.mutation({
            query: (data) => ({
                url: "/habits/create",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Habit"]
        }),
        //update habit
        updateHabit: builder.mutation({
            query: ({id, ...data}) => ({
                url: `/habits/${id}`,
                method: "PATCH",
                body: data
            }),
            invalidatesTags: ["Habit"],
        }),
        // delete habit
        deleteHabit: builder.mutation({
        query: (id) => ({
            url: `/habits/${id}`,
            method: "DELETE",
        }),
        invalidatesTags: ["Habit"],
        }),

        // mark habit complete
        completeHabit: builder.mutation({
        query: (id) => ({
            url: `/habits/${id}/complete`,
            method: "POST",
        }),
        invalidatesTags: ["Habit"],
        }),
    })
}) 

export const {
  useGetHabitsQuery,
  useCreateHabitMutation,
  useUpdateHabitMutation,
  useDeleteHabitMutation,
  useCompleteHabitMutation,
} = habitApiSlice;