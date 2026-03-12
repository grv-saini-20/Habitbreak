import { apiSlice } from "./apiSlice";

export const usersApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: "/users/auth",
                method: "POST",
                body: data
            })
        }),
        register: builder.mutation({
            query: (data) => ({
                url: "/users",
                method: "POST",
                body: data
            })
        }),
        getProfile: builder.query({
            query: () => "/users/profile",
            providesTags: ["User"],
        }),
        updateUser: builder.mutation({
            query: (data) => ({
            url: `${USERS_URL}/profile`,
            method: 'PUT',
            body: data,
            }),
            invalidatesTags: ["User"],
        }),
        logout: builder.mutation({
            query: () => ({
                url: "/users/logout",
                method: "POST"
            })
        })
    })
})

export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useUpdateUserMutation, useGetProfileQuery } = usersApiSlice;