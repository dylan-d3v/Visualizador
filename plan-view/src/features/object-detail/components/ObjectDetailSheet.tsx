import { drawingObjects } from "../../../data/drawingObjects";
import { useViewerStore } from "../../../stores/viewerStore";
// Componente que muestra los detalles del objeto seleccionado en una hoja inferior (bottom sheet)
export function ObjectDetailSheet() {
  const {
    selectedObjectId,
    isDetailOpen,
    closeDetail,
  } = useViewerStore();

  if (!isDetailOpen) return null;

  const object = drawingObjects.find(
    (item) => item.id === selectedObjectId
  );

  if (!object) return null;

  return (
    <div className="bottom-sheet">

      <button
        onClick={closeDetail}
      >
        Cerrar
      </button>

      <h2>{object.code}</h2>

      <p>{object.description}</p>

      <hr />

      <p>Aquí aparecerán las fotos.</p>

    </div>
  );
}