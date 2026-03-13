## ADDED Requirements

### Requirement: Mostrar detalle completo de una receta
El sistema SHALL mostrar todos los datos de una receta individual en la ruta `/recipes/:id`, obtenidos del endpoint `GET /recipes/:id`.

#### Scenario: Carga exitosa del detalle
- **WHEN** el usuario navega a `/recipes/:id` con un id válido
- **THEN** el sistema muestra la imagen grande, nombre, descripción, lista de ingredientes, pasos numerados, categoría, dificultad y tiempo de preparación de la receta

#### Scenario: Estado de carga
- **WHEN** la petición a `GET /recipes/:id` está en curso
- **THEN** el sistema muestra un indicador de carga visible

#### Scenario: Receta no encontrada
- **WHEN** el usuario navega a `/recipes/:id` con un id que no existe en la API
- **THEN** el sistema muestra un mensaje de error indicando que la receta no fue encontrada

#### Scenario: Error de red o del servidor
- **WHEN** la petición a `GET /recipes/:id` falla por error de red o del servidor
- **THEN** el sistema muestra un mensaje de error descriptivo

### Requirement: Imagen de la receta con fallback
La imagen de la receta SHALL mostrarse en tamaño grande; si no carga, SHALL mostrarse una imagen de placeholder sin romper el layout.

#### Scenario: Imagen cargada correctamente
- **WHEN** la URL de imagen de la receta es válida y accesible
- **THEN** la imagen se muestra en tamaño completo (ancho 100%, altura fija) en la parte superior del detalle

#### Scenario: Imagen no disponible
- **WHEN** la URL de imagen no carga
- **THEN** el sistema muestra un placeholder sin romper la estructura de la página

### Requirement: Navegación de vuelta al listado
La página de detalle SHALL incluir un control de navegación que lleve al usuario de vuelta a la pantalla anterior.

#### Scenario: Botón "Volver" visible
- **WHEN** el usuario está en la página de detalle `/recipes/:id`
- **THEN** el sistema muestra un botón o enlace "Volver" claramente visible

#### Scenario: Acción de volver
- **WHEN** el usuario hace clic en el botón "Volver"
- **THEN** el sistema navega a la pantalla anterior (historial del navegador)
