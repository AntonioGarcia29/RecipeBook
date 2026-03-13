## Context

El proyecto tiene la base técnica lista (React + TypeScript, Vite, RTK Query, Tailwind CSS v4, Redux Toolkit) pero no tiene ninguna pantalla implementada. El store de Redux no está configurado y no hay rutas definidas. Esta es la primera feature real de la aplicación.

El mock API corre en `http://localhost:3001` con JSON Server. El endpoint `GET /recipes` devuelve el listado completo.

## Goals / Non-Goals

**Goals:**
- Configurar Redux store con RTK Query.
- Implementar `recipesApi` con el endpoint `getRecipes`.
- Crear la página `RecipesPage` y el componente `RecipeCard`.
- Configurar React Router con ruta `/recipes` y redirect desde `/`.
- Mostrar estados de carga y error adecuados.

**Non-Goals:**
- Paginación o filtrado (scope futuro).
- Búsqueda de recetas.
- Detalle de receta (pantalla aparte).
- Autenticación.

## Decisions

### 1. Estructura de carpetas: `features/recipes/`

Se adopta arquitectura por dominio. La feature `recipes` contiene su propio API slice, tipos, componentes de página y componentes específicos.

```
src/
  features/
    recipes/
      api/         ← recipesApi (RTK Query)
      components/  ← RecipeCard
      pages/       ← RecipesPage
      types.ts     ← Recipe, RecipeCategory, Difficulty
  shared/
    components/    ← UI genérica (Spinner, ErrorMessage)
  store/
    index.ts       ← Redux store
```

**Alternativa descartada**: Todo en `src/components/` — no escala bien a medida que la app crece.

### 2. RTK Query para data fetching

Se usa `createApi` de RTK Query con `fetchBaseQuery` apuntando a `http://localhost:3001`. El tag `Recipes` permite invalidación futura de caché.

**Alternativa descartada**: `useEffect` + `fetch` manual — más boilerplate, sin caché, no alineado con el stack definido.

### 3. Tailwind CSS v4 para estilos

Cards con grid responsivo usando utilidades de Tailwind directamente en JSX. Sin CSS modules.

**Alternativa descartada**: CSS modules — overhead innecesario dado que Tailwind ya está en el stack.

### 4. React Router v6 con rutas declarativas

`BrowserRouter` en `main.tsx`, rutas en `App.tsx`. Redirect de `/` a `/recipes` con `<Navigate>`.

## Risks / Trade-offs

- **CORS en desarrollo** → El mock JSON Server debe correr antes que el dev server. El script `mock` ya está en `package.json`. Mitigación: documentar en README que se deben correr ambos.
- **URL hardcodeada** → `http://localhost:3001` está fijada en el API slice. Mitigación: usar variable de entorno `VITE_API_BASE_URL` desde el inicio para facilitar despliegues futuros.
- **Sin tipos del servidor** → Los tipos `Recipe` se definen manualmente alineados con `db.json`. Si el schema cambia hay que actualizar los tipos.
