// DrawingViewer.tsx
import { DrawingCanvas } from "./DrawingCanvas";

interface Props {
  drawingId: string;
}

export function DrawingViewer({
  drawingId,
}: Props) {

  return (
    <DrawingCanvas
      drawingId={drawingId}
    />
  );
}