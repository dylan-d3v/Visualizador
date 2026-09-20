import { useDrawings } from "../hooks/useDrawings";

interface Props {
  selectedDrawingId: string;
  onSelect: (drawingId: string) => void;
}

export function DrawingSelector({
  selectedDrawingId,
  onSelect,
}: Props) {

  const drawings = useDrawings();

  // Mientras no haya planos cargados, no renderizamos nada.
  if (drawings.length === 0) {
    return null;
  }

  return (
    <div className="selector-contenedor">
      <label
        htmlFor="drawing-selector"
        className="selector-label"
      >
        Plano
      </label>

      <select
        id="drawing-selector"
        value={selectedDrawingId}
        onChange={(event) =>
          onSelect(event.target.value)
        }
        className="selector-input"
      >
        {drawings.map((drawing) => (
          <option
            key={drawing.id}
            value={drawing.id}
          >
            {drawing.name}
          </option>
        ))}
      </select>
    </div>
  );
}