// Llamando a los datos de los objetos de dibujo desde el archivo drawingObjects.ts
import { drawingObjects } from "../../data/drawingObjects";
// Este componente muestra la vista del plano con los objetos de dibujo superpuestos en sus posiciones correspondientes
export function DrawingViewer() {
  return (
    <div className="relative w-full overflow-hidden">
      <img
        src="/drawings/plano-1.webp"
        alt="General Arrangement"
        className="block w-full"
      />

      {drawingObjects.map((object) => ( /* Muestra cada objeto de dibujo en su posición correspondiente */
        <button
          key={object.id}
          type="button"
          className="object-marker"
          style={{
            left: `${object.x * 100}%`,
            top: `${object.y * 100}%`,
          }}
        >
          <span className="sr-only">
            {object.code}
          </span>
        </button>
      ))}
    </div>
  );
}