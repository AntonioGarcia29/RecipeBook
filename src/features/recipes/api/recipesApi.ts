import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Recipe, Category } from "../types";

export const recipesApi = createApi({
  reducerPath: "recipesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
  }),
  tagTypes: ["Recipes", "Categories"],
  endpoints: (builder) => ({
    getRecipes: builder.query<Recipe[], void>({
      query: () => "/recipes",
      providesTags: ["Recipes"],
    }),
    getRecipeById: builder.query<Recipe, number>({
      query: (id) => `/recipes/${id}`,
      providesTags: ["Recipes"],
    }),
    getCategories: builder.query<Category[], void>({
      query: () => "/categories",
      providesTags: ["Categories"],
    }),
    createRecipe: builder.mutation<Recipe, Omit<Recipe, "id">>({
      query: (body) => ({
        url: "/recipes",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Recipes"],
    }),
  }),
});

export const {
  useGetRecipesQuery,
  useGetRecipeByIdQuery,
  useGetCategoriesQuery,
  useCreateRecipeMutation,
} = recipesApi;
