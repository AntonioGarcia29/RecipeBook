## 1. favoritesSlice — Estado y persistencia

- [ ] 1.1 Crear `src/features/recipes/store/favoritesSlice.ts` con `initialState` que lee de `localStorage` (`JSON.parse(localStorage.getItem("favorites") ?? "[]")`)
- [ ] 1.2 Definir la action `toggleFavorite(recipeId: number)` que agrega o quita el id del array
- [ ] 1.3 Exportar el reducer por defecto y el action creator `toggleFavorite`
- [ ] 1.4 Exportar el selector `selectIsFavorite(state, recipeId)` que retorna `boolean`

## 2. Store — Montar el slice y persistencia

- [ ] 2.1 Agregar `favoritesReducer` al `configureStore` en `src/store/index.ts`
- [ ] 2.2 Añadir `store.subscribe` en `src/main.tsx` (o en el store) que serialice `store.getState().favorites` a `localStorage` en cada cambio

## 3. RecipeCard — Botón ❤️ sin activar navegación

- [ ] 3.1 Importar `useDispatch` y `useSelector` en `RecipeCard.tsx`
- [ ] 3.2 Agregar el botón ❤️ dentro del `<Link>` con `onClick={(e) => { e.preventDefault(); dispatch(toggleFavorite(recipe.id)); }}`
- [ ] 3.3 Leer `isFavorite` con `selectIsFavorite` y cambiar el estilo visual del botón (relleno vs contorno) según el estado

## 4. RecipeDetailPage — Botón ❤️

- [ ] 4.1 Importar `useDispatch` y `useSelector` en `RecipeDetailPage.tsx`
- [ ] 4.2 Agregar el botón ❤️ en la sección de metadatos (junto a dificultad y tiempo)
- [ ] 4.3 Conectar el botón a `toggleFavorite` y mostrar estado visual correcto con `selectIsFavorite`

## 5. RecipeFilters — Toggle "Solo favoritos"

- [ ] 5.1 Agregar props `showOnlyFavorites: boolean` y `onFavoritesChange: (value: boolean) => void` a la interfaz `RecipeFiltersProps`
- [ ] 5.2 Renderizar un botón toggle o checkbox con etiqueta "❤️ Solo favoritos" en la barra de filtros
- [ ] 5.3 Aplicar estilo diferenciado cuando el filtro está activo

## 6. RecipesPage — Integrar filtro de favoritos

- [ ] 6.1 Agregar `const [showOnlyFavorites, setShowOnlyFavorites] = useState(false)` en `RecipesPage`
- [ ] 6.2 Leer `favoriteIds` desde el store con `useSelector` (como `Set<number>` derivado para lookup O(1))
- [ ] 6.3 Agregar criterio `!showOnlyFavorites || favoriteIds.has(recipe.id)` al `useMemo` de `filteredRecipes`
- [ ] 6.4 Incluir `showOnlyFavorites` en la variable `hasFilters`
- [ ] 6.5 Pasar `showOnlyFavorites` y `onFavoritesChange={setShowOnlyFavorites}` a `<RecipeFilters>`
- [ ] 6.6 Resetear `showOnlyFavorites` en el manejador "Limpiar filtros"
