## Why

El Recipe Book no tiene ninguna pantalla funcional aún. El listado de recetas es la pantalla principal de la aplicación: sin ella el usuario no puede descubrir ni acceder a ninguna receta.

## What Changes

- Nueva página `/recipes` que muestra todas las recetas disponibles en formato de cards.
- Cada card muestra: imagen, nombre, categoría, dificultad y tiempo de preparación.
- Data fetching mediante RTK Query conectado al endpoint `GET /recipes` en `http://localhost:3001/recipes`.
- Configuración inicial del store de Redux y el servicio RTK Query base.
- Ruta raíz `/` redirige a `/recipes`.

## Capabilities

### New Capabilities

- `recipe-listing`: Listado paginado/completo de recetas con cards que muestran imagen, nombre, categoría, dificultad y tiempo de preparación. Incluye estados de carga y error.

### Modified Capabilities

<!-- Sin capabilities existentes que cambien requisitos -->

## Impact

- **Nuevos archivos**: feature `recipes/`, componente `RecipeCard`, servicio RTK Query `recipesApi`, tipado `Recipe`.
- **Store**: configuración inicial de Redux store con el slice de RTK Query.
- **Routing**: configuración de React Router con ruta `/recipes`.
- **Dependencias**: `react-router-dom` (si no está instalado), RTK Query ya incluido en Redux Toolkit.
