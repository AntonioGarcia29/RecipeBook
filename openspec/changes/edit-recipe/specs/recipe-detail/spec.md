## ADDED Requirements

### Requirement: Acceso a edición desde el detalle
La página de detalle SHALL incluir un botón "Editar" que permita al usuario navegar al formulario de edición de esa receta.

#### Scenario: Botón "Editar" visible
- **WHEN** el usuario está en la página de detalle `/recipes/:id`
- **THEN** el sistema muestra un botón "Editar" claramente visible

#### Scenario: Navegación al formulario de edición
- **WHEN** el usuario hace clic en "Editar"
- **THEN** el sistema navega a `/recipes/:id/edit`
