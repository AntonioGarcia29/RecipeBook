## Context

La app no tiene sistema de usuarios ni autenticación. Los favoritos son por tanto preferencias del navegador local, no de una cuenta. El store actual solo tiene `recipesApi` (RTK Query); no existe slice de estado local. Los filtros del listado (`searchText`, `selectedCategory`) viven como `useState` en `RecipesPage` y se aplican via `useMemo`.

## Goals / Non-Goals

**Goals:**
- `favoritesSlice` de RTK que gestiona `number[]` (IDs de recetas favoritas)
- Persistencia automática en `localStorage` al modificar el slice
- Hidratación del estado inicial desde `localStorage` al arrancar la app
- Botón ❤️ en `RecipeCard` (con `e.preventDefault` para no activar el `<Link>`) y en `RecipeDetailPage`
- Filtro "Solo favoritos" en `RecipeFilters` combinable con búsqueda y categoría
- `hasFilters` en `RecipesPage` incluye `showOnlyFavorites` para que "Limpiar filtros" lo resetee

**Non-Goals:**
- Sincronización de favoritos entre dispositivos o sesiones
- Endpoint en JSON Server para favoritos
- Favoritos asociados a un usuario/cuenta
- Límite máximo de favoritos

## Decisions

### 1. `favoritesSlice` con estado `number[]`, no `Set`

El estado del slice almacena los IDs favoritos como `number[]` en lugar de `Set<number>`.

**Rationale:** Redux requiere estado serializable. `Set` no es serializable por defecto, lo que causaría warnings en `redux-devtools` y rompería la persistencia en JSON. Se usa `Array.includes()` o se crea un `Set` derivado solo al leer (en selectores), no al almacenar.

**Alternativa descartada:** `Record<number, boolean>` — más verbose sin ventaja real para este caso.

### 2. Persistencia manual en `localStorage`, sin `redux-persist`

La sincronización con `localStorage` se hace mediante un listener en el store (`store.subscribe`) en lugar de añadir `redux-persist` como dependencia.

**Rationale:** `redux-persist` añade ~13KB gzip y configuración de transformers/migrations para un caso trivial: solo hay que serializar un array de números. Un `store.subscribe` de 3 líneas es suficiente y elimina una dependencia.

### 3. Hidratación del estado inicial en la definición del slice

El `initialState` del slice lee directamente de `localStorage` en el momento en que el módulo se importa.

```ts
const stored = localStorage.getItem("favorites");
const initialState: number[] = stored ? JSON.parse(stored) : [];
```

**Rationale:** Es el patrón más simple. No requiere un action de "HYDRATE" ni middleware. Funciona porque el módulo se importa una sola vez al montar la app.

### 4. `showOnlyFavorites` como `useState` local en `RecipesPage`

El toggle "Solo favoritos" vive como estado local en `RecipesPage`, igual que `searchText` y `selectedCategory`, no como estado global en Redux.

**Rationale:** Es estado de UI efímero — no necesita persistir entre páginas ni compartirse con otros componentes. Mantenerlo local sigue el patrón ya establecido en el componente.

### 5. `e.preventDefault()` en el botón ❤️ dentro de `RecipeCard`

El botón dentro del `<Link>` necesita `e.preventDefault()` para evitar la navegación al hacer clic en el corazón.

**Rationale:** `<Link>` renderiza un `<a>`. Al hacer clic en cualquier elemento hijo, el browser sigue el href. `e.preventDefault()` cancela ese comportamiento predeterminado del anchor sin necesidad de `stopPropagation`.

### 6. Ubicar `favoritesSlice` en `features/recipes/store/`

El slice vive en `src/features/recipes/store/favoritesSlice.ts` en lugar de `src/store/`.

**Rationale:** Los favoritos son un concepto del dominio de recetas. `src/store/` es solo el punto de montaje global; la lógica de cada feature pertenece a su feature.

## Risks / Trade-offs

- **`localStorage` no disponible (SSR/privado)** → La app es CSR (Vite), no hay SSR. En modo privado algunos browsers sí permiten `localStorage`. Riesgo mínimo; se puede envolver en try/catch si es necesario.
- **IDs de recetas cambian en el JSON Server** → Si se reinicia el servidor con datos frescos y los IDs cambian, los favoritos guardados apuntarán a recetas distintas. Aceptable para un mock; en producción los IDs serían estables en base de datos.
- **Array vs Set para lookup** → `Array.includes()` es O(n). Con 10 recetas en el mock es irrelevante. Si el catálogo creciera a miles de recetas, se justificaría un selector que retorne `Set<number>`.
