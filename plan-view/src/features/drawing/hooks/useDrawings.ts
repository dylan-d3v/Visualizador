import { useLiveQuery } from "dexie-react-hooks";

import { db } from "../../../db/database";

export function useDrawings() {
  return useLiveQuery(
    () =>
      db.drawings
        .orderBy("updatedAt")
        .reverse()
        .toArray()
  ) ?? [];
}

