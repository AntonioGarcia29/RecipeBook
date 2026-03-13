## Why

El listado de recetas muestra todas las recetas sin ningún mecanismo de búsqueda o filtrado. A medida que crece el catálogo, el usuario necesita encontrar recetas por nombre, descripción o categoría sin tener que desplazarse por toda la lista.

## What Changes

- Nuevo campo de búsqueda de texto libre que filtra recetas por nombre y descripción (case-insensitive).
- Nuevo dropdown de categorías poblado desde `GET /categories` que filtra recetas por categoría.
- Ambos filtros operan en combinación (AND): el resultado es la intersección de ambos criterios.
- Contador de resultados visible ("X recetas encontradas") que se actualiza en tiempo real.
- Estado vacío diferenciado cuando los filtros no arrojan resultados.

## Capabilities

### New Capabilities

- `recipe-search-filter`: Búsqueda por texto y filtro por categoría sobre el listado de recetas, con contador de resultados y estado vacío.

### Modified Capabilities

- `recipe-listing`: El listado ahora recibe recetas ya filtradas/buscadas en lugar de mostrar siempre la lista completa. Se añade el requisito de mostrar el contador de resultados y un estado vacío por filtros (distinto del vacío por ausencia de datos).

## Impact

- **Modificado**: `RecipesPage` — incorpora los controles de búsqueda/filtro y la lógica de filtrado client-side.
- **Nuevo**: componente `SearchBar` en `shared/components/` o `features/recipes/components/`.
- **Nuevo**: endpoint `getCategories` en `recipesApi` usando `GET /categories`.
- **Sin nuevas dependencias**: el filtrado es client-side sobre los datos ya cargados por RTK Query.
