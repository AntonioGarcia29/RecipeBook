## MODIFIED Requirements

### Requirement: Mostrar listado de recetas
El sistema SHALL mostrar las recetas que satisfacen los criterios de búsqueda y filtro activos en formato de grid de cards. Cuando no hay filtros activos, muestra todas las recetas disponibles.

#### Scenario: Listado cargado correctamente
- **WHEN** el usuario navega a `/recipes`
- **THEN** el sistema muestra un grid de cards con todas las recetas retornadas por la API

#### Scenario: Estado de carga
- **WHEN** la petición al endpoint está en curso
- **THEN** el sistema muestra un indicador de carga visible

#### Scenario: Error de red o del servidor
- **WHEN** la petición al endpoint falla
- **THEN** el sistema muestra un mensaje de error descriptivo

#### Scenario: Sin recetas disponibles
- **WHEN** la API retorna un array vacío
- **THEN** el sistema muestra un mensaje indicando que no hay recetas disponibles

#### Scenario: Listado filtrado
- **WHEN** el usuario aplica filtros de búsqueda o categoría
- **THEN** el sistema muestra únicamente las cards de las recetas que cumplen los criterios activos
