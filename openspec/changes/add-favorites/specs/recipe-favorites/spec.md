## ADDED Requirements

### Requirement: Marcar y desmarcar receta como favorita
El sistema SHALL permitir al usuario marcar o desmarcar cualquier receta como favorita mediante un botón ❤️ disponible en la card del listado y en la página de detalle.

#### Scenario: Marcar como favorita desde el listado
- **WHEN** el usuario hace clic en el botón ❤️ de una card que no es favorita
- **THEN** el sistema marca la receta como favorita y actualiza visualmente el botón para reflejar el estado activo

#### Scenario: Desmarcar como favorita desde el listado
- **WHEN** el usuario hace clic en el botón ❤️ de una card que ya es favorita
- **THEN** el sistema desmarca la receta como favorita y actualiza visualmente el botón para reflejar el estado inactivo

#### Scenario: Marcar como favorita desde el detalle
- **WHEN** el usuario hace clic en el botón ❤️ en la página de detalle de una receta que no es favorita
- **THEN** el sistema marca la receta como favorita y actualiza visualmente el botón

#### Scenario: Desmarcar como favorita desde el detalle
- **WHEN** el usuario hace clic en el botón ❤️ en la página de detalle de una receta que ya es favorita
- **THEN** el sistema desmarca la receta y actualiza visualmente el botón

#### Scenario: El botón en la card no activa navegación
- **WHEN** el usuario hace clic en el botón ❤️ dentro de la card
- **THEN** el sistema solo togglea el estado de favorito sin navegar a la página de detalle

### Requirement: Persistencia de favoritos entre sesiones
El sistema SHALL persistir los IDs de recetas favoritas en `localStorage` de forma que sobrevivan a recargas y cierres del navegador.

#### Scenario: Favoritos persisten al recargar
- **WHEN** el usuario marca una receta como favorita y recarga la página
- **THEN** el sistema muestra la receta con el botón ❤️ en estado activo al volver a cargar

#### Scenario: Estado inicial desde localStorage
- **WHEN** el usuario abre la aplicación por primera vez en una sesión
- **THEN** el sistema carga los favoritos previamente guardados en `localStorage` y los refleja visualmente
