## Why

El listado de recetas permite explorar y filtrar recetas, pero al hacer clic en una card no ocurre nada. Los usuarios necesitan acceder a la información completa de una receta individual (ingredientes, pasos, metadatos) para poder cocinarla.

## What Changes

- Nueva ruta `/recipes/:id` que renderiza la página de detalle de una receta
- Las cards del listado pasan a ser navegables (enlace a la ruta de detalle)
- Nueva query RTK Query `getRecipeById` que consume `GET /recipes/:id`
- Nueva feature `recipe-detail` con su página, componentes y lógica de datos

## Capabilities

### New Capabilities

- `recipe-detail`: Visualización completa de una receta individual — imagen grande, nombre, descripción, lista de ingredientes, pasos numerados, categoría, dificultad, tiempo de preparación y botón para volver al listado.

### Modified Capabilities

- `recipe-listing`: Las cards del listado deben ser navegables hacia la ruta de detalle `/recipes/:id`.

## Impact

- **Routing**: Nueva ruta `<Route path="/recipes/:id" />` en el router principal.
- **API**: Nuevo endpoint consumido: `GET /recipes/:id` (JSON Server ya lo soporta sin cambios).
- **RTK Query**: Nuevo endpoint `getRecipeById` en `recipesApi`.
- **Archivos afectados**: `src/app/router.tsx` (o equivalente), `src/features/recipes/recipesApi.ts`, `src/features/recipe-listing/` (navegación en cards).
- **Nuevos archivos**: `src/features/recipe-detail/` — página, componentes y tipos.
