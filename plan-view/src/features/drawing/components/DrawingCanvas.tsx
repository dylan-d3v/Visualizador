import {
  useEffect,
  useMemo,
} from "react";

import type {
  DrawingObject as DrawingObjectType,
} from "../../../db/schema";

import { useDrawing } from "../hooks/useDrawing";

import { useDrawingObjects } from "../../object-detail/hooks/useDrawingObjects";

import { DrawingObject } from "./DrawingObject";

interface Props {
  drawingId: string;

  isEditing?: boolean;

  selectedObjectId?: string | null;

  onObjectSelect?: (
    object: DrawingObjectType
  ) => void;

  onCanvasClick?: (
    x: number,
    y: number
  ) => void;

}

interface CanvasImageProps {
  imageBlob: Blob;
  alt: string;
}

function CanvasImage({
  imageBlob,
  alt,
}: CanvasImageProps) {

  const imageUrl = useMemo(() => {
    return URL.createObjectURL(imageBlob);
  }, [imageBlob]);

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(imageUrl);
    };
  }, [imageUrl]);

  return (
    <img
      src={imageUrl}
      alt={alt}
      className="block w-full"
    />
  );
}

export function DrawingCanvas({
  drawingId,
  isEditing = false,
  selectedObjectId = null,
  onObjectSelect,
  onCanvasClick,
}: Props) {

  const drawing =
    useDrawing(drawingId);

  if (!drawing) {
    return (
      <div className="p-4">
        Cargando plano...
      </div>
    );
  }

  return (
    <div
      className="relative w-full overflow-hidden"
      onClick={(event) => {

        if (!isEditing || !onCanvasClick) {
          return;
        }

        const rect =
          event.currentTarget.getBoundingClientRect();

        const x =
          (event.clientX - rect.left) /
          rect.width;

        const y =
          (event.clientY - rect.top) /
          rect.height;

        onCanvasClick(x, y);
      }}
    >

      <CanvasImage
        imageBlob={drawing.imageBlob}
        alt={drawing.name}
      />

      <CanvasObjects
        drawingId={drawingId}
        isEditing={isEditing}
        selectedObjectId={selectedObjectId}
        onObjectSelect={onObjectSelect}
      />

    </div>
  );
}

interface CanvasObjectsProps {
  drawingId: string;

  isEditing: boolean;

  selectedObjectId: string | null;

  onObjectSelect?: (
    object: DrawingObjectType
  ) => void;
}

function CanvasObjects({
  drawingId,
  isEditing,
  selectedObjectId,
  onObjectSelect,
}: CanvasObjectsProps) {

  const objects =
    useDrawingObjects(drawingId);

  //console.log("objects", objects);


  return (
    <>
      {objects.map((object) => (
        <DrawingObject
          key={object.id}
          object={object}
          isEditing={isEditing}
          isSelected={
            selectedObjectId === object.id
          }
          onSelect={onObjectSelect}
        />
      ))}
    </>
  );
}