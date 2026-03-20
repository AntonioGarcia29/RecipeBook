## ADDED Requirements

### Requirement: Acceso al formulario de creación desde el listado
El sistema SHALL mostrar un botón o enlace "Agregar receta" visible en la página de listado que navegue a `/recipes/new`.

#### Scenario: Botón visible en la página de listado
- **WHEN** el usuario navega a `/recipes`
- **THEN** el sistema muestra un botón "Agregar receta" en la página de listado

#### Scenario: Clic en "Agregar receta"
- **WHEN** el usuario hace clic en el botón "Agregar receta"
- **THEN** el sistema navega a `/recipes/new`
