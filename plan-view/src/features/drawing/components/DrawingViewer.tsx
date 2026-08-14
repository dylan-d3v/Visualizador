// DrawingViewer.tsx
// Este componente es responsable de mostrar la vista del plano y los objetos de dibujo asociados a él.
// Llamando a los datos de los objetos de dibujo desde el archivo drawingObjects.ts
//import { drawingObjects } from "../../../data/drawingObjects";
// Importando el componente DrawingObject que representa cada objeto de dibujo en la vista del plano
import  { DrawingObject } from "./DrawingObject";
// Importando el hook useDrawingObjects para obtener los objetos de dibujo desde la base de datos
import { useDrawingObjects } from "../../object-detail/hooks/useDrawingObjects";
// Importando el hook useDrawing para obtener los datos del plano desde la base de datos
import { useDrawing } from "../hooks/useDrawing";

import {
  useEffect,
  useMemo,
} from "react";

interface Props {
  drawingId: string;
}
// Componente principal DrawingViewer que recibe un drawingId como prop
export function DrawingViewer({
  drawingId,
}: Props) {

  const drawing =
    useDrawing(drawingId);

  const objects =
    useDrawingObjects(drawingId);

  const imageUrl = useMemo(() => {
  if (!drawing) return null;
  return URL.createObjectURL(drawing.imageBlob);
}, [drawing]);

useEffect(() => {
  return () => {
    if (imageUrl) URL.revokeObjectURL(imageUrl);
  };
}, [imageUrl]);

  if (!drawing) {
    return (
      <div>
        Cargando plano...
      </div>
    );
  }

  if (!imageUrl) {
    return (
      <div>
        Cargando imagen...
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden">

      <img
        src={imageUrl}
        alt={drawing.name}
        className="block w-full"
      />

      {objects.map((object) => (
        <DrawingObject
          key={object.id}
          object={object}
        />
      ))}

    </div>
  );
}