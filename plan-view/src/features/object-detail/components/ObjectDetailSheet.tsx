// Importo el array de objetos de dibujo desde el archivo de datos
import { drawingObjects } from "../../../data/drawingObjects";
// Importo el hook `useViewerStore` desde la tienda de estado para acceder al estado del visor
import { useViewerStore } from "../../../stores/viewerStore";
// Importo el hook para obtener las fotos de un objeto
import { useObjectPhotos } from "../../object-detail/hooks/useObjectPhotos";
// Importo el componente para subir fotos
import { PhotoUploader } from "../../object-detail/components/PhotoUploader";
// Importo el componente que muestra la galería de fotos
import { ObjectPhotoGallery } from "../../object-detail/components/ObjectPhotoGallery";

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

  // Si no hay objeto, devolvemos array vacío
  const photos = useObjectPhotos(object?.id ?? "");

  if (!isDetailOpen || !object) return null;

  return (
    // Renderizo un contenedor `div` que contiene el detalle del objeto seleccionado, incluyendo un botón para cerrar, el código del objeto, el componente para subir fotos, la galería de fotos y la descripción del objeto
    <div className="bottom-sheet">
      <button onClick={closeDetail}>
        Cerrar
      </button>

      <h2 className="object-title">{object.code}</h2>

      <PhotoUploader objectId={object.id} />

      <ObjectPhotoGallery photos={photos} />

      <hr />

      <p>{object.description}</p>
    </div>
  );
}
