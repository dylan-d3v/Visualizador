// PhotoCard sirve para mostrar una foto de un objeto en un formato de tarjeta, con la capacidad de hacer clic en ella para realizar alguna acción (por ejemplo, abrirla en un visor más grande). Además, si la foto es la principal del objeto, se muestra un distintivo especial.
// Importo el tipo `ObjectPhoto` desde el archivo de esquema para tipar las props del componente
import type { ObjectPhoto } from "../../../../db/schema";
import { useMemo, useEffect } from "react";

interface Props {
  photo: ObjectPhoto;
  onClick: () => void;
}

export function PhotoCard({
  photo,
  onClick,
}: Props) {
    // Uso useMemo para crear una URL de objeto a partir del blob de la foto, y solo recalcularla si el blob cambia
  const imageUrl = useMemo(
    () => URL.createObjectURL(photo.blob),
    [photo.blob]
  );

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(imageUrl);
    };
  }, [imageUrl]);

  return (
    <button
      type="button"
      className="photo-card"
      onClick={onClick}
    >

      <img
        src={imageUrl}
        alt={photo.fileName}
      />

      {photo.isPrimary && (
        <div className="photo-primary-badge">
          ⭐
        </div>
      )}

    </button>
  );
}