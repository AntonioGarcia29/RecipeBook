## Why

Las recetas existentes no se pueden modificar desde la UI. Si un usuario cometió un error al crear una receta o quiere actualizarla, no tiene forma de hacerlo. El formulario de creación (en `add-recipe-form`) sienta las bases reutilizables para implementar edición con el mínimo esfuerzo adicional.

## What Changes

- Nueva ruta `/recipes/:id/edit` que renderiza un formulario pre-relleno con los datos actuales de la receta
- Mutation RTK Query `updateRecipe` que consume `PUT /recipes/:id`
- Botón "Editar" en la página de detalle que navega a `/recipes/:id/edit`
- El schema Zod definido en `add-recipe-form` se reutiliza sin modificar
- Tras guardar exitosamente, redirigir al detalle `/recipes/:id`

## Capabilities

### New Capabilities

- `recipe-edit`: Formulario pre-relleno para editar una receta existente, con los mismos campos y validaciones que el formulario de creación, persistido via `PUT /recipes/:id`.

### Modified Capabilities

- `recipe-detail`: La página de detalle SHALL incluir un botón "Editar" que navegue a `/recipes/:id/edit`.

## Impact

- **Routing**: Nueva ruta `<Route path="/recipes/:id/edit" />` en `src/App.tsx`
- **API**: Nuevo endpoint consumido: `PUT /recipes/:id` (JSON Server lo soporta sin configuración)
- **RTK Query**: Nueva mutation `updateRecipe` en `recipesApi`; invalida tag `Recipes`
- **Reutilización**: El schema Zod `recipeSchema` de `add-recipe-form` se importa desde `src/features/recipes/schemas/recipeSchema.ts`
- **Archivos afectados**: `src/App.tsx`, `src/features/recipes/api/recipesApi.ts`, `src/features/recipes/pages/RecipeDetailPage.tsx`
- **Nuevos archivos**: `src/features/recipes/pages/RecipeEditPage.tsx`
