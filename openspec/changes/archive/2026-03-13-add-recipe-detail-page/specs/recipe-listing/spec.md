## MODIFIED Requirements

### Requirement: Card de receta con información esencial
Cada card de receta SHALL mostrar imagen, nombre, categoría, dificultad y tiempo de preparación, y SHALL ser navegable a la página de detalle de la receta.

#### Scenario: Card con todos los campos
- **WHEN** se renderiza una card de receta con todos los campos completos
- **THEN** la card muestra imagen, nombre, categoría, dificultad y tiempo de preparación

#### Scenario: Card con imagen fallida
- **WHEN** la imagen de la receta no carga
- **THEN** la card muestra un placeholder o imagen de fallback sin romper el layout

#### Scenario: Clic en una card
- **WHEN** el usuario hace clic en cualquier parte de la card de una receta
- **THEN** el sistema navega a `/recipes/:id` con el id de esa receta
