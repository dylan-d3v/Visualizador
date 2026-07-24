import { DrawingViewer } from "../features/drawing/components/DrawingViewer";
import { ObjectDetailSheet } from "../features/object-detail/components/photos/ObjectDetailSheet";

export function ViewerPage() {
  return (
    <>

      <DrawingViewer />

      <ObjectDetailSheet />

    </>
  );
}