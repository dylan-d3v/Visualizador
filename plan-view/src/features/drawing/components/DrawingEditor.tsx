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

  const [
    movingObjectId,
    setMovingObjectId,
  ] = useState<string | null>(
    null
  );

  function handleToggleMoving(
    object: DrawingObjectType
  ) {

    setMovingObjectId(
      currentId =>
        currentId === object.id
          ? null
          : object.id
    );
  }


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

        movingObjectId={
          movingObjectId
        }

        onObjectSelect={
          setSelectedObject
        }

        onToggleObjectMoving={
          handleToggleMoving
        }

        onObjectMove={
          handleMoveObject
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
          bottom-sheet
        ">

          <h2 className="
            object-title
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
            className="boton-deseleccionar"
          >
            Deseleccionar
          </button>

        </div>

      )}

    </div>
  );
}