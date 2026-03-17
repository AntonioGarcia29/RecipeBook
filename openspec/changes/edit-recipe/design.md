## Context

`RecipeCreatePage` (en `add-recipe-form`) y `RecipeEditPage` comparten el mismo modelo de datos, schema de validación y estructura de campos. La única diferencia es que la edición precarga los valores existentes vía `useGetRecipeByIdQuery` y envía `PUT` en lugar de `POST`. JSON Server soporta `PUT /recipes/:id` sin configuración adicional.

## Goals / Non-Goals

**Goals:**
- Ruta `/recipes/:id/edit` con formulario pre-relleno de todos los campos
- Mutation `updateRecipe` con `PUT /recipes/:id` e invalidación del cache `Recipes`
- Reutilización del schema Zod `recipeSchema` (sin duplicar validaciones)
- Botón "Editar" en `RecipeDetailPage`
- Redirección a `/recipes/:id` tras guardar exitosamente
- Botón "Cancelar" que navega de vuelta sin guardar

**Non-Goals:**
- Historial de versiones de la receta
- Edición parcial / PATCH (se usa PUT completo)
- Confirmación antes de descartar cambios no guardados

## Decisions

### 1. `RecipeEditPage` independiente, no componente compartido con Create

Crear `RecipeEditPage.tsx` como página propia en lugar de extraer un `RecipeForm` compartido con `RecipeCreatePage`.

**Rationale:** El formulario de creación aún no está implementado (0 tareas completadas en `add-recipe-form`). Extraer un componente compartido ahora acoplaría dos changes en progreso y dificultaría el apply de cada uno de forma independiente. Una vez ambos estén implementados, la refactorización es trivial y opcional.

**Alternativa descartada:** Componente `RecipeForm` compartido — correcta a largo plazo, prematura ahora.

### 2. Pre-carga con `useGetRecipeByIdQuery` y `defaultValues`

Los valores del formulario se inicializan pasando los datos de la receta como `defaultValues` a `useForm`.

**Rationale:** React Hook Form aplica `defaultValues` en el primer render. Al combinar con `skipToken` (no llamar la query hasta tener el id), se evita un estado de "formulario vacío parpadeando" antes de que lleguen los datos.

### 3. `PUT` completo en lugar de `PATCH`

La mutation envía el objeto `Recipe` completo a `PUT /recipes/:id`.

**Rationale:** JSON Server implementa `PUT` de forma completa y predecible. `PATCH` con JSON Server también funciona, pero enviar el objeto completo evita bugs de campos omitidos o parcialmente actualizados. El payload es pequeño (una receta).

### 4. Botón "Editar" en `RecipeDetailPage`, no en `RecipeCard`

El acceso a la edición se coloca en la página de detalle, no en cada card del listado.

**Rationale:** La edición es una acción de mayor peso que requiere contexto completo. Colocarla en la card añadiría ruido visual al listado para una acción poco frecuente.

### 5. Redirección post-save a detalle, no al listado

Tras un `updateRecipe` exitoso, navegar a `/recipes/:id`.

**Rationale:** Consistente con `createRecipe` (que también redirige al detalle). Permite al usuario verificar inmediatamente el resultado de la edición.

## Risks / Trade-offs

- **`recipeSchema` aún no existe** → Depende de que `add-recipe-form` se implemente primero (tarea 3.1 de ese change). Si se implementa `edit-recipe` antes, hay que crear el schema en este change también.
- **`defaultValues` con arrays** → `useFieldArray` de React Hook Form requiere que `defaultValues.ingredients` y `defaultValues.steps` sean arrays de objetos `{ value: string }`, no arrays de strings directos. Hay que mapear el array de strings del tipo `Recipe` al formato interno del form al inicializar.
- **Race condition en carga** → Si el usuario navega a `/recipes/999/edit` con un id inválido, `useGetRecipeByIdQuery` retornará error. La página debe manejar este estado igual que `RecipeDetailPage`.
