import { DrawingViewer } from "../features/drawing/components/DrawingViewer";
import { ObjectDetailSheet } from "../features/object-detail/components/ObjectDetailSheet";

export function ViewerPage() {
  return (
    <>

      <DrawingViewer />

      <ObjectDetailSheet />

    </>
  );
}