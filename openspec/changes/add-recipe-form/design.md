## Context

El proyecto expone un listado de recetas con filtros y una página de detalle. Toda la interacción es de lectura. Para crear recetas se necesita un formulario con validación, campos dinámicos (listas de ingredientes y pasos) y una mutation que persista via `POST /recipes`. El stack ya prevé `react-hook-form` + `zod` para formularios y `@hookform/resolvers` para conectarlos.

## Goals / Non-Goals

**Goals:**
- Formulario en `/recipes/new` con todos los campos del tipo `Recipe`
- Validación client-side con Zod antes de enviar
- Campos dinámicos para agregar/quitar ingredientes y pasos
- Mutation RTK Query `createRecipe` con invalidación de cache `Recipes`
- Redirección al detalle `/recipes/:id` tras guardar exitosamente
- Botón de acceso en la página del listado

**Non-Goals:**
- Upload de imagen (solo URL de texto)
- Autocompletado o sugerencias de ingredientes
- Borrador / guardado local antes de enviar
- Edición de recetas existentes (change separado)

## Decisions

### 1. React Hook Form + Zod para validación

Usar `react-hook-form` con resolver `@hookform/resolvers/zod` en lugar de validación manual o Formik.

**Rationale:** El stack lo prevé explícitamente. RHF minimiza re-renders; Zod garantiza tipos inferidos y reutiliza la lógica de validación como schema compartido.

### 2. `useFieldArray` para ingredientes y pasos

Usar `useFieldArray` de React Hook Form para gestionar las listas dinámicas de ingredientes y pasos en lugar de estado local con `useState`.

**Rationale:** `useFieldArray` integra las listas directamente en el form context, garantizando validación y registro automático. Evita sincronizar dos fuentes de estado.

### 3. Mutation `createRecipe` en `recipesApi` existente

Agregar el endpoint como `builder.mutation` en el mismo `createApi`, con `invalidatesTags: ["Recipes"]`.

**Rationale:** Mantiene un único slice por dominio. La invalidación automática asegura que el listado se refresque tras crear una receta.

### 4. Ruta `/recipes/new` antes de `/recipes/:id`

Registrar la ruta `/recipes/new` antes de `/recipes/:id` en el router.

**Rationale:** React Router evalúa rutas en orden. Si `:id` va primero, "new" sería interpretado como un id numérico inválido, causando un error 404 en la API.

### 5. Categorías desde la API (`useGetCategoriesQuery`)

El campo categoría se popula con los datos de `GET /categories` en lugar de un enum hardcodeado.

**Rationale:** Los valores de categoría ya existen en la API y son los mismos que usa el filtro del listado. Reutilizar la query evita duplicar la lista y garantiza consistencia.

### 6. Redirección post-submit a detalle

Tras `createRecipe` exitoso, navegar a `/recipes/:id` usando el id retornado por la API.

**Rationale:** Muestra al usuario el resultado inmediato de su acción y confirma que la receta fue guardada correctamente.

## Risks / Trade-offs

- **JSON Server genera `id` automáticamente** → el objeto retornado en `POST /recipes` incluye el `id` asignado; se puede usar directamente para la redirección.
- **Campos de tipo `number` en el formulario** → los inputs HTML siempre retornan strings. El schema Zod debe coercionar `prepTime` a number con `z.coerce.number()`.
- **Listado vacío de categorías** → si `GET /categories` falla, el select quedará vacío. Mostrar un estado de error o deshabilitar el campo mientras carga.
- **Ruta `/recipes/new` vs `/recipes/:id`** → mitigado por el orden de registro en el router (Decisión 4).
