## ADDED Requirements

### Requirement: Formulario de creación de receta
El sistema SHALL proveer un formulario en la ruta `/recipes/new` para crear una nueva receta con los campos: nombre, descripción, categoría, dificultad, tiempo de preparación, URL de imagen, lista de ingredientes y lista de pasos.

#### Scenario: Formulario accesible
- **WHEN** el usuario navega a `/recipes/new`
- **THEN** el sistema muestra el formulario de creación con todos los campos visibles

#### Scenario: Envío exitoso
- **WHEN** el usuario completa todos los campos requeridos y envía el formulario
- **THEN** el sistema crea la receta via `POST /recipes` y redirige al detalle de la receta recién creada

#### Scenario: Estado de envío en curso
- **WHEN** la petición `POST /recipes` está en curso
- **THEN** el sistema deshabilita el botón de envío y muestra un indicador de progreso

#### Scenario: Error al guardar
- **WHEN** la petición `POST /recipes` falla
- **THEN** el sistema muestra un mensaje de error y permite al usuario reintentar sin perder los datos del formulario

### Requirement: Validación de campos requeridos
El sistema SHALL validar que nombre, descripción, categoría, dificultad, tiempo de preparación, al menos un ingrediente y al menos un paso estén presentes antes de enviar.

#### Scenario: Intento de envío con campos vacíos
- **WHEN** el usuario intenta enviar el formulario con campos requeridos vacíos
- **THEN** el sistema muestra mensajes de error de validación junto a cada campo inválido sin enviar la petición

#### Scenario: Tiempo de preparación no numérico
- **WHEN** el usuario ingresa un valor no numérico o negativo en el campo de tiempo de preparación
- **THEN** el sistema muestra un mensaje de error de validación para ese campo

### Requirement: Campos dinámicos de ingredientes y pasos
El sistema SHALL permitir agregar y eliminar elementos de las listas de ingredientes y pasos de forma dinámica.

#### Scenario: Agregar ingrediente
- **WHEN** el usuario hace clic en "Agregar ingrediente"
- **THEN** el sistema añade un nuevo campo de texto vacío a la lista de ingredientes

#### Scenario: Eliminar ingrediente
- **WHEN** el usuario hace clic en el botón de eliminar junto a un ingrediente
- **THEN** el sistema elimina ese campo de la lista

#### Scenario: Agregar paso
- **WHEN** el usuario hace clic en "Agregar paso"
- **THEN** el sistema añade un nuevo campo de texto vacío a la lista de pasos numerados

#### Scenario: Eliminar paso
- **WHEN** el usuario hace clic en el botón de eliminar junto a un paso
- **THEN** el sistema elimina ese paso de la lista

### Requirement: Cancelar creación
La página de creación SHALL incluir un control que permita al usuario cancelar y volver al listado sin guardar.

#### Scenario: Botón cancelar
- **WHEN** el usuario hace clic en "Cancelar"
- **THEN** el sistema navega de vuelta al listado `/recipes` sin enviar ninguna petición
