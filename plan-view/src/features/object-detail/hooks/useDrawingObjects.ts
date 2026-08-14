import { useLiveQuery } from "dexie-react-hooks";

import { db } from "../../../db/database";

export function useDrawingObjects(
  drawingId: string | null
) {
  return useLiveQuery(
    async () => {

      if (!drawingId) {
        return [];
      }

      return db.objects
        .where("drawingId")
        .equals(drawingId)
        .sortBy("createdAt");

    },
    [drawingId]
  ) ?? [];
}