import { useNavigate, useParams } from "react-router-dom";
import { useGetRecipeByIdQuery } from "../api/recipesApi";
import { Spinner } from "../../../shared/components/Spinner";
import { ErrorMessage } from "../../../shared/components/ErrorMessage";

const PLACEHOLDER = "https://placehold.co/800x400?text=Sin+imagen";

const difficultyColor: Record<string, string> = {
  "Fácil": "bg-green-100 text-green-700",
  "Media": "bg-yellow-100 text-yellow-700",
  "Difícil": "bg-red-100 text-red-700",
};

export function RecipeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: recipe, isLoading, isError } = useGetRecipeByIdQuery(Number(id));

  if (isLoading) return <Spinner />;

  if (isError || !recipe) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-4">
        <ErrorMessage message="No se pudo cargar la receta. Puede que no exista o haya un error de red." />
        <div className="flex justify-center">
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-orange-600 hover:underline"
          >
            ← Volver
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="text-sm text-orange-600 hover:underline"
      >
        ← Volver
      </button>

      <img
        src={recipe.imageUrl}
        alt={recipe.name}
        className="w-full h-64 object-cover rounded-2xl"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = PLACEHOLDER;
        }}
      />

      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-gray-900">{recipe.name}</h1>
        <p className="text-gray-600">{recipe.description}</p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm text-gray-500">{recipe.category}</span>
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${difficultyColor[recipe.difficulty] ?? ""}`}>
          {recipe.difficulty}
        </span>
        <span className="text-xs text-gray-500">⏱ {recipe.prepTime} min</span>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Ingredientes</h2>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          {recipe.ingredients.map((ingredient, i) => (
            <li key={i}>{ingredient}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Preparación</h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          {recipe.steps.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}
