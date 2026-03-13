## ADDED Requirements

### Requirement: Mostrar listado de recetas
El sistema SHALL mostrar todas las recetas disponibles obtenidas del endpoint `GET /recipes` en formato de grid de cards.

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

### Requirement: Card de receta con información esencial
Cada card de receta SHALL mostrar imagen, nombre, categoría, dificultad y tiempo de preparación.

#### Scenario: Card con todos los campos
- **WHEN** se renderiza una card de receta con todos los campos completos
- **THEN** la card muestra imagen, nombre, categoría, dificultad y tiempo de preparación

#### Scenario: Card con imagen fallida
- **WHEN** la imagen de la receta no carga
- **THEN** la card muestra un placeholder o imagen de fallback sin romper el layout

### Requirement: Navegación a la página de recetas
El sistema SHALL redirigir la ruta raíz `/` a `/recipes`.

#### Scenario: Acceso a la raíz
- **WHEN** el usuario navega a `/`
- **THEN** el sistema redirige automáticamente a `/recipes`

#### Scenario: Acceso directo a /recipes
- **WHEN** el usuario navega directamente a `/recipes`
- **THEN** el sistema muestra la página de listado de recetas
