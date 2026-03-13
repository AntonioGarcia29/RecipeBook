### Requirement: Búsqueda por texto
El sistema SHALL permitir al usuario filtrar recetas en tiempo real introduciendo texto en un campo de búsqueda, comparando contra el nombre de la receta.

#### Scenario: Búsqueda con resultados
- **WHEN** el usuario escribe texto en el campo de búsqueda
- **THEN** el sistema muestra únicamente las recetas cuyo nombre contiene el texto introducido

#### Scenario: Búsqueda sin resultados
- **WHEN** el texto introducido no coincide con ningún nombre de receta
- **THEN** el sistema muestra el estado vacío por filtros

### Requirement: Filtro por categoría
El sistema SHALL permitir al usuario filtrar recetas seleccionando una categoría de una lista de categorías disponibles.

#### Scenario: Filtro aplicado
- **WHEN** el usuario selecciona una categoría
- **THEN** el sistema muestra únicamente las recetas que pertenecen a esa categoría

#### Scenario: Sin filtro de categoría
- **WHEN** el usuario no ha seleccionado ninguna categoría o deselecciona la activa
- **THEN** el sistema no aplica restricción por categoría

### Requirement: Filtros combinados
El sistema SHALL aplicar simultáneamente el filtro de texto y el de categoría cuando ambos están activos.

#### Scenario: Búsqueda y categoría activas
- **WHEN** el usuario ha introducido texto en la búsqueda y ha seleccionado una categoría
- **THEN** el sistema muestra únicamente las recetas que satisfacen ambos criterios a la vez

### Requirement: Contador de resultados
El sistema SHALL mostrar el número de recetas que satisfacen los criterios de búsqueda y filtro activos.

#### Scenario: Contador actualizado
- **WHEN** cambia cualquier criterio de búsqueda o filtro
- **THEN** el contador se actualiza para reflejar la cantidad de recetas actualmente visibles

### Requirement: Estado vacío por filtros
El sistema SHALL mostrar un mensaje específico cuando los filtros activos no producen ningún resultado.

#### Scenario: Sin resultados por filtros
- **WHEN** los criterios de búsqueda o filtro activos no coinciden con ninguna receta
- **THEN** el sistema muestra un mensaje indicando que no hay recetas que coincidan con los filtros aplicados
