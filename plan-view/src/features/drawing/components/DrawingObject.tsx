import type {
  DrawingObject as DrawingObjectType
} from "../../../db/schema";

import { useViewerStore } from "../../../stores/viewerStore";

interface Props {
  object: DrawingObjectType;

  isEditing?: boolean;

  isSelected?: boolean;

  cssClass?: string;

  onSelect?: (
    object: DrawingObjectType
  ) => void;
}

export function DrawingObject({
  object,
  isEditing = false,
  isSelected = false,
  onSelect,
}: Props) {

  const selectObject =
    useViewerStore(
      (state) => state.selectObject
    );

    
  function handleClick(
    event: React.MouseEvent
  ) {

    event.stopPropagation();

    if (isEditing) {
      onSelect?.(object);
      return;
    }

    selectObject(object.id);
  }

  return (
    //isSelected=true,
    //console.log(isSelected), //pruebas
    <button
      type="button"
      onClick={handleClick}
       className={`object-marker ${isSelected ? "object-marker-selected" : ""}`}
      style={{
        left: `${object.x * 100}%`,
        top: `${object.y * 100}%`,
      }}
    >
      {object.code}
    </button>
  );
}