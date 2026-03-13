## Why

La aplicación solo permite explorar recetas existentes; no hay forma de añadir nuevas desde la UI. Agregar un formulario de creación convierte el libro de recetas en una herramienta activa en lugar de solo un catálogo de solo lectura.

## What Changes

- Nueva ruta `/recipes/new` que renderiza un formulario de creación de receta
- Formulario con campos: nombre, descripción, categoría (select desde API), dificultad (select), tiempo de preparación, URL de imagen, ingredientes (lista dinámica) y pasos (lista dinámica)
- Validación de campos con Zod y React Hook Form
- Mutación RTK Query `createRecipe` que consume `POST /recipes`
- Botón "Nueva receta" en el listado que navega a `/recipes/new`
- Tras guardar exitosamente, redirigir al detalle de la receta creada

## Capabilities

### New Capabilities

- `recipe-create`: Formulario para crear una nueva receta individual con validación, campos dinámicos (ingredientes y pasos) y persistencia via API.

### Modified Capabilities

- `recipe-listing`: El listado SHALL incluir un acceso visible (botón o enlace) para navegar al formulario de creación `/recipes/new`.

## Impact

- **Routing**: Nueva ruta `<Route path="/recipes/new" />` antes de `/recipes/:id` para evitar conflicto de parámetros.
- **API**: Nuevo endpoint consumido: `POST /recipes` (JSON Server ya lo soporta).
- **RTK Query**: Nueva mutation `createRecipe` en `recipesApi`; invalidar tag `Recipes` al crear.
- **Dependencias nuevas**: `react-hook-form`, `zod`, `@hookform/resolvers` (ya previstas en el stack).
- **Archivos afectados**: `src/App.tsx`, `src/features/recipes/api/recipesApi.ts`, `src/features/recipes/` (nueva página y componentes), `src/features/recipes/pages/RecipesPage.tsx` (botón de acceso).
