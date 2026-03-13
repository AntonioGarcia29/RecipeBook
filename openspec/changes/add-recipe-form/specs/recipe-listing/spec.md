## ADDED Requirements

### Requirement: Acceso al formulario de creación desde el listado
La página de listado SHALL incluir un botón o enlace visible que permita al usuario navegar al formulario de creación de receta en `/recipes/new`.

#### Scenario: Botón "Nueva receta" visible
- **WHEN** el usuario está en la página de listado `/recipes`
- **THEN** el sistema muestra un botón o enlace "Nueva receta" claramente visible

#### Scenario: Navegación al formulario
- **WHEN** el usuario hace clic en "Nueva receta"
- **THEN** el sistema navega a `/recipes/new`
