import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Recipe } from "../types";

export const recipesApi = createApi({
  reducerPath: "recipesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
  }),
  tagTypes: ["Recipes"],
  endpoints: (builder) => ({
    getRecipes: builder.query<Recipe[], void>({
      query: () => "/recipes",
      providesTags: ["Recipes"],
    }),
  }),
});

export const { useGetRecipesQuery } = recipesApi;
