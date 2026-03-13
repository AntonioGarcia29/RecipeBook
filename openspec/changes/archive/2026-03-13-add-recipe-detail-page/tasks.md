## 1. API — Extender recipesApi

- [x] 1.1 Agregar el endpoint `getRecipeById` en `src/features/recipes/api/recipesApi.ts` con query `GET /recipes/:id` que retorna `Recipe`
- [x] 1.2 Exportar el hook `useGetRecipeByIdQuery` generado por RTK Query

## 2. Routing — Registrar la nueva ruta

- [x] 2.1 Agregar `<Route path="/recipes/:id" element={<RecipeDetailPage />} />` en `src/App.tsx`
- [x] 2.2 Importar `RecipeDetailPage` en `App.tsx`

## 3. Página de detalle — RecipeDetailPage

- [x] 3.1 Crear `src/features/recipes/pages/RecipeDetailPage.tsx`
- [x] 3.2 Leer el parámetro `id` de la URL con `useParams` y llamar `useGetRecipeByIdQuery(id)`
- [x] 3.3 Renderizar estado de carga usando el componente `Spinner` existente
- [x] 3.4 Renderizar estado de error (receta no encontrada o fallo de red) con mensaje descriptivo y botón "Volver"
- [x] 3.5 Renderizar el detalle completo: imagen grande (w-full, altura fija, object-cover), nombre, descripción, categoría, dificultad y tiempo de preparación
- [x] 3.6 Renderizar lista de ingredientes (`<ul>` con bullets)
- [x] 3.7 Renderizar pasos numerados (`<ol>` con números)
- [x] 3.8 Implementar botón "Volver" que llama a `navigate(-1)` con `useNavigate`
- [x] 3.9 Aplicar fallback de imagen (`onError`) igual que en `RecipeCard`

## 4. Listado — Hacer las cards navegables

- [x] 4.1 Envolver el contenido de `RecipeCard` en un `<Link to={/recipes/${recipe.id}}>` de React Router
- [x] 4.2 Verificar que el estilo hover y el layout de la card no se rompen con el `<Link>`
