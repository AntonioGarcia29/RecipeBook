## Context

El proyecto tiene una única ruta `/recipes` con listado y filtros. Al hacer clic en una `RecipeCard` no ocurre nada porque las cards no son navegables. El tipo `Recipe` ya contiene todos los campos necesarios (`ingredients`, `steps`, `category`, `difficulty`, `prepTime`, `imageUrl`). JSON Server expone `GET /recipes/:id` sin configuración adicional. La arquitectura sigue el patrón `features/<dominio>/` con páginas, componentes y API separados.

## Goals / Non-Goals

**Goals:**
- Nueva ruta `/recipes/:id` con página de detalle completa
- Cards del listado navegables mediante `<Link>` de React Router
- Nuevo endpoint RTK Query `getRecipeById` reutilizando `recipesApi` existente
- Página de detalle con: imagen grande, nombre, descripción, ingredientes, pasos numerados, categoría, dificultad, tiempo y botón "Volver"

**Non-Goals:**
- Edición o eliminación de recetas
- Compartir o guardar recetas en favoritos
- Comentarios o valoraciones
- Precarga (prefetch) de recetas al hacer hover en el listado

## Decisions

### 1. Colocar `RecipeDetailPage` en `features/recipes/`

La feature `recipe-detail` vive dentro de `features/recipes/` (como `pages/RecipeDetailPage.tsx`) en lugar de crear un directorio separado `features/recipe-detail/`.

**Rationale:** El modelo de datos y la API son compartidos — ambas páginas operan sobre el tipo `Recipe` y `recipesApi`. Separar en un directorio propio no aporta cohesión; agrupa mejor por dominio.

**Alternativa descartada:** `features/recipe-detail/` — introduce duplicación de imports de tipos y API entre features.

### 2. Extender `recipesApi` con `getRecipeById`

Agregar el endpoint `getRecipeById` al `createApi` existente en lugar de crear un segundo `createApi`.

**Rationale:** RTK Query recomienda un único `createApi` por dominio. Tener un segundo slice duplicaría el `reducerPath` y el cache.

### 3. Navegación con `<Link>` en `RecipeCard`

Envolver el `<article>` de `RecipeCard` en un `<Link to={/recipes/${recipe.id}}>` de React Router en lugar de usar `useNavigate` con `onClick`.

**Rationale:** `<Link>` es semánticamente correcto (permite clic medio, accesibilidad, SEO), mientras que `onClick + useNavigate` no.

### 4. Botón "Volver" con `useNavigate(-1)`

Usar `navigate(-1)` en lugar de un `<Link to="/recipes">` fijo.

**Rationale:** Preserva el estado del scroll y los filtros activos en el listado. Si el usuario llega desde un enlace externo directo, `-1` cae en `/recipes` igualmente porque es la única ruta previa.

### 5. Sin layout compartido por ahora

La `RecipeDetailPage` no introduce un `Layout` compartido con header/footer global; mantiene la misma estructura de `RecipesPage` (contenedor centrado dentro de `min-h-screen bg-gray-50`).

**Rationale:** El proyecto aún no tiene requisito de layout global. Extraer un componente `Layout` sería sobre-ingeniería prematura.

## Risks / Trade-offs

- **`GET /recipes/:id` no existe en `db.json`** → JSON Server lo soporta automáticamente si el campo `id` existe en cada objeto. Sin riesgo real, pero hay que verificar que `db.json` esté bien formado.
- **Imagen rota en detalle** → Mismo patrón `onError` que `RecipeCard`; usar el mismo placeholder `placehold.co`.
- **ID inválido en URL** → Si el usuario navega a `/recipes/999` y no existe, RTK Query devuelve error. La página debe manejar el estado `isError` mostrando un mensaje y el botón "Volver".
