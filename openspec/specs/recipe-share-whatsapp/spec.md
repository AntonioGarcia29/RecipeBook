### Requirement: Botón de compartir por WhatsApp en detalle de receta
La página de detalle de receta SHALL mostrar un botón "Compartir por WhatsApp" que al ser presionado abra WhatsApp con un mensaje pre-formateado que incluya el nombre de la receta, la categoría y el enlace a la página de detalle.

#### Scenario: Botón visible en la página de detalle
- **WHEN** el usuario navega a `/recipes/:id` y la receta carga correctamente
- **THEN** el sistema muestra el botón "Compartir por WhatsApp" en la página

#### Scenario: Clic en el botón de compartir
- **WHEN** el usuario hace clic en el botón "Compartir por WhatsApp"
- **THEN** el sistema abre una nueva pestaña con la URL de WhatsApp que contiene un mensaje pre-formateado con el nombre de la receta, la categoría y el enlace a la receta

### Requirement: Mensaje pre-formateado de WhatsApp
El mensaje generado SHALL incluir el nombre de la receta, la categoría y la URL completa de la página de detalle. La URL SHALL usar el origen actual del navegador para construir el enlace.

#### Scenario: Contenido del mensaje
- **WHEN** el usuario hace clic en "Compartir por WhatsApp" en la receta "Tacos de canasta" de categoría "Plato Fuerte"
- **THEN** el mensaje de WhatsApp contiene el nombre "Tacos de canasta", la categoría "Plato Fuerte" y la URL `<origin>/recipes/<id>`

#### Scenario: URL de la receta en el mensaje
- **WHEN** el sistema construye el enlace de la receta
- **THEN** la URL usa `window.location.origin` como base más la ruta `/recipes/:id`
