// ViewerPage.tsx
import { DrawingViewer } from "../features/drawing/components/DrawingViewer";
import { ObjectDetailSheet } from "../features/object-detail/components/photos/ObjectDetailSheet";

export function ViewerPage() {
  return (
    <>

      <DrawingViewer 
        drawingId="drawing-general-arrangement"
      />

      <ObjectDetailSheet />

    </>
  );
}