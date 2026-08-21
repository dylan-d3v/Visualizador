# Plan View Interactive PWA

## 1. Resumen del Proyecto

Esta aplicación es una PWA orientada a agilizar la consulta de elementos identificados dentro de planos técnicos. Permite visualizar un plano, seleccionar objetos mediante marcadores interactivos y asociar fotografías almacenadas localmente a cada objeto para evitar la búsqueda manual de imágenes en la galería.

El proyecto está pensado principalmente para uso desde teléfonos, aunque también debe funcionar correctamente en escritorio.

## 2. Stack Tecnológico

* **Frontend:** React + TypeScript + Vite
* **Backend:** No existe backend actualmente. La aplicación funciona de forma local/offline mediante IndexedDB.
* **Librerías/Dependencias Clave:**
  * **Dexie:** acceso y gestión de IndexedDB.
  * **dexie-react-hooks:** consultas reactivas mediante `useLiveQuery`.
  * **Zustand:** estado global del visor, incluyendo la selección y apertura del detalle de objetos.
  * **Tailwind CSS:** estilos de la interfaz.
  * **PWA:** la aplicación está planteada como Progressive Web App para poder instalarse y utilizarse desde dispositivos móviles.
* **Persistencia:** IndexedDB mediante Dexie.
* **Archivos de planos:** actualmente se utiliza una imagen `.webp` del plano. La conversión de PDF a imagen es una funcionalidad futura, no implementada todavía.

## 3. Estructura del Proyecto

La estructura principal sigue una organización por funcionalidades:

```text
src/
├── db/
│   ├── database.ts
│   ├── schema.ts
│   └── repositories/
│       ├── photoRepository.ts
│       └── drawingObjectRepository.ts
│
├── data/
│   └── drawingObjects.ts
│
├── features/
│   ├── drawing/
│   │   ├── components/
│   │   └── hooks/
│   │
│   └── object-detail/
│       ├── components/
│       └── hooks/
│
├── stores/
│   └── viewerStore.ts
│
└── pages/
    └── ViewerPage.tsx
```

### Componentes importantes

* `ViewerPage.tsx`: controla el plano seleccionado y el modo de visualización/edición.
* `DrawingSelector.tsx`: permite seleccionar el plano.
* `DrawingViewer.tsx`: muestra el plano en modo normal.
* `DrawingEditor.tsx`: interfaz de edición del plano.
* `DrawingCanvas.tsx`: componente compartido que muestra el plano y sus objetos.
* `DrawingObject.tsx`: marcador interactivo de cada objeto.
* `ObjectDetailSheet.tsx`: muestra el detalle del objeto seleccionado.
* `PhotoSection.tsx` / `PhotoUploader.tsx`: gestionan las fotografías asociadas a los objetos.
* `NewObjectForm.tsx`: formulario para crear objetos manualmente desde el editor.

## 4. Estado Actual (Lo que ya está listo)

### Planos

* Existe un sistema de selección de planos.
* `ViewerPage` mantiene el `selectedDrawingId`.
* El plano seleccionado se obtiene desde IndexedDB mediante `useDrawing`.
* `DrawingViewer` recibe el `drawingId` y muestra el plano correspondiente.
* Los planos se almacenan en IndexedDB.
* Actualmente el plano de prueba se maneja como imagen `.webp`.

### Objetos del plano

* Los objetos tienen, entre otros campos, `id`, `drawingId`, `code`, `description`, `x`, `y` y `createdAt`.
* Los objetos se almacenan en IndexedDB.
* `useDrawingObjects` obtiene los objetos asociados al plano.
* Los marcadores se renderizan sobre el plano utilizando coordenadas normalizadas:
  * `x = 0` representa el extremo izquierdo.
  * `x = 1` representa el extremo derecho.
  * `y = 0` representa la parte superior.
  * `y = 1` representa la parte inferior.
* Los objetos pueden seleccionarse en el modo de visualización.
* La selección abre `ObjectDetailSheet`.

### Fotografías

* Cada objeto puede tener fotografías asociadas.
* Las fotografías se almacenan localmente en IndexedDB como `Blob`.
* Existe un repositorio `photoRepository.ts` para agregar, eliminar y consultar fotografías.
* La primera fotografía de un objeto se marca automáticamente como principal.
* Existe `PhotoUploader` para seleccionar una imagen desde el dispositivo.
* La visualización y gestión de fotografías ya está integrada en el detalle del objeto.

