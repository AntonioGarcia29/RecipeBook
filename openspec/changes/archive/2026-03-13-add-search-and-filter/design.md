## Context

El listado de recetas ya carga los datos via RTK Query (`getRecipes`). El filtrado se implementará **client-side** sobre la lista ya cargada, ya que JSON Server no ofrece búsqueda full-text nativa y el dataset es pequeño. Las categorías se cargan desde un nuevo endpoint `GET /categories` también via RTK Query.

## Goals / Non-Goals

**Goals:**
- Filtrado client-side por texto (nombre + descripción, case-insensitive).
- Filtrado client-side por categoría usando un dropdown poblado desde la API.
- Ambos filtros operan en combinación (AND).
- Contador de resultados en tiempo real.
- Estado vacío diferenciado cuando los filtros no producen resultados.

**Non-Goals:**
- Búsqueda server-side o con debounce (dataset pequeño, no necesario).
- Filtros por dificultad o tiempo de preparación (scope futuro).
- Persistencia de filtros en URL o localStorage.
- Paginación (scope futuro).

## Decisions

### 1. Filtrado client-side con `useMemo`

Los datos de recetas ya están cacheados en RTK Query. Filtrar en el cliente con `useMemo` es inmediato y no requiere peticiones adicionales.

**Alternativa descartada**: Query params a JSON Server (`?name_like=...`) — requeriría un endpoint por tipo de filtro, no soporta combinación fácilmente, y el servidor mock tiene limitaciones.

### 2. Estado local `useState` para los valores de filtro

`searchText` y `selectedCategory` viven en `useState` dentro de `RecipesPage`. No necesitan estar en Redux porque son estado de UI efímero, no compartido entre rutas.

**Alternativa descartada**: Redux slice para filtros — sobreingeniería para estado local de una sola página.

### 3. Endpoint `getCategories` en `recipesApi`

Se añade un segundo endpoint al api slice existente en lugar de crear un api slice separado, para mantener una sola instancia de `fetchBaseQuery`.

### 4. Componente `RecipeFilters` en `features/recipes/components/`

Encapsula el input de búsqueda y el dropdown de categoría. Recibe los valores actuales y callbacks como props. Mantiene `RecipesPage` como único punto de verdad del estado de filtros.

## Risks / Trade-offs

- **Performance con datasets grandes** → El filtrado client-side en un array de 10-50 recetas es trivial. Si el catálogo creciera a miles, habría que migrar a búsqueda server-side. Mitigación: `useMemo` previene recalculos innecesarios.
- **Categorías desincronizadas** → Si una receta tiene una categoría que no existe en `GET /categories`, el filtro no la incluirá en el dropdown pero la receta sigue visible. Esto es un problema de datos, no de la UI.
