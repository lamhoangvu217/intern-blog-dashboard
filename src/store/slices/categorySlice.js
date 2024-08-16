import { createApi } from "@reduxjs/toolkit/query/react";
import { supabaseBaseQuery } from "../utils/supabaseQuery";

export const categorySlice = createApi({
  reducerPath: "categories",
  baseQuery: supabaseBaseQuery,
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => ({
        query: "*", // Select all fields
        table: "categories",
        method: "GET",
      }),
      providesTags: ['Category'],
    }),
    addCategory: builder.mutation({
      query: (newPost) => ({
        table: "categories",
        method: "POST",
        body: newPost,
      }),
      invalidatesTags: ['Category'],
    }),
  }),
});

export const { useAddCategoryMutation, useGetCategoriesQuery } = categorySlice;
