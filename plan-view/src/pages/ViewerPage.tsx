// ViewerPage.tsx
import { useState } from "react";

import { DrawingViewer } from "../features/drawing/components/DrawingViewer";
import { DrawingSelector } from "../features/drawing/components/DrawingSelector";

import { ObjectDetailSheet } from "../features/object-detail/components/photos/ObjectDetailSheet";

export function ViewerPage() {

  const [
    selectedDrawingId,
    setSelectedDrawingId,
  ] = useState(
    "drawing-general-arrangement"
  );

  return (
    <>
      <DrawingSelector
        selectedDrawingId={
          selectedDrawingId
        }
        onSelect={
          setSelectedDrawingId
        }
      />

      <DrawingViewer
        drawingId={
          selectedDrawingId
        }
      />

      <ObjectDetailSheet />

    </>
  );
}