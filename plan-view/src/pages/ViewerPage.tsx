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

      <div className="flex gap-2 px-4 pb-4">

        <button
          type="button"
          onClick={() =>
            setIsEditing(false)
          }
          className={`
            flex-1
            rounded-lg
            border
            px-4
            py-2
            font-medium
            ${
              !isEditing
                ? "bg-gray-900 text-white"
                : "bg-white text-gray-700"
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
            flex-1
            rounded-lg
            border
            px-4
            py-2
            font-medium
            ${
              isEditing
                ? "bg-gray-900 text-white"
                : "bg-white text-gray-700"
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