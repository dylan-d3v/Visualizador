import { useDrawing } from "../hooks/useDrawing";
interface Props {
  selectedDrawingId: string;
  onSelect: (drawingId: string) => void;
}

export function DrawingSelector({
  selectedDrawingId,
  onSelect,
}: Props) {

  const drawing = useDrawing(selectedDrawingId);

  if (!drawing) {
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
        {drawing && (
          <option
            key={drawing.id}
            value={drawing.id}
          >
            {drawing.name}
          </option>
        )}
      </select>
    </div>
  );
}