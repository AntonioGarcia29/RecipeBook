## Why

Los usuarios no tienen forma de marcar recetas que les gustaron ni de filtrar el listado para ver solo sus favoritas. Agregar un sistema de favoritos convierte el libro de recetas en una herramienta personalizada, no solo un catálogo.

## What Changes

- Nueva acción "marcar/desmarcar favorito" disponible en la card del listado y en la página de detalle
- Nuevo filtro "❤️ Solo favoritos" en el listado que se combina con búsqueda y categoría
- Estado de favoritos persistido en `localStorage` (sin backend — no hay sistema de usuarios)
- Nuevo `favoritesSlice` de Redux Toolkit para gestionar el estado global de favoritos
- El botón ❤️ en `RecipeCard` usa `e.preventDefault()` para no activar la navegación del `<Link>`

## Capabilities

### New Capabilities

- `recipe-favorites`: Marcar y desmarcar recetas como favoritas desde el listado y el detalle, con persistencia en localStorage y filtro combinable en el listado.

### Modified Capabilities

- `recipe-listing`: El listado SHALL incluir un filtro "Solo favoritos" que se combine con los filtros existentes de búsqueda y categoría. El botón "Limpiar filtros" también debe limpiar este filtro.
- `recipe-detail`: La página de detalle SHALL incluir un botón para marcar/desmarcar la receta como favorita.

## Impact

- **Nuevo archivo**: `src/features/recipes/store/favoritesSlice.ts` — slice RTK con `toggleFavorite` e hidratación desde localStorage
- **Store**: `src/store/index.ts` — agregar `favoritesReducer`
- **Componentes modificados**: `RecipeCard` (botón ❤️ con stopPropagation), `RecipeFilters` (toggle favoritos), `RecipeDetailPage` (botón ❤️)
- **Página modificada**: `RecipesPage` — nuevo estado `showOnlyFavorites`, actualización de `filteredRecipes` y `hasFilters`
- **Sin cambios en API**: JSON Server no se modifica; no se necesita nuevo endpoint
- **Sin nuevas dependencias**: `@reduxjs/toolkit` ya está instalado
