import type {
  DrawingObject as DrawingObjectType,
} from "../../../db/schema";

import { useViewerStore } from "../../../stores/viewerStore";

interface Props {
  object: DrawingObjectType;

  isEditing?: boolean;

  isSelected?: boolean;

  onSelect?: (
    object: DrawingObjectType
  ) => void;

  onMove?: (
    object: DrawingObjectType,
    x: number,
    y: number
  ) => void;
}

export function DrawingObject({
  object,
  isEditing = false,
  isSelected = false,
  onSelect,
  onMove,
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


function handlePointerDown(
  event: React.PointerEvent<HTMLButtonElement>
) {

  if (!isEditing || !onMove) {
    return;
  }

  event.stopPropagation();

  const button =
    event.currentTarget;

  const canvas =
    button.parentElement;

  if (!canvas) {
    return;
  }

  const rect =
    canvas.getBoundingClientRect();

  let currentX = object.x;
  let currentY = object.y;


  const handlePointerMove = (
    moveEvent: PointerEvent
  ) => {

    const x =
      (moveEvent.clientX - rect.left) /
      rect.width;

    const y =
      (moveEvent.clientY - rect.top) /
      rect.height;


    currentX = Math.max(
      0,
      Math.min(1, x)
    );

    currentY = Math.max(
      0,
      Math.min(1, y)
    );


    // Actualizamos únicamente la posición visual
    // mientras el usuario arrastra.
    button.style.left =
      `${currentX * 100}%`;

    button.style.top =
      `${currentY * 100}%`;
  };


  const handlePointerUp = () => {

    window.removeEventListener(
      "pointermove",
      handlePointerMove
    );

    window.removeEventListener(
      "pointerup",
      handlePointerUp
    );


    // Guardamos solamente cuando
    // termina el movimiento.
    onMove(
      object,
      currentX,
      currentY
    );
  };


  window.addEventListener(
    "pointermove",
    handlePointerMove
  );

  window.addEventListener(
    "pointerup",
    handlePointerUp
  );
}


  return (
    <button
      type="button"

      onClick={handleClick}

      onPointerDown={
        handlePointerDown
      }

      className={`object-marker ${isSelected ? "object-marker-selected" : ""}`}

      data-editing={isEditing}
      
      style={{
        left: `${object.x * 100}%`,
        top: `${object.y * 100}%`,
      }}
        
    >
      {object.code}
    </button>
  );
}