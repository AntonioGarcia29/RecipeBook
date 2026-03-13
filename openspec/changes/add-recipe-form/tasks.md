## 1. API — Mutation createRecipe

- [ ] 1.1 Agregar `createRecipe` como `builder.mutation` en `src/features/recipes/api/recipesApi.ts` con `POST /recipes` e `invalidatesTags: ["Recipes"]`
- [ ] 1.2 Exportar el hook `useCreateRecipeMutation` generado por RTK Query

## 2. Routing — Registrar la nueva ruta

- [ ] 2.1 Agregar `<Route path="/recipes/new" element={<RecipeCreatePage />} />` en `src/App.tsx` antes de la ruta `/recipes/:id`
- [ ] 2.2 Importar `RecipeCreatePage` en `App.tsx`

## 3. Validación — Schema Zod

- [ ] 3.1 Crear `src/features/recipes/schemas/recipeSchema.ts` con el schema Zod para el formulario (todos los campos de `Recipe` excepto `id`; usar `z.coerce.number()` para `prepTime`)
- [ ] 3.2 Exportar el tipo inferido `RecipeFormData` desde el schema

## 4. Página — RecipeCreatePage

- [ ] 4.1 Crear `src/features/recipes/pages/RecipeCreatePage.tsx`
- [ ] 4.2 Inicializar `useForm` con `zodResolver(recipeSchema)` y valores por defecto (ingredientes y pasos con un campo vacío inicial)
- [ ] 4.3 Registrar `useFieldArray` para `ingredients` (campo nombre: `"ingredients"`)
- [ ] 4.4 Registrar `useFieldArray` para `steps` (campo nombre: `"steps"`)
- [ ] 4.5 Renderizar campo de texto para `name` con mensaje de error de validación
- [ ] 4.6 Renderizar textarea para `description` con mensaje de error
- [ ] 4.7 Renderizar select de `category` populado con `useGetCategoriesQuery`; manejar estado de carga del select
- [ ] 4.8 Renderizar select de `difficulty` con opciones fijas: Fácil, Media, Difícil
- [ ] 4.9 Renderizar input numérico para `prepTime` con mensaje de error
- [ ] 4.10 Renderizar input de texto para `imageUrl`
- [ ] 4.11 Renderizar lista dinámica de ingredientes con botón "Agregar ingrediente" y botón de eliminar por ítem
- [ ] 4.12 Renderizar lista dinámica de pasos con botón "Agregar paso" y botón de eliminar por ítem
- [ ] 4.13 Implementar `onSubmit`: llamar `createRecipe`, esperar resultado, navegar a `/recipes/:id` con el id retornado
- [ ] 4.14 Deshabilitar el botón "Guardar" y mostrar indicador de carga mientras `isLoading` de la mutation
- [ ] 4.15 Mostrar mensaje de error global si la mutation falla
- [ ] 4.16 Implementar botón "Cancelar" que navega a `/recipes`

## 5. Listado — Agregar botón "Nueva receta"

- [ ] 5.1 Agregar un `<Link to="/recipes/new">` con estilo de botón en `src/features/recipes/pages/RecipesPage.tsx`
