import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://localhost:3000/api/" }),
  endpoints: (builder) => ({
    getUserData: builder.query({
      query: (id) => `users/${id}`,
    }),
    updateUserEmail: builder.mutation({
      query: ({ newEmail, userId }) => ({
        url: `users/${userId}`,
        method: "PUT",
        body: { email: newEmail },
      }),
    }),
  }),
});

export const { useGetUserDataQuery, useUpdateUserEmailMutation } = userApi;
