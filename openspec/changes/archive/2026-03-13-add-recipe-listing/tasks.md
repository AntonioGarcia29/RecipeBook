## 1. Dependencias y configuración base

- [x] 1.1 Verificar/instalar `react-router-dom` y añadirlo a `package.json` si no está presente
- [x] 1.2 Crear archivo `.env` con `VITE_API_BASE_URL=http://localhost:3001`
- [x] 1.3 Crear `src/store/index.ts` con la configuración del Redux store

## 2. API slice con RTK Query

- [x] 2.1 Crear `src/features/recipes/types.ts` con los tipos `Recipe`, `Difficulty` y `RecipeCategory`
- [x] 2.2 Crear `src/features/recipes/api/recipesApi.ts` con `createApi`, `fetchBaseQuery` y el endpoint `getRecipes`
- [x] 2.3 Registrar `recipesApi.reducer` y `recipesApi.middleware` en el store

## 3. Componentes

- [x] 3.1 Crear `src/shared/components/Spinner.tsx` — indicador de carga genérico
- [x] 3.2 Crear `src/shared/components/ErrorMessage.tsx` — mensaje de error genérico
- [x] 3.3 Crear `src/features/recipes/components/RecipeCard.tsx` — card con imagen, nombre, categoría, dificultad y tiempo
- [x] 3.4 Añadir manejo de imagen fallida en `RecipeCard` (atributo `onError` con placeholder)

## 4. Página y routing

- [x] 4.1 Crear `src/features/recipes/pages/RecipesPage.tsx` — usa `useGetRecipesQuery`, renderiza grid de `RecipeCard`, maneja loading/error/vacío
- [x] 4.2 Configurar `BrowserRouter` en `src/main.tsx` y envolver la app con `Provider` del store
- [x] 4.3 Definir rutas en `src/App.tsx`: `/recipes` → `RecipesPage`, `/` → `<Navigate to="/recipes" />`

## 5. Verificación

- [x] 5.1 Ejecutar `npm run mock` y `npm run dev` y verificar que el listado carga correctamente
- [x] 5.2 Verificar estado de carga visible mientras llega la respuesta
- [x] 5.3 Verificar mensaje de error al detener el mock server
- [x] 5.4 Verificar redirect de `/` a `/recipes`