### Editor manual

* `DrawingEditor` ya está integrado en `ViewerPage`.
* Existe un modo `👁 Ver` y un modo `✏️ Editar`.
* En modo edición, los objetos pueden seleccionarse.
* Al tocar un punto vacío del plano se calculan coordenadas normalizadas `x` e `y`.
* Se creó `NewObjectForm`.
* El usuario puede tocar un punto vacío, introducir código y descripción y guardar un nuevo objeto.
* Los nuevos objetos se persisten en IndexedDB mediante `drawingObjectRepository.ts`.
* Después de guardar, el nuevo objeto aparece automáticamente gracias a `useLiveQuery`.
* La prueba de captura de coordenadas fue realizada correctamente.
* La creación manual de objetos y su persistencia en IndexedDB fue probada y funciona correctamente.

### Arquitectura actual del editor

```text
ViewerPage
    │
    ├── DrawingSelector
    │
    ├── 👁 Ver
    │      └── DrawingViewer
    │              └── DrawingCanvas
    │
    └── ✏️ Editar
           └── DrawingEditor
                   └── DrawingCanvas
                          ├── plano
                          └── CanvasObjects
                                  └── DrawingObject
```

`DrawingCanvas` es compartido por el visor y el editor.

## 5. El Foco Inmediato (El próximo paso)

El proyecto se quedó justo antes de implementar correctamente la funcionalidad para **mover objetos existentes en el editor**.

La siguiente funcionalidad debe permitir:

1. Entrar en `✏️ Editar`.
2. Mantener pulsado/arrastrar un marcador existente.
3. Mover visualmente el marcador sobre el plano.
4. Convertir la posición final a coordenadas normalizadas `x` e `y`.
5. Guardar la nueva posición en IndexedDB.
6. Actualizar automáticamente la interfaz mediante `useLiveQuery`.

### Consideración importante

Se comenzó a preparar esta funcionalidad mediante `PointerEvent` para soportar:

* Mouse.
* Touch.
* Stylus.

Sin embargo, **la implementación de movimiento todavía no debe considerarse terminada ni probada**.

La idea técnica deseada es evitar escribir continuamente en IndexedDB durante cada `pointermove`. La versión final debería preferiblemente:

```text
pointerdown
    ↓
dragging
    ↓
actualización visual/local
    ↓
pointerup
    ↓
UNA escritura en IndexedDB
```

Esto es especialmente importante porque la aplicación debe ser mobile first.

### Funcionalidades futuras previstas

Después de completar el movimiento de objetos:

* Editar código y descripción de objetos.
* Eliminar objetos.
* Capturar fotografías directamente con la cámara.
* Eliminar fotografías.
* Marcar una fotografía como principal.
* Ver fotografías a pantalla completa con zoom.
* Mejorar la interfaz mobile first.
* Corregir y optimizar el comportamiento actual en teléfonos.
* Detección automática de objetos en planos.
* Analizar el texto/códigos rojos y los cuadros rojos del plano para generar objetos automáticamente.
* Permitir cargar nuevos planos.
* Posiblemente aceptar PDF como entrada y convertirlo a una imagen procesable.
* Mantener una opción manual de edición aunque se implemente detección automática.

La detección automática y la importación de PDF son ideas posteriores. No deben implementarse antes de estabilizar el editor manual.

## 6. Reglas de Código

* Prefiero componentes funcionales pequeños.
* Comenta solo la lógica compleja; el código debe ser autoexplicativo.
* Escribe las variables en inglés y los comentarios en español.
* Mantener TypeScript y tipado explícito cuando aporte claridad.
* Mantener la separación entre componentes, hooks, repositorios y estado global.
* Las operaciones de IndexedDB deben pasar preferiblemente por repositorios, no realizarse directamente desde los componentes.
* Utilizar coordenadas normalizadas `x` e `y` entre `0` y `1`, no coordenadas absolutas en píxeles.
* Priorizar compatibilidad con touch/mobile.
* No introducir un backend mientras no sea necesario: el objetivo actual es mantener el proyecto gratuito y local/offline.
* No reemplazar funcionalidades existentes que ya funcionan sin una razón técnica clara.
* Antes de modificar arquitectura existente, revisar cómo están conectados actualmente los componentes.
* Cuando una funcionalidad se implemente, probarla antes de continuar con la siguiente.
