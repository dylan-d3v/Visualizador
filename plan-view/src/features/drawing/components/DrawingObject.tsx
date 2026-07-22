// Botón que representa un objeto de dibujo en la vista del plano. Al hacer clic en el botón, se selecciona el objeto correspondiente.
import type { DrawingObject as DrawingObjectType } from "../../../db/schema";
import { useViewerStore } from "../../../stores/viewerStore";

interface Props {
  object: DrawingObjectType;
}

export function DrawingObject({ object }: Props) {
  const selectObject = useViewerStore(
    (state) => state.selectObject
  );

  return (
    <button
      type="button"
      className="object-marker"
      style={{
        left: `${object.x * 100}%`,
        top: `${object.y * 100}%`,
      }}
      onClick={() => selectObject(object.id)}
    >
      <span className="sr-only">
        {object.code}
      </span>
    </button>
  );
}