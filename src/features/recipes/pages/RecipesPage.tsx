import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useGetRecipesQuery, useGetCategoriesQuery } from "../api/recipesApi";
import { RecipeCard } from "../components/RecipeCard";
import { RecipeFilters } from "../components/RecipeFilters";
import { Spinner } from "../../../shared/components/Spinner";
import { ErrorMessage } from "../../../shared/components/ErrorMessage";

export function RecipesPage() {
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const { data: recipes, isLoading, isError } = useGetRecipesQuery();
  const { data: categories = [] } = useGetCategoriesQuery();

  const filteredRecipes = useMemo(() => {
    if (!recipes) return [];
    const query = searchText.trim().toLowerCase();
    return recipes.filter((recipe) => {
      const matchesText =
        !query ||
        recipe.name.toLowerCase().includes(query) ||
        recipe.description.toLowerCase().includes(query);
      const matchesCategory =
        !selectedCategory || recipe.category === selectedCategory;
      return matchesText && matchesCategory;
    });
  }, [recipes, searchText, selectedCategory]);

  if (isLoading) return <Spinner />;

  if (isError)
    return (
      <ErrorMessage message="No se pudo cargar las recetas. Verifica que el servidor esté activo." />
    );

  const hasFilters = searchText.trim() !== "" || selectedCategory !== "";

  if (!recipes || recipes.length === 0) {
    return (
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Recetas</h1>
          <Link
            to="/recipes/new"
            className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 py-2 rounded-lg transition-colors text-sm"
          >
            + Agregar receta
          </Link>
        </div>
        <p className="text-gray-500 text-center py-16">
          No hay recetas disponibles.
        </p>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Recetas</h1>
        <Link
          to="/recipes/new"
          className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 py-2 rounded-lg transition-colors text-sm"
        >
          + Agregar receta
        </Link>
      </div>

      <RecipeFilters
        searchText={searchText}
        onSearchChange={setSearchText}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categories={categories}
      />

      <p className="text-sm text-gray-500 mb-4">
        {filteredRecipes.length}{" "}
        {filteredRecipes.length === 1 ? "receta encontrada" : "recetas encontradas"}
      </p>

      {filteredRecipes.length === 0 ? (
        <div className="flex flex-col items-center py-16 gap-2">
          <p className="text-gray-500">
            No encontramos recetas con esos criterios.
          </p>
          {hasFilters && (
            <button
              onClick={() => {
                setSearchText("");
                setSelectedCategory("");
              }}
              className="text-sm text-orange-500 hover:underline"
            >
              Limpiar filtros
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </main>
  );
}
