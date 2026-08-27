import type {
  DrawingObject as DrawingObjectType,
} from "../../../db/schema";

import { useViewerStore } from "../../../stores/viewerStore";

interface Props {
  object: DrawingObjectType;

  isEditing?: boolean;

  isSelected?: boolean;

  isMoving?: boolean;

  onSelect?: (
    object: DrawingObjectType
  ) => void;

  onToggleMoving?: (
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
  isMoving = false,
  onSelect,
  onToggleMoving,
  onMove,
}: Props) {

  const selectObject =
    useViewerStore(
      (state) => state.selectObject
    );


  function handleClick(
    event: React.MouseEvent<HTMLButtonElement>
  ) {

    event.stopPropagation();

    if (!isEditing) {
      selectObject(object.id);
      return;
    }

    onSelect?.(object);
  }


  function handleDoubleClick(
    event: React.MouseEvent<HTMLButtonElement>
  ) {

    if (!isEditing) {
      return;
    }

    event.stopPropagation();

    onToggleMoving?.(object);
  }


  function handlePointerDown(
    event: React.PointerEvent<HTMLButtonElement>
  ) {

    if (
      !isEditing ||
      !isMoving ||
      !onMove
    ) {
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

      onDoubleClick={
        handleDoubleClick
      }

      onPointerDown={
        handlePointerDown
      }

      className={
        isMoving
          ? "object-marker object-marker-moving"
          : isSelected
            ? "object-marker object-marker-selected"
            : "object-marker"
      }

      data-editing={isEditing}

      style={{
        left: `${object.x * 100}%`,
        top: `${object.y * 100}%`,
      }}

      data-moving={isMoving}
    >
      {object.code}
    </button>
  );
}