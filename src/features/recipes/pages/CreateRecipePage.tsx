import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateRecipeMutation } from "../api/recipesApi";
import { RecipeForm } from "../components/RecipeForm";
import type { RecipeFormValues } from "../schemas/recipeForm.schema";

export function CreateRecipePage() {
  const navigate = useNavigate();
  const [createRecipe, { isLoading }] = useCreateRecipeMutation();
  const [serverError, setServerError] = useState<string>();

  async function handleSubmit(values: RecipeFormValues) {
    setServerError(undefined);
    try {
      const recipe = await createRecipe({
        name: values.name,
        description: values.description,
        ingredients: values.ingredients.map((i) => i.value),
        steps: values.steps.map((s) => s.value),
        category: values.category as import("../types").RecipeCategory,
        difficulty: values.difficulty,
        prepTime: values.prepTime,
        imageUrl: values.imageUrl,
      }).unwrap();
      navigate(`/recipes/${recipe.id}`);
    } catch {
      setServerError("No se pudo guardar la receta. Verifica que el servidor esté activo.");
    }
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Nueva receta</h1>
      <RecipeForm
        onSubmit={handleSubmit}
        onCancel={() => navigate("/recipes")}
        isSubmitting={isLoading}
        serverError={serverError}
      />
    </main>
  );
}
