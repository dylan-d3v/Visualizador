import { db } from "../database";
import type { DrawingObject } from "../schema";

/**
 * Crea un nuevo objeto dentro de un plano.
 */
export async function addDrawingObject(
  object: DrawingObject
) {
  await db.objects.add(object);
}

/**
 * Actualiza campos de un objeto existente.
 * Aplica updatedAt automáticamente.
 */
export async function updateDrawingObject(
  id: string,
  changes: Partial<
    Omit<DrawingObject, "id">
  >
) {
  await db.objects.update(
    id,
    {
      ...changes,
      updatedAt: Date.now(),
    }
  );
}

/**
 * Elimina un objeto y todas sus fotografías
 * dentro de una sola transacción.
 */
export async function deleteDrawingObject(
  id: string
) {
  await db.transaction(
    "rw",
    [
      db.objects,
      db.photos,
    ],
    async () => {

      await db.photos
        .where("objectId")
        .equals(id)
        .delete();

      await db.objects.delete(id);
    }
  );
}

/**
 * Obtiene todos los objetos de un plano,
 * ordenados por fecha de creación.
 */
export async function getObjectsByDrawing(
  drawingId: string
) {
  return db.objects
    .where("drawingId")
    .equals(drawingId)
    .sortBy("createdAt");
}

/**
 * Obtiene un objeto por su ID.
 */
export async function getDrawingObject(
  id: string
) {
  return db.objects.get(id);
}