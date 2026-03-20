## Why

Las recetas de prueba (IDs 11 y 12) tienen problemas de calidad de datos: descripción informal, ingredientes sin cantidades ni formato consistente, nombre sin capitalización adecuada y URL de imagen rota. Las recetas de referencia (IDs 1–10) son consistentes entre sí y sirven como guía de estilo.

## What Changes

Correcciones en `db.json` para las recetas con problemas de formato:

**Receta ID 11 — "Tacos de canasta":**
- `description`: reemplazar "Unos tacos bien pinches ricos" por descripción apropiada.
- `ingredients`: añadir cantidades y formato consistente ("Tortilla" → "12 tortillas de maíz", "Carne" → "500g carne de cerdo o res guisada").
- `imageUrl`: reemplazar URL de Google redirect rota por URL de placeholder funcional.

**Receta ID 12 — "Tacos de canasta poblanos":**
- `name`: capitalizar consistentemente ("Tacos de canasta poblanos" → "Tacos de Canasta Poblanos").
- `description`: añadir mayúscula inicial ("tacos poblanos" → "Tacos de canasta estilo poblano...").
- `ingredients`: añadir cantidad ("tortilla" → "12 tortillas de maíz").

## Capabilities

### New Capabilities

_(ninguna)_

### Modified Capabilities

_(ninguna — son correcciones de datos, no cambios de comportamiento del sistema)_

## Impact

- **Archivo modificado**: `db.json` únicamente.
- Sin cambios en código fuente, componentes ni API.
- Las recetas corregidas se verán mejor en el listado y detalle de la app.
