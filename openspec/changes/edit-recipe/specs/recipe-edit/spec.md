## ADDED Requirements

### Requirement: Formulario de edición pre-relleno
El sistema SHALL mostrar un formulario en `/recipes/:id/edit` con todos los campos de la receta pre-rellenos con los valores actuales obtenidos de `GET /recipes/:id`.

#### Scenario: Formulario accesible con datos pre-rellenos
- **WHEN** el usuario navega a `/recipes/:id/edit` con un id válido
- **THEN** el sistema muestra el formulario con todos los campos (nombre, descripción, categoría, dificultad, tiempo, imagen, ingredientes y pasos) pre-rellenos con los valores actuales de la receta

#### Scenario: Estado de carga del formulario
- **WHEN** la petición a `GET /recipes/:id` está en curso
- **THEN** el sistema muestra un indicador de carga antes de renderizar el formulario

#### Scenario: Receta no encontrada al editar
- **WHEN** el usuario navega a `/recipes/:id/edit` con un id que no existe
- **THEN** el sistema muestra un mensaje de error y un botón para volver

### Requirement: Guardar cambios de la receta
El sistema SHALL persistir los cambios mediante `PUT /recipes/:id` al enviar el formulario con datos válidos.

#### Scenario: Envío exitoso
- **WHEN** el usuario modifica campos y envía el formulario con datos válidos
- **THEN** el sistema actualiza la receta via `PUT /recipes/:id` y redirige a `/recipes/:id`

#### Scenario: Estado de envío en curso
- **WHEN** la petición `PUT /recipes/:id` está en curso
- **THEN** el sistema deshabilita el botón "Guardar" y muestra un indicador de progreso

#### Scenario: Error al guardar
- **WHEN** la petición `PUT /recipes/:id` falla
- **THEN** el sistema muestra un mensaje de error y permite reintentar sin perder los cambios del formulario

### Requirement: Validación de campos en edición
El sistema SHALL aplicar las mismas validaciones que el formulario de creación antes de enviar.

#### Scenario: Campos requeridos vacíos
- **WHEN** el usuario elimina el contenido de un campo requerido e intenta enviar
- **THEN** el sistema muestra mensajes de error de validación sin enviar la petición

### Requirement: Cancelar edición
La página de edición SHALL incluir un botón "Cancelar" que descarte los cambios y vuelva a la pantalla anterior.

#### Scenario: Cancelar sin guardar
- **WHEN** el usuario hace clic en "Cancelar"
- **THEN** el sistema navega de vuelta sin enviar ninguna petición
