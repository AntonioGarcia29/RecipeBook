## ADDED Requirements

### Requirement: Filtro de solo favoritos en el listado
El sistema SHALL incluir un control de filtro "Solo favoritos" en la barra de filtros del listado que, al activarse, muestre únicamente las recetas marcadas como favoritas. Este filtro SHALL ser combinable con los filtros de búsqueda por texto y categoría.

#### Scenario: Activar filtro de favoritos
- **WHEN** el usuario activa el filtro "Solo favoritos"
- **THEN** el sistema muestra únicamente las cards de recetas que están marcadas como favoritas

#### Scenario: Filtro favoritos combinado con categoría
- **WHEN** el usuario activa "Solo favoritos" y selecciona una categoría
- **THEN** el sistema muestra solo las recetas favoritas que pertenecen a esa categoría

#### Scenario: Filtro favoritos combinado con búsqueda
- **WHEN** el usuario activa "Solo favoritos" e introduce texto de búsqueda
- **THEN** el sistema muestra solo las recetas favoritas cuyo nombre o descripción coincide con el texto

#### Scenario: Sin favoritos con filtro activo
- **WHEN** el usuario activa "Solo favoritos" y no tiene ninguna receta marcada como favorita
- **THEN** el sistema muestra el mensaje de "No encontramos recetas con esos criterios"

## MODIFIED Requirements

### Requirement: Mostrar listado de recetas
El sistema SHALL mostrar las recetas que satisfacen los criterios de búsqueda y filtro activos obtenidas del endpoint `GET /recipes` en formato de grid de cards. El botón "Limpiar filtros" SHALL resetear también el filtro de solo favoritos cuando esté activo.

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
- **WHEN** el usuario aplica criterios de búsqueda o filtro activos
- **THEN** el sistema muestra únicamente las cards de recetas que satisfacen dichos criterios

#### Scenario: Limpiar filtros incluye favoritos
- **WHEN** el usuario hace clic en "Limpiar filtros" con el filtro de solo favoritos activo
- **THEN** el sistema resetea todos los filtros incluyendo "Solo favoritos" y muestra todas las recetas
