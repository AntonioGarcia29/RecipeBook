## Why

Los usuarios del libro de recetas no tienen forma de agregar nuevas recetas desde la UI. Actualmente solo pueden consultar recetas existentes, por lo que se necesita un formulario de creación para completar el flujo básico de gestión de contenido.

## What Changes

- Nuevo componente `RecipeForm` con campos: nombre, descripción, ingredientes (lista dinámica), pasos de preparación (lista dinámica con reordenamiento), categoría (dropdown), dificultad (Fácil/Media/Difícil), tiempo de preparación y URL de imagen.
- Nueva página `CreateRecipePage` que aloja el formulario y gestiona la navegación post-envío.
- Nueva ruta `/recipes/new` registrada en el router de la aplicación.
- Integración con `POST /recipes` via RTK Query mutation.
- Validación de todos los campos requeridos con mensajes de error claros usando React Hook Form + Zod.
- Enlace/botón de acceso desde la página de listado de recetas.

## Scope

**In Scope:**
- Formulario de creación de recetas con todos los campos del modelo `Recipe`.
- Validación client-side de campos requeridos con mensajes de error.
- Campos dinámicos para ingredientes (agregar/quitar) y pasos (agregar/quitar/reordenar con botones ↑/↓).
- Dropdown de categoría poblado desde `GET /categories`.
- Persistencia via `POST /recipes` con RTK Query mutation.
- Redirección a la página de detalle tras éxito.
- Botón "Agregar receta" en la página de listado.

**Out of Scope:**
- Edición de recetas existentes (feature separada).
- Eliminación de recetas.
- Carga/subida de archivos de imagen (solo URL de texto).
- Autenticación o autorización de usuarios.
- Optimistic updates o caché offline.
- Drag-and-drop para reordenar pasos.

## Capabilities

### New Capabilities

- `recipe-create`: Formulario completo para crear una nueva receta con campos dinámicos de ingredientes y pasos, validación y persistencia via API.

### Modified Capabilities

- `recipe-listing`: Se añade un botón/enlace "Agregar receta" que navega a `/recipes/new`.

## Impact

- **Nuevos archivos**: `src/features/recipes/pages/CreateRecipePage.tsx`, `src/features/recipes/components/RecipeForm.tsx`, campos dinámicos como `IngredientsField.tsx` y `StepsField.tsx`.
- **Archivos modificados**: `src/features/recipes/api/recipesApi.ts` (nuevo mutation endpoint), `src/app/router.tsx` o equivalente (nueva ruta), `RecipeListingPage.tsx` (botón de acceso).
- **Dependencias**: React Hook Form, Zod (ya presentes en el stack).
- **API**: `POST /recipes` en JSON Server (endpoint ya disponible).
