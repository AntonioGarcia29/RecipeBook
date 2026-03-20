## Why

Los usuarios no tienen forma de compartir recetas con otras personas desde la app. Agregar un botón de compartir por WhatsApp en la página de detalle permite difundir recetas fácilmente aprovechando la API de enlaces de WhatsApp, sin requerir ningún backend adicional.

## What Changes

- Nuevo botón "Compartir por WhatsApp" en la página de detalle de receta (`RecipeDetailPage`).
- Al presionarlo, abre WhatsApp (web o app) con un mensaje pre-formateado que incluye el nombre de la receta, la categoría y el enlace canónico a `/recipes/:id`.
- El enlace se construye client-side usando `window.location.origin` + la ruta actual.

## Scope

**In Scope:**
- Botón de compartir visible en la página de detalle de receta.
- Mensaje pre-formateado con nombre, categoría y URL de la receta.
- Uso de la API de enlaces de WhatsApp (`https://wa.me/?text=...`).
- Apertura en nueva pestaña.

**Out of Scope:**
- Compartir en otras redes sociales o apps de mensajería.
- Tracking o analytics del botón.
- Personalización del mensaje por el usuario.
- Comportamiento diferente en móvil vs desktop (WhatsApp maneja esto automáticamente).

## Capabilities

### New Capabilities

- `recipe-share-whatsapp`: Botón en la página de detalle que genera y abre un enlace de WhatsApp con información de la receta.

### Modified Capabilities

_(ninguna — solo se añade UI a una página existente, sin cambios de requisitos en specs existentes)_

## Impact

- **Archivos modificados**: `src/features/recipes/pages/RecipeDetailPage.tsx` (añadir botón).
- **Sin nuevas dependencias**: usa la API de WhatsApp via URL nativa del navegador (`window.open`).
- **Sin cambios en la API**: es una funcionalidad puramente client-side.
