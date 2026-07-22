// Llamando a los datos de los objetos de dibujo desde el archivo drawingObjects.ts
import { drawingObjects } from "../../../data/drawingObjects";
// Importando el componente DrawingObject que representa cada objeto de dibujo en la vista del plano
import  { DrawingObject } from "./DrawingObject";
// Este componente muestra la vista del plano con los objetos de dibujo superpuestos en sus posiciones correspondientes
export function DrawingViewer() {
  return (
    <div className="relative w-full overflow-hidden">
      <img
        src="/drawings/plano-1.webp"
        alt="Plano"
        className="block w-full"
      />

      {drawingObjects.map((object) => ( /* Muestra cada objeto de dibujo en su posición correspondiente */
        <DrawingObject 
        key={object.id} 
        object={object} 
        />

      ))}
    </div>
  );
}