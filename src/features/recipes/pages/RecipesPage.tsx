import { useGetRecipesQuery } from "../api/recipesApi";
import { RecipeCard } from "../components/RecipeCard";
import { Spinner } from "../../../shared/components/Spinner";
import { ErrorMessage } from "../../../shared/components/ErrorMessage";

export function RecipesPage() {
  const { data: recipes, isLoading, isError } = useGetRecipesQuery();

  if (isLoading) return <Spinner />;

  if (isError) return <ErrorMessage message="No se pudo cargar las recetas. Verifica que el servidor esté activo." />;

  if (!recipes || recipes.length === 0) {
    return (
      <div className="flex justify-center items-center py-16">
        <p className="text-gray-500">No hay recetas disponibles.</p>
      </div>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Recetas</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </main>
  );
}
