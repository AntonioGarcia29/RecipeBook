## ADDED Requirements

### Requirement: Búsqueda por texto
El sistema SHALL filtrar las recetas visibles por nombre y descripción cuando el usuario escribe en el campo de búsqueda, de forma case-insensitive.

#### Scenario: Búsqueda por nombre
- **WHEN** el usuario escribe texto en el campo de búsqueda
- **THEN** el sistema muestra únicamente las recetas cuyo nombre o descripción contiene el texto introducido (case-insensitive)

#### Scenario: Búsqueda vacía
- **WHEN** el campo de búsqueda está vacío
- **THEN** el sistema muestra todas las recetas sin filtrar por texto

#### Scenario: Sin coincidencias de texto
- **WHEN** el texto buscado no coincide con ninguna receta
- **THEN** el sistema muestra el estado vacío de filtros con un mensaje apropiado

### Requirement: Filtro por categoría
El sistema SHALL permitir filtrar recetas por categoría usando un dropdown poblado desde el endpoint `GET /categories`.

#### Scenario: Selección de categoría
- **WHEN** el usuario selecciona una categoría del dropdown
- **THEN** el sistema muestra únicamente las recetas que pertenecen a esa categoría

#### Scenario: Opción "Todas las categorías"
- **WHEN** el usuario selecciona la opción por defecto del dropdown ("Todas")
- **THEN** el sistema no aplica filtro de categoría

#### Scenario: Categorías cargadas desde API
- **WHEN** el componente se monta
- **THEN** el dropdown de categorías muestra las categorías retornadas por `GET /categories`

### Requirement: Filtros combinados
El sistema SHALL aplicar búsqueda por texto y filtro por categoría simultáneamente usando lógica AND.

#### Scenario: Combinación de texto y categoría
- **WHEN** el usuario ha escrito texto en la búsqueda y ha seleccionado una categoría
- **THEN** el sistema muestra únicamente las recetas que satisfacen ambos criterios

#### Scenario: Sin resultados por combinación
- **WHEN** la combinación de texto y categoría no produce resultados
- **THEN** el sistema muestra el estado vacío de filtros

### Requirement: Contador de resultados
El sistema SHALL mostrar en todo momento cuántas recetas cumplen los criterios de filtrado activos.

#### Scenario: Contador con filtros activos
- **WHEN** hay filtros aplicados
- **THEN** el sistema muestra "X recetas encontradas" donde X es el número de recetas visibles

#### Scenario: Contador sin filtros
- **WHEN** no hay filtros activos
- **THEN** el sistema muestra el total de recetas disponibles

### Requirement: Estado vacío por filtros
El sistema SHALL mostrar un mensaje diferenciado cuando los filtros activos no producen resultados, distinto del estado vacío por ausencia de datos.

#### Scenario: Estado vacío de filtros
- **WHEN** los filtros activos no coinciden con ninguna receta
- **THEN** el sistema muestra un mensaje indicando que no se encontraron recetas con esos criterios
