export type Difficulty = "Fácil" | "Media" | "Difícil";

export type RecipeCategory = "Desayuno" | "Plato Fuerte" | "Postre" | "Snack";

export interface Category {
  id: number;
  name: string;
}

export interface Recipe {
  id: number;
  name: string;
  description: string;
  ingredients: string[];
  steps: string[];
  category: RecipeCategory;
  difficulty: Difficulty;
  prepTime: number;
  imageUrl: string;
}
