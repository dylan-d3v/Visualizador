// Hook: Importo el hook `useLiveQuery` desde la librería `dexie-react-hooks` para realizar consultas reactivas a la base de datos
import { useLiveQuery } from "dexie-react-hooks";
// Importo el objeto `db` desde el archivo de base de datos
import { db } from "../../../db/database";
// Exporto el hook `useObjectPhotos` que recibe un `objectId` y devuelve un array de fotos de ese objeto
export function useObjectPhotos(
  objectId: string | null
) {
  return useLiveQuery(async () => {
// Si el `objectId` es nulo, devuelvo un array vacío
    if (!objectId)
      return [];

    return db.photos
      .where("objectId")
      .equals(objectId)
      .sortBy("createdAt");

  }, [objectId]) ?? []; // Devuelvo un array vacío si no hay fotos o si el `objectId` es nulo
}