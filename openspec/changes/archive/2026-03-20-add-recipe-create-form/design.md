## Context

El proyecto ya cuenta con páginas de listado y detalle de recetas usando RTK Query, React Router y Tailwind CSS v4. La API expone `POST /recipes` en JSON Server. No existe ningún formulario de creación; el flujo de escritura está completamente ausente. React Hook Form y Zod están en el stack declarado pero no se usan aún.

## Goals / Non-Goals

**Goals:**
- Formulario funcional con todos los campos del modelo `Recipe`.
- Campos de ingredientes y pasos dinámicos (agregar/quitar; pasos también reordenables).
- Validación client-side con mensajes de error visibles.
- Persistencia via `POST /recipes` con RTK Query mutation.
- Navegación a `/recipes/new` y redirección a detalle tras éxito.
- Acceso desde la página de listado.

**Non-Goals:**
- Edición de recetas existentes (feature separada).
- Carga de imágenes (solo URL de texto).
- Autenticación o autorización.
- Optimistic updates.

## Decisions

### 1. React Hook Form + Zod para validación

**Decisión:** Usar `react-hook-form` con resolver Zod.
**Rationale:** Ya forma parte del stack definido. Zod permite definir el schema de validación en un solo lugar y compartirlo con los tipos TypeScript via `z.infer<>`. Alternativa (validación manual) generaría código repetitivo difícil de mantener.

### 2. `useFieldArray` para ingredientes y pasos

**Decisión:** Usar el hook `useFieldArray` de React Hook Form para los arrays dinámicos.
**Rationale:** Integración nativa con el form state y validación. Evita gestión manual de arrays con `useState`. Para pasos, se usará adicionalmente `move()` de `useFieldArray` para reordenamiento sin drag-and-drop (botones ↑/↓ simples).

### 3. RTK Query mutation en el API slice existente

**Decisión:** Agregar `createRecipe` mutation al `recipesApi` existente en lugar de crear un nuevo slice.
**Rationale:** El proyecto sigue el patrón "un API slice por feature". `recipesApi` ya tiene los endpoints de recetas; la mutation pertenece al mismo dominio. Agregar `invalidatesTags: ["Recipes"]` garantiza que el listado se actualice automáticamente.

### 4. Estructura de archivos

```
src/features/recipes/
  api/
    recipesApi.ts              ← modificar: añadir createRecipe mutation
  pages/
    CreateRecipePage.tsx       ← nuevo
  components/
    RecipeForm.tsx             ← nuevo (orquesta el formulario)
    IngredientsField.tsx       ← nuevo (campo dinámico de ingredientes)
    StepsField.tsx             ← nuevo (campo dinámico de pasos con reorden)
  schemas/
    recipeForm.schema.ts       ← nuevo (Zod schema + tipo inferido)
src/
  App.tsx                      ← modificar: añadir ruta /recipes/new
```

**Rationale:** Separar los sub-componentes de campos dinámicos mantiene `RecipeForm` legible. El schema Zod en archivo propio permite reutilización futura (ej. edición).

### 5. Navegación post-submit

**Decisión:** Redirigir a `/recipes/:id` tras éxito, usando `useNavigate` con el `id` devuelto por la API.
**Rationale:** Feedback inmediato al usuario mostrando la receta creada. El botón cancelar navega de vuelta a `/recipes`.

## Risks / Trade-offs

- **JSON Server devuelve el objeto completo con `id`** — se asume que la respuesta de `POST /recipes` incluye el `id` asignado. Si no fuera así, habría que redirigir al listado en su lugar.
- **Reordenamiento con botones ↑/↓** es funcional pero menos fluido que drag-and-drop. Aceptable para MVP; drag-and-drop puede añadirse después sin cambiar la estructura.
- **`GET /categories` para el dropdown** — la lista de categorías viene del endpoint existente. Si está vacía, el dropdown estará vacío; no hay fallback hardcodeado.
