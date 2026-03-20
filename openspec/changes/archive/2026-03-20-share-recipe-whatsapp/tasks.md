## 1. Implementación del botón

- [x] 1.1 Añadir función `handleShareWhatsApp` en `RecipeDetailPage.tsx` que construya el mensaje con nombre, categoría y URL (`window.location.origin + /recipes/:id`) y llame a `window.open` con `noopener,noreferrer`
- [x] 1.2 Añadir el botón "Compartir por WhatsApp" en el JSX de `RecipeDetailPage.tsx`, junto a los metadatos de la receta

## 2. Verificación

- [x] 2.1 Verificar en el navegador que el botón es visible en la página de detalle
- [x] 2.2 Verificar que al hacer clic se abre WhatsApp Web con el mensaje correcto (nombre, categoría y URL de la receta)
- [x] 2.3 Verificar que la URL generada usa el origen correcto del navegador
