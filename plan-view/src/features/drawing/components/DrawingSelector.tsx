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
    <div className="w-full p-4">
      <label
        htmlFor="drawing-selector"
        className="mb-2 block text-sm font-medium"
      >
        Plano
      </label>

      <select
        id="drawing-selector"
        value={selectedDrawingId}
        onChange={(event) =>
          onSelect(event.target.value)
        }
        className="w-full rounded-lg border px-3 py-2"
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