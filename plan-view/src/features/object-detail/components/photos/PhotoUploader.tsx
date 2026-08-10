import { useRef, useState } from "react";

import { addPhoto } from "../../../../db/repositories/photoRepository";

interface Props {
  objectId: string;
}

export function PhotoUploader({
  objectId,
}: Props) {
  const galleryInputRef =
    useRef<HTMLInputElement>(null);

  const cameraInputRef =
    useRef<HTMLInputElement>(null);

  const [showOptions, setShowOptions] =
    useState(false);

  async function handleChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    try {
      await addPhoto(
        objectId,
        file
      );

      setShowOptions(false);

    } catch (error) {
      console.error(
        "Error al guardar la fotografía:",
        error
      );
    }

    event.target.value = "";
  }

  function openGallery() {
    galleryInputRef.current?.click();
  }

  function openCamera() {
    cameraInputRef.current?.click();
  }

  return (
    <>
      {/* Selector de galería */}
      <input
        ref={galleryInputRef}
        hidden
        type="file"
        accept="image/*"
        onChange={handleChange}
      />

      {/* Selector de cámara */}
      <input
        ref={cameraInputRef}
        hidden
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleChange}
      />

      {/* Botón principal */}
      <button
        type="button"
        className="upload-card"
        onClick={() =>
          setShowOptions(true)
        }
      >
        📷
        <br />
        Agregar fotografía
      </button>

      {/* Modal de opciones */}
      {showOptions && (
        <div className="photo-options-overlay">

          <div className="photo-options">

            <h3>
              Agregar fotografía
            </h3>

            <button
              type="button"
              onClick={openCamera}
            >
              📷
              <span>
                Tomar fotografía
              </span>
            </button>

            <button
              type="button"
              onClick={openGallery}
            >
              🖼
              <span>
                Elegir de galería
              </span>
            </button>

            <button
              type="button"
              onClick={() =>
                setShowOptions(false)
              }
            >
              Cancelar
            </button>

          </div>

        </div>
      )}
    </>
  );
}