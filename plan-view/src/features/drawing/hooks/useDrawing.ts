import { useLiveQuery } from "dexie-react-hooks";

import { db } from "../../../db/database";

export function useDrawing(
  drawingId: string | null
) {
  return useLiveQuery(
    async () => {
      if (!drawingId) {
        return null;
      }

      return db.drawings.get(drawingId);
    },
    [drawingId]
  ) ?? null;
}