// FullscreenPhotoDialog.tsx
// Este componente muestra una foto en pantalla completa. Se asegura de que los hooks se llamen siempre, incluso si la foto es null, y maneja la creación y revocación de URLs de objetos correctamente.
import type { ObjectPhoto } from "../../../../db/schema";
import { useMemo, useEffect } from "react";

interface Props {
  photo: ObjectPhoto | null;
  onClose(): void;
}

export function FullscreenPhotoDialog({ photo, onClose }: Props) {
  // Hook siempre llamado, aunque photo sea null
  const url = useMemo(() => {
    return photo ? URL.createObjectURL(photo.blob) : "";
  }, [photo]);

  useEffect(() => {
    if (!url) return;
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [url]);

  // Render condicional después de los hooks
  if (!photo) return null;

  return (
    <div className="fullscreen-overlay">
      <button className="close-button" onClick={onClose}>
        ✕
      </button>
      <img src={url} alt="" className="fullscreen-image" />
    </div>
  );
}
