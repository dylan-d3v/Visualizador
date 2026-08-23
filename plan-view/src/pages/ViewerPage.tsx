import { useState } from "react";

import { DrawingViewer } from "../features/drawing/components/DrawingViewer";
import { DrawingEditor } from "../features/drawing/components/DrawingEditor";
import { DrawingSelector } from "../features/drawing/components/DrawingSelector";

import { ObjectDetailSheet } from "../features/object-detail/components/photos/ObjectDetailSheet";

export function ViewerPage() {

  const [
    selectedDrawingId,
    setSelectedDrawingId,
  ] = useState(
    "drawing-general-arrangement"
  );

  const [
    isEditing,
    setIsEditing,
  ] = useState(false);

  return (
    <>
      <DrawingSelector
        selectedDrawingId={
          selectedDrawingId
        }
        onSelect={
          setSelectedDrawingId
        }
      />

      {/* Selector de modo */}

      <div className="cont-acciones-ver-editar">

        <button
          type="button"
          onClick={() =>
            setIsEditing(false)
          }
          className={`
            boton
            ${
              !isEditing
                ? "boton-seleccionado"
                : "boton"
            }
          `}
        >
          👁 Ver
        </button>

        <button
          type="button"
          onClick={() =>
            setIsEditing(true)
          }
          className={`
            boton
            ${
              isEditing
                ? "boton-seleccionado"
                : "boton"
            }
          `}
        >
          ✏️ Editar
        </button>

      </div>

      {/* Plano */}

      {isEditing ? (
        <DrawingEditor
          drawingId={
            selectedDrawingId
          }
        />
      ) : (
        <DrawingViewer
          drawingId={
            selectedDrawingId
          }
        />
      )}

      {/* Detalle del objeto */}

      {!isEditing && (
        <ObjectDetailSheet />
      )}

    </>
  );
}