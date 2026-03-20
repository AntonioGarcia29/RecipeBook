## ADDED Requirements

### Requirement: Formulario de creación de receta
El sistema SHALL proveer un formulario accesible en `/recipes/new` con los campos: nombre, descripción, ingredientes (lista dinámica), pasos de preparación (lista dinámica con reordenamiento), categoría (dropdown), dificultad (selector Fácil/Media/Difícil), tiempo de preparación (número en minutos) y URL de imagen.

#### Scenario: Acceso a la página de creación
- **WHEN** el usuario navega a `/recipes/new`
- **THEN** el sistema muestra el formulario de creación con todos los campos vacíos y los botones "Guardar" y "Cancelar"

#### Scenario: Renderizado del dropdown de categorías
- **WHEN** el formulario carga correctamente
- **THEN** el dropdown de categoría muestra las opciones obtenidas desde `GET /categories`

### Requirement: Gestión dinámica de ingredientes
El sistema SHALL permitir agregar y quitar ingredientes individualmente mediante botones de acción.

#### Scenario: Agregar ingrediente
- **WHEN** el usuario hace clic en "Agregar ingrediente"
- **THEN** el sistema añade un nuevo campo de texto vacío a la lista de ingredientes

#### Scenario: Quitar ingrediente
- **WHEN** el usuario hace clic en el botón de eliminar junto a un ingrediente
- **THEN** el sistema remueve ese ingrediente de la lista

#### Scenario: Lista de ingredientes vacía
- **WHEN** el usuario intenta enviar el formulario sin ningún ingrediente
- **THEN** el sistema muestra un mensaje de error indicando que se requiere al menos un ingrediente

### Requirement: Gestión dinámica de pasos de preparación
El sistema SHALL permitir agregar, quitar y reordenar pasos de preparación individualmente.

#### Scenario: Agregar paso
- **WHEN** el usuario hace clic en "Agregar paso"
- **THEN** el sistema añade un nuevo campo de texto vacío al final de la lista de pasos

#### Scenario: Quitar paso
- **WHEN** el usuario hace clic en el botón de eliminar junto a un paso
- **THEN** el sistema remueve ese paso de la lista y renumera los pasos restantes

#### Scenario: Reordenar paso hacia arriba
- **WHEN** el usuario hace clic en el botón ↑ junto a un paso que no sea el primero
- **THEN** el sistema intercambia ese paso con el anterior en la lista

#### Scenario: Reordenar paso hacia abajo
- **WHEN** el usuario hace clic en el botón ↓ junto a un paso que no sea el último
- **THEN** el sistema intercambia ese paso con el siguiente en la lista

#### Scenario: Lista de pasos vacía
- **WHEN** el usuario intenta enviar el formulario sin ningún paso
- **THEN** el sistema muestra un mensaje de error indicando que se requiere al menos un paso

### Requirement: Validación de campos requeridos
El sistema SHALL validar todos los campos requeridos y SHALL mostrar mensajes de error claros antes de permitir el envío del formulario.

#### Scenario: Campos requeridos vacíos al intentar enviar
- **WHEN** el usuario intenta enviar el formulario con campos requeridos vacíos
- **THEN** el sistema muestra mensajes de error junto a cada campo inválido sin enviar la petición

#### Scenario: Nombre demasiado corto
- **WHEN** el usuario ingresa un nombre con menos de 3 caracteres
- **THEN** el sistema muestra un mensaje de error indicando la longitud mínima requerida

#### Scenario: Tiempo de preparación inválido
- **WHEN** el usuario ingresa un valor no numérico o menor o igual a cero en el campo de tiempo
- **THEN** el sistema muestra un mensaje de error indicando que debe ser un número positivo

#### Scenario: Formulario válido
- **WHEN** todos los campos requeridos están completos y son válidos
- **THEN** el sistema habilita el envío sin mostrar errores de validación

### Requirement: Persistencia de la receta via API
El sistema SHALL enviar los datos del formulario a `POST /recipes` al confirmar el envío y SHALL manejar los estados de carga y error de la operación.

#### Scenario: Envío exitoso
- **WHEN** el usuario envía un formulario válido
- **THEN** el sistema realiza una petición `POST /recipes` con los datos del formulario, invalida la caché de recetas y redirige al usuario a la página de detalle de la receta creada

#### Scenario: Estado de carga durante envío
- **WHEN** la petición `POST /recipes` está en curso
- **THEN** el sistema muestra un indicador de carga y deshabilita el botón "Guardar" para evitar envíos duplicados

#### Scenario: Error de servidor al guardar
- **WHEN** la petición `POST /recipes` falla con un error del servidor
- **THEN** el sistema muestra un mensaje de error descriptivo al usuario sin navegar fuera del formulario

### Requirement: Cancelación del formulario
El sistema SHALL permitir al usuario cancelar la creación y volver al listado sin guardar cambios.

#### Scenario: Clic en cancelar
- **WHEN** el usuario hace clic en el botón "Cancelar"
- **THEN** el sistema navega a `/recipes` sin enviar ninguna petición a la API
