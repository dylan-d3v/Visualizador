// DrawingEditor.tsx
import { useState } from "react";

import type {
  DrawingObject as DrawingObjectType,
} from "../../../db/schema";

import { DrawingCanvas } from "./DrawingCanvas";

interface Props {
  drawingId: string;
}

export function DrawingEditor({
  drawingId,
}: Props) {

  const [
    selectedObject,
    setSelectedObject,
  ] = useState<DrawingObjectType | null>(
    null
  );

  const [
    newObjectPosition,
    setNewObjectPosition,
  ] = useState<{
    x: number;
    y: number;
  } | null>(null);

  return (
    <div className="relative">

      <DrawingCanvas
        drawingId={drawingId}
        isEditing={true}
        selectedObjectId={
          selectedObject?.id ?? null
        }
        onObjectSelect={
          setSelectedObject
        }
        onCanvasClick={(
          x,
          y
        ) => {
          setNewObjectPosition({
            x,
            y,
          });

          setSelectedObject(null);
          console.log(
            "NUEVA POSICIÓN:",
            x,
            y
          );
        }}
      />

      {selectedObject && (
        <div className="absolute bottom-4 left-4 right-4 z-20 rounded-xl bg-white p-4 shadow-lg">

          <h2 className="text-lg font-bold">
            {selectedObject.code}
          </h2>

          <p className="text-sm text-gray-600">
            {selectedObject.description}
          </p>

          <p className="mt-2 text-xs text-gray-500">
            X: {selectedObject.x}
            {" · "}
            Y: {selectedObject.y}
          </p>

          <button
            type="button"
            onClick={() =>
              setSelectedObject(null)
            }
            className="mt-3 rounded-lg border px-3 py-2 text-sm"
          >
            Deseleccionar
          </button>

        </div>
      )}

    </div>
  );
}