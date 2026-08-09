import { useEffect, useMemo } from "react";
import { useGesture } from "@use-gesture/react";

import type { ObjectPhoto } from "../../../../db/schema";
import { usePhotoZoom } from "../../hooks/usePhotoZoom";

interface Props {
  photo: ObjectPhoto | null;
  onClose: () => void;
}

export function FullscreenPhotoDialog({
  photo,
  onClose,
}: Props) {
  const {
    zoom,
    setScale,
    zoomIn,
    reset,
    setPosition,
  } = usePhotoZoom();

  const imageUrl = useMemo(() => {
    if (!photo) {
      return null;
    }

    return URL.createObjectURL(photo.blob);
  }, [photo]);

  useEffect(() => {
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);

  useEffect(() => {
    reset();
  }, [photo?.id, reset]);

  const bind = useGesture({
    onDrag: ({ offset: [x, y] }) => {
      if (zoom.scale <= 1) {
        return;
      }

      setPosition(x, y);
    },

    onPinch: ({ offset: [scale] }) => {
  setScale(scale);
},
    onDoubleClick: () => {
      if (zoom.scale > 1) {
        reset();
      } else {
        zoomIn();
      }
    },
  });

  if (!photo || !imageUrl) {
    return null;
  }

  return (
    <div className="fullscreen-overlay">
      <button
        type="button"
        className="close-button"
        onClick={onClose}
        aria-label="Cerrar"
      >
        ✕
      </button>

      <div
        className="fullscreen-image-container"
        {...bind()}
      >
        <img
          src={imageUrl}
          alt={photo.fileName}
          className="fullscreen-image"
          style={{
            transform: `
              translate(${zoom.x}px, ${zoom.y}px)
              scale(${zoom.scale})
            `,
          }}
          draggable={false}
        />
      </div>
    </div>
  );
}