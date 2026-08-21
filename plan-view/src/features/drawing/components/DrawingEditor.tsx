import { useState } from "react";

import type {
  DrawingObject as DrawingObjectType,
} from "../../../db/schema";

import { DrawingCanvas } from "./DrawingCanvas";
import { NewObjectForm } from "./NewObjectForm";

import {
  addDrawingObject,
} from "../../../db/repositories/drawingObjectRepository";

import {
  updateDrawingObject,
} from "../../../db/repositories/drawingObjectRepository";

interface Props {
  drawingId: string;
}

export function DrawingEditor({
  drawingId,
}: Props) {

  // Objeto existente que el usuario ha seleccionado
  const [
    selectedObject,
    setSelectedObject,
  ] = useState<DrawingObjectType | null>(
    null
  );

  // Posición donde el usuario quiere crear
  // un nuevo objeto
  const [
    newObjectPosition,
    setNewObjectPosition,
  ] = useState<{
    x: number;
    y: number;
  } | null>(null);


  async function handleMoveObject(
  object: DrawingObjectType,
  x: number,
  y: number
) {

  const updatedObject: DrawingObjectType = {
    ...object,

    x,

    y,

    updatedAt: Date.now(),
  };

  await updateDrawingObject(
    updatedObject
  );

  setSelectedObject(
    updatedObject
  );
}

  // --------------------------------------------------
  // CREAR NUEVO OBJETO
  // --------------------------------------------------

  async function handleCreateObject(
    code: string,
    description: string
  ) {

    // No podemos crear el objeto si
    // todavía no tenemos una posición
    if (!newObjectPosition) {
      return;
    }

    const newObject: DrawingObjectType = {

      id: crypto.randomUUID(),

      drawingId,

      code,

      description,

      x: newObjectPosition.x,

      y: newObjectPosition.y,

      createdAt: Date.now(),

      updatedAt: Date.now()

    };

    // Guardamos el objeto en IndexedDB
    await addDrawingObject(
      newObject
    );

    // Cerramos el formulario
    setNewObjectPosition(null);
  }


  return (
    <div className="relative">

      <DrawingCanvas
        drawingId={drawingId}

        isEditing={true}

        selectedObjectId={
          selectedObject?.id ?? null
        }

        onObjectSelect={
          (object) => {

            // Estamos seleccionando
            // un objeto existente
            setSelectedObject(object);

            // Si había un formulario
            // de nuevo objeto abierto,
            // lo cerramos
            setNewObjectPosition(null);
          }
        }

        onCanvasClick={(x, y) => {

          // El usuario tocó un espacio
          // vacío del plano.

          setNewObjectPosition({
            x,
            y,
          });

          // Si había un objeto seleccionado,
          // dejamos de seleccionarlo.
          setSelectedObject(null);
        }}

        onObjectMove={handleMoveObject
        }

      />


      {/* ---------------------------------------------
          FORMULARIO PARA CREAR OBJETO
      --------------------------------------------- */}

      {newObjectPosition && (

        <NewObjectForm
          x={newObjectPosition.x}
          y={newObjectPosition.y}

          onCancel={() =>
            setNewObjectPosition(null)
          }

          onSave={
            handleCreateObject
          }
        />

      )}


      {/* ---------------------------------------------
          INFORMACIÓN DEL OBJETO SELECCIONADO
      --------------------------------------------- */}

      {selectedObject && (

        <div className="
          absolute
          bottom-4
          left-4
          right-4
          z-20
          rounded-xl
          bg-white
          p-4
          shadow-lg
        ">

          <h2 className="
            text-lg
            font-bold
          ">
            {selectedObject.code}
          </h2>

          <p className="
            text-sm
            text-gray-600
          ">
            {selectedObject.description}
          </p>

          <p className="
            mt-2
            text-xs
            text-gray-500
          ">
            X: {selectedObject.x}
            {" · "}
            Y: {selectedObject.y}
          </p>

          <button
            type="button"
            onClick={() =>
              setSelectedObject(null)
            }
            className="
              mt-3
              rounded-lg
              border
              px-3
              py-2
              text-sm
            "
          >
            Deseleccionar
          </button>

        </div>

      )}

    </div>
  );
}