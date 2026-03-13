import type { Recipe } from "../types";

const PLACEHOLDER = "https://placehold.co/400x300?text=Sin+imagen";

const difficultyColor: Record<Recipe["difficulty"], string> = {
  "Fácil": "bg-green-100 text-green-700",
  "Media": "bg-yellow-100 text-yellow-700",
  "Difícil": "bg-red-100 text-red-700",
};

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <article className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <img
        src={recipe.imageUrl}
        alt={recipe.name}
        className="w-full h-48 object-cover"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = PLACEHOLDER;
        }}
      />
      <div className="p-4 space-y-2">
        <h2 className="font-semibold text-gray-900 text-lg leading-tight">{recipe.name}</h2>
        <p className="text-sm text-gray-500">{recipe.category}</p>
        <div className="flex items-center gap-3 pt-1">
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${difficultyColor[recipe.difficulty]}`}>
            {recipe.difficulty}
          </span>
          <span className="text-xs text-gray-500">⏱ {recipe.prepTime} min</span>
        </div>
      </div>
    </article>
  );
}
