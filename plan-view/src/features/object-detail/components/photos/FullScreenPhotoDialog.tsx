import { useEffect, useMemo, useState } from "react";
import type { ObjectPhoto } from "../../../../db/schema";
import { usePhotoZoom } from "../../hooks/usePhotoZoom";

interface Props {
  photo: ObjectPhoto | null;
  onClose: () => void;
  onDelete: (photo: ObjectPhoto) => void;
  onSetPrimary: (photo: ObjectPhoto) => void;
}

export function FullscreenPhotoDialog({ photo, onClose, onDelete, onSetPrimary }: Props) {
  const { zoom, zoomIn, reset } = usePhotoZoom();

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const imageUrl = useMemo(() => {
    if (!photo) return null;
    return URL.createObjectURL(photo.originalBlob);
  }, [photo]);

  useEffect(() => {
    return () => {
      if (imageUrl) URL.revokeObjectURL(imageUrl);
    };
  }, [imageUrl]);

  // Si no hay foto o URL, no renderizamos nada
  if (!photo || !imageUrl) return null;

  function handleDelete() {
    setShowDeleteConfirmation(false);
    onDelete(photo!); // aquí TS sabe que no es null
  }

  return (
    <div key={photo!.id} className="fullscreen-overlay">

      <button
        type="button"
        onClick={() => onSetPrimary(photo)}
        disabled={photo.isPrimary}
        aria-label="Marcar como fotografía principal"
      >
        {photo.isPrimary ? "⭐" : "☆"}
      </button>

      <button
        type="button"
        className="close-button"
        onClick={onClose}
        aria-label="Cerrar fotografía"
      >
        ✕
      </button>

      <div className="fullscreen-image-container">
        <img
          src={imageUrl}
          alt={photo!.fileName}
          className="fullscreen-image"
          style={{
            transform: `translate(${zoom.x}px, ${zoom.y}px) scale(${zoom.scale})`,
          }}
          draggable={false}
        />
      </div>

      <div className="fullscreen-toolbar">
        <button type="button" onClick={zoomIn}>🔍+</button>
        <button type="button" onClick={reset}>↺</button>
        <button type="button" onClick={() => setShowDeleteConfirmation(true)}>🗑️</button>
      </div>

      {showDeleteConfirmation && (
        <div className="delete-confirmation">
          <div className="delete-confirmation-content">
            <h3>¿Eliminar fotografía?</h3>
            <p>Esta acción no se puede deshacer.</p>
            <div className="delete-confirmation-actions">
              <button
                type="button"
                onClick={() => setShowDeleteConfirmation(false)}
              >
                Cancelar
              </button>
              <button type="button" onClick={handleDelete}>
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
