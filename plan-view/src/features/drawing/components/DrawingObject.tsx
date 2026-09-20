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

  event.preventDefault();
  event.stopPropagation();

  const button =
    event.currentTarget;

  const canvas =
    button.parentElement;

  if (!canvas) {
    return;
  }

  const image =
    canvas.querySelector<HTMLImageElement>(
      ".drawing-image"
    );

  if (!image) {
    return;
  }

  const imageRect =
    image.getBoundingClientRect();

  const buttonRect =
    button.getBoundingClientRect();


  // Conservamos la distancia entre
  // el puntero y el centro del marcador.
  const offsetX =
    event.clientX -
    (
      buttonRect.left +
      buttonRect.width / 2
    );

  const offsetY =
    event.clientY -
    (
      buttonRect.top +
      buttonRect.height / 2
    );


  let currentX = object.x;

  let currentY = object.y;


  // Capturamos el puntero para mantener
  // el arrastre aunque salga del botón.
  button.setPointerCapture(
    event.pointerId
  );


  const handlePointerMove = (
    moveEvent: PointerEvent
  ) => {

    const x =
      (
        moveEvent.clientX -
        imageRect.left -
        offsetX
      ) /
      imageRect.width;

    const y =
      (
        moveEvent.clientY -
        imageRect.top -
        offsetY
      ) /
      imageRect.height;


    currentX = Math.max(
      0,
      Math.min(1, x)
    );

    currentY = Math.max(
      0,
      Math.min(1, y)
    );


    // Actualizamos solamente la posición visual.
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