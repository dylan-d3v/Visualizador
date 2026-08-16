// aun no usado
import { useLiveQuery } from "dexie-react-hooks";

import { db } from "../../../db/database";

export function useDrawings() {
  return useLiveQuery(
    async () => {
      return db.drawings
        .orderBy("updatedAt")
        .reverse()
        .toArray();
    }
  ) ?? [];
}