// DrawingViewer.tsx
// Llamando a los datos de los objetos de dibujo desde el archivo drawingObjects.ts
//import { drawingObjects } from "../../../data/drawingObjects";
// Importando el componente DrawingObject que representa cada objeto de dibujo en la vista del plano
import  { DrawingObject } from "./DrawingObject";
// Importando el hook useDrawingObjects para obtener los objetos de dibujo desde la base de datos
import { useDrawingObjects } from "../../object-detail/hooks/useDrawingObjects";
// Este componente muestra la vista del plano con los objetos de dibujo superpuestos en sus posiciones correspondientes

interface Props {
  drawingId: string;
}

  


export function DrawingViewer({ drawingId }: Props) {
  const objects = useDrawingObjects(drawingId);

  console.log("DRAWING ID:", drawingId);
  console.log("OBJETOS DESDE INDEXEDDB:", objects);

  return (
    <div className="relative w-full overflow-hidden">
      <img
        src="/drawings/plano-1.webp" 
        alt="Plano"
        className="block w-full"
      />

      {objects.map((object) => ( /* Muestra cada objeto de dibujo en su posición correspondiente */
        <DrawingObject 
        key={object.id} 
        object={object} 
        />

      ))}
    </div>
  );
}