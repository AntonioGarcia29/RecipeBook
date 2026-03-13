## 1. Tipos y API

- [x] 1.1 Añadir tipo `Category` en `src/features/recipes/types.ts`
- [x] 1.2 Añadir endpoint `getCategories` en `recipesApi.ts` usando `GET /categories`

## 2. Componente RecipeFilters

- [x] 2.1 Crear `src/features/recipes/components/RecipeFilters.tsx` con input de búsqueda y dropdown de categorías
- [x] 2.2 El input de búsqueda debe tener placeholder descriptivo y limpiar con un botón X (o al borrar)
- [x] 2.3 El dropdown debe incluir una opción inicial "Todas las categorías" y listar las categorías de la API

## 3. Lógica de filtrado en RecipesPage

- [x] 3.1 Añadir estado `searchText` y `selectedCategory` con `useState` en `RecipesPage`
- [x] 3.2 Calcular `filteredRecipes` con `useMemo` aplicando filtro de texto (nombre + descripción, case-insensitive) y categoría en combinación AND
- [x] 3.3 Integrar `useGetCategoriesQuery` para pasar categorías al componente `RecipeFilters`
- [x] 3.4 Renderizar `RecipeFilters` en `RecipesPage` pasando valores y callbacks de filtro
- [x] 3.5 Mostrar contador "X recetas encontradas" bajo los filtros

## 4. Estado vacío por filtros

- [x] 4.1 Diferenciar en `RecipesPage` entre "sin recetas en la API" y "sin resultados por filtros activos"
- [x] 4.2 Mostrar mensaje apropiado cuando los filtros no producen resultados (p. ej. "No encontramos recetas con esos criterios")

## 5. Verificación

- [x] 5.1 Verificar búsqueda por nombre y descripción (case-insensitive)
- [x] 5.2 Verificar filtro por categoría con el dropdown
- [x] 5.3 Verificar combinación de ambos filtros
- [x] 5.4 Verificar que el contador se actualiza correctamente
- [x] 5.5 Verificar estado vacío por filtros vs. estado vacío por sin datos
