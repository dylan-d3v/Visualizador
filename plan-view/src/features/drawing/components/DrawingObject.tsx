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

    const handlePointerMove = (
      moveEvent: PointerEvent
    ) => {

      const x =
        (moveEvent.clientX - rect.left) /
        rect.width;

      const y =
        (moveEvent.clientY - rect.top) /
        rect.height;

      const clampedX =
        Math.max(
          0,
          Math.min(1, x)
        );

      const clampedY =
        Math.max(
          0,
          Math.min(1, y)
        );

      onMove(
        object,
        clampedX,
        clampedY
      );
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

      style={{
        left: `${object.x * 100}%`,
        top: `${object.y * 100}%`,
      }}
    >
      {object.code}
    </button>
  );
}