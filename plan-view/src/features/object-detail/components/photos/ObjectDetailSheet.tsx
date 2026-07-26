// Importo el array de objetos de dibujo desde el archivo de datos
import { drawingObjects } from "../../../../data/drawingObjects";
// Importo el hook `useViewerStore` desde la tienda de estado para acceder al estado del visor
import { useViewerStore } from "../../../../stores/viewerStore";
import { PhotoSection } from "./PhotoSection";

export function ObjectDetailSheet() {
  const {
    selectedObjectId,
    isDetailOpen,
    closeDetail,
  } = useViewerStore();

  // Hook siempre llamado, aunque luego no se renderice nada
  const object = drawingObjects.find(
    (item) => item.id === selectedObjectId
  );

  if (!isDetailOpen || !object) return null;

  return (
    // Renderizo un contenedor `div` que contiene el detalle del objeto seleccionado, incluyendo un botón para cerrar, el código del objeto, el componente para subir fotos, la galería de fotos y la descripción del objeto
    <div className="bottom-sheet">
      <button onClick={closeDetail}>
        Cerrar
      </button>

      <h2 className="object-title">{object.code}</h2>

      <PhotoSection
        objectId={object.id}
      />

      <hr />

      <p>{object.description}</p>
    </div>
  );
}
