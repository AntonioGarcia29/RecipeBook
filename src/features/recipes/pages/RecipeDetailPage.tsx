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

  function handleShareWhatsApp() {
    const url = `${window.location.origin}/recipes/${recipe.id}`;
    const text = `¡Mira esta receta! 🍽️\n*${recipe.name}* (${recipe.category})\n${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
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
        <button
          onClick={handleShareWhatsApp}
          className="ml-auto flex items-center gap-1.5 bg-green-500 hover:bg-green-600 text-white text-xs font-medium px-3 py-1.5 rounded-full transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
          </svg>
          Compartir
        </button>
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
