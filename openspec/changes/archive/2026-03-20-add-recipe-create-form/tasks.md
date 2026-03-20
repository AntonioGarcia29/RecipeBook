## 1. Validación y Schema

- [x] 1.1 Instalar dependencias `react-hook-form` y `zod` si no están presentes (`npm install react-hook-form zod @hookform/resolvers`)
- [x] 1.2 Crear `src/features/recipes/schemas/recipeForm.schema.ts` con el schema Zod para todos los campos del formulario (nombre min 3 chars, descripción, ingredientes array min 1, pasos array min 1, categoría, dificultad, prepTime positivo, imageUrl)

## 2. API — Mutation de creación

- [x] 2.1 Añadir el endpoint `createRecipe` (mutation builder) en `src/features/recipes/api/recipesApi.ts` usando `POST /recipes` con `invalidatesTags: ["Recipes"]`
- [x] 2.2 Exportar el hook `useCreateRecipeMutation` desde `recipesApi.ts`

## 3. Componentes de campos dinámicos

- [x] 3.1 Crear `src/features/recipes/components/IngredientsField.tsx` — lista dinámica con botones "Agregar ingrediente" y eliminar por item, integrado con `useFieldArray`
- [x] 3.2 Crear `src/features/recipes/components/StepsField.tsx` — lista dinámica con botones "Agregar paso", eliminar, ↑ y ↓ por item, integrado con `useFieldArray`

## 4. Formulario principal

- [x] 4.1 Crear `src/features/recipes/components/RecipeForm.tsx` — orquesta todos los campos usando `useForm` con resolver Zod, llama a `useGetCategoriesQuery` para el dropdown, muestra mensajes de error por campo, botones "Guardar" y "Cancelar"
- [x] 4.2 Integrar `IngredientsField` y `StepsField` dentro de `RecipeForm` pasando el `control` del form

## 5. Página de creación

- [x] 5.1 Crear `src/features/recipes/pages/CreateRecipePage.tsx` — usa `useCreateRecipeMutation`, maneja estado de carga (deshabilitar botón), maneja error del servidor (mostrar mensaje), redirige a `/recipes/:id` tras éxito con `useNavigate`

## 6. Routing

- [x] 6.1 Añadir la ruta `/recipes/new` en `src/App.tsx` con el componente `CreateRecipePage` (debe declararse antes de `/recipes/:id` para evitar conflictos de matching)

## 7. Integración en listado

- [x] 7.1 Añadir botón/enlace "Agregar receta" en `src/features/recipes/pages/RecipesPage.tsx` que navega a `/recipes/new`

## 8. Verificación visual

- [x] 8.1 Verificar en el navegador: navegar a `/recipes` → clic en "Agregar receta" → rellenar formulario → guardar → redirige al detalle de la receta creada
- [x] 8.2 Verificar validaciones: intentar enviar con campos vacíos y confirmar que los mensajes de error aparecen correctamente
- [x] 8.3 Verificar campos dinámicos: agregar, quitar y reordenar ingredientes y pasos correctamente
