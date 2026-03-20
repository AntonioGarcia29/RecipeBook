# Pre-Implementation Review

## Security
- [x] La URL de WhatsApp se construye con `encodeURIComponent` para evitar inyección de caracteres especiales en el mensaje.
- [x] `window.open` se llama con `noopener,noreferrer` para evitar que la nueva pestaña acceda al contexto de la página origen.
- [x] No se transmiten datos a servidores propios; el mensaje viaja directamente a WhatsApp via URL.

## Performance
- [x] Sin peticiones de red adicionales ni estado nuevo — la lógica es O(1) en el momento del clic.
- [x] Sin imports pesados; `window.open` es nativo del browser.

## Accessibility
- [x] El botón debe tener texto visible descriptivo ("Compartir por WhatsApp") y no depender solo del ícono.
- [x] Agregar `rel="noopener noreferrer"` implícito via `window.open` (ya cubierto en seguridad).
- [x] El botón debe ser operable con teclado (es un `<button>` nativo o `<a>`, no un `<div>` clickeable).

## Testing
- [x] Verificar manualmente que al hacer clic se abre WhatsApp Web en desktop con el mensaje correcto.
- [x] Verificar que el mensaje incluye nombre, categoría y URL de la receta.
- [x] Verificar en móvil que abre la app nativa de WhatsApp.
- [x] Verificar que la URL generada es correcta (`origin + /recipes/:id`).

## Notes

Cambio de alcance muy reducido (un solo archivo modificado). El riesgo es mínimo y no requiere cambios en la API ni en el store. Listo para implementar.
