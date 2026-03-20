## Context

La página de detalle (`RecipeDetailPage`) ya muestra toda la información de la receta. El cambio es puramente aditivo: un botón que construye una URL de WhatsApp y la abre en una nueva pestaña. No requiere estado, ni API calls, ni nuevas dependencias.

## Goals / Non-Goals

**Goals:**
- Botón "Compartir por WhatsApp" visible en la página de detalle.
- URL de WhatsApp generada client-side con nombre, categoría y enlace de la receta.
- Sin dependencias externas adicionales.

**Non-Goals:**
- Otras plataformas de compartir.
- Tracking del botón.
- Personalización del mensaje.

## Decisions

### 1. API de WhatsApp via URL (`wa.me`)

**Decisión:** Usar `https://wa.me/?text=<encoded>` con `window.open(..., '_blank')`.
**Rationale:** Es el mecanismo estándar y oficial. No requiere SDK, credenciales ni CORS. WhatsApp redirige automáticamente a la app nativa en móvil y a WhatsApp Web en desktop.
**Alternativa descartada:** Web Share API — no está soportada en todos los browsers y no garantiza abrir WhatsApp específicamente.

### 2. Construcción de la URL de la receta

**Decisión:** `${window.location.origin}/recipes/${recipe.id}` generado en el momento del clic.
**Rationale:** No hay configuración de dominio base en el proyecto. `window.location.origin` es la forma más simple y portable para obtener el origen actual sin hardcodear la URL.

### 3. Sin componente separado

**Decisión:** El botón se añade directamente en `RecipeDetailPage` sin extraer un componente `ShareButton`.
**Rationale:** Es un único botón con lógica trivial (una línea). Crear un componente sería over-engineering para este caso. Si en el futuro se añaden más opciones de compartir, entonces se justifica extraerlo.

### 4. Archivos modificados

```
src/features/recipes/pages/RecipeDetailPage.tsx   ← añadir botón de compartir
```

## Risks / Trade-offs

- **[Bloqueadores de pop-ups]** → El `window.open` puede ser bloqueado si no se llama directamente desde un evento de usuario. Mitigación: el clic del botón es el evento directo, lo que evita el bloqueo en la mayoría de browsers.
- **[URL local en desarrollo]** → El enlace generado apuntará a `localhost` si se prueba en dev. Mitigación: comportamiento esperado; en producción apuntará al dominio real.
