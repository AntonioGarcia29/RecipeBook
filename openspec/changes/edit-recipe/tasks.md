## 1. API — Mutation updateRecipe

- [ ] 1.1 Agregar `updateRecipe` como `builder.mutation` en `src/features/recipes/api/recipesApi.ts` con `PUT /recipes/:id` e `invalidatesTags: ["Recipes"]`
- [ ] 1.2 Exportar el hook `useUpdateRecipeMutation`

## 2. Routing — Registrar la ruta de edición

- [ ] 2.1 Agregar `<Route path="/recipes/:id/edit" element={<RecipeEditPage />} />` en `src/App.tsx` (después de `/recipes/new` y antes de `/recipes/:id`)
- [ ] 2.2 Importar `RecipeEditPage` en `App.tsx`

## 3. Página — RecipeEditPage

- [ ] 3.1 Crear `src/features/recipes/pages/RecipeEditPage.tsx`
- [ ] 3.2 Leer `id` con `useParams` y cargar la receta con `useGetRecipeByIdQuery(Number(id))`
- [ ] 3.3 Renderizar `<Spinner />` mientras carga y `<ErrorMessage />` si hay error o la receta no existe
- [ ] 3.4 Inicializar `useForm` con `zodResolver(recipeSchema)` y `defaultValues` mapeados desde la receta cargada (mapear `ingredients: string[]` a `[{ value: string }]` y `steps: string[]` a `[{ value: string }]`)
- [ ] 3.5 Registrar `useFieldArray` para `ingredients` y `steps`
- [ ] 3.6 Renderizar todos los campos del formulario pre-rellenos (nombre, descripción, categoría, dificultad, prepTime, imageUrl, ingredientes y pasos) con la misma estructura visual que `RecipeCreatePage`
- [ ] 3.7 Implementar `onSubmit`: mapear los valores del form al tipo `Recipe` (convertir `[{ value }]` a `string[]`), llamar `updateRecipe({ id, ...data })` y navegar a `/recipes/:id` tras éxito
- [ ] 3.8 Deshabilitar el botón "Guardar" y mostrar indicador de carga mientras `isLoading` de la mutation
- [ ] 3.9 Mostrar mensaje de error global si la mutation falla
- [ ] 3.10 Implementar botón "Cancelar" que llama a `navigate(-1)`

## 4. Detalle — Botón "Editar"

- [ ] 4.1 Agregar `<Link to={`/recipes/${recipe.id}/edit`}>` con estilo de botón en `src/features/recipes/pages/RecipeDetailPage.tsx`
