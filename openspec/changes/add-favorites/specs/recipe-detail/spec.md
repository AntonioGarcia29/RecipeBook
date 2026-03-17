## ADDED Requirements

### Requirement: Botón de favorito en la página de detalle
La página de detalle SHALL incluir un botón ❤️ visible que permita al usuario marcar o desmarcar la receta actual como favorita, reflejando el estado actual del favorito al cargar la página.

#### Scenario: Botón ❤️ visible en el detalle
- **WHEN** el usuario navega a `/recipes/:id`
- **THEN** el sistema muestra el botón ❤️ en la página de detalle

#### Scenario: Estado inicial refleja favorito guardado
- **WHEN** el usuario navega a `/recipes/:id` de una receta ya marcada como favorita
- **THEN** el botón ❤️ se muestra en estado activo

#### Scenario: Estado inicial de receta no favorita
- **WHEN** el usuario navega a `/recipes/:id` de una receta que no está en favoritos
- **THEN** el botón ❤️ se muestra en estado inactivo
