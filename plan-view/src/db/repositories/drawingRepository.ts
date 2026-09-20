// Repositorio para la tabla de dibujos

import { db } from "../database";

import type { Drawing } from "../schema";

/* =========================================================
   DRAWINGS
   ========================================================= */

/**
 * Crea un nuevo plano.
 */
export async function createDrawing(
  drawing: Drawing
) {
  await db.drawings.add(drawing);
}


/**
 * Obtiene un plano por su ID.
 */
export async function getDrawing(
  id: string
) {
  return db.drawings.get(id);
}


/**
 * Obtiene todos los planos.
 */
export async function getDrawings() {
  return db.drawings
    .orderBy("updatedAt")
    .reverse()
    .toArray();
}


/**
 * Actualiza información de un plano.
 */
export async function updateDrawing(
  id: string,
  changes: Partial<
    Omit<Drawing, "id">
  >
) {
  await db.drawings.update(
    id,
    {
      ...changes,
      updatedAt: Date.now(),
    }
  );
}


/**
 * Elimina un plano y todos sus objetos.
 */
export async function deleteDrawing(
  id: string
) {
  await db.transaction(
    "rw",
    [
      db.drawings,
      db.objects,
      db.photos,
    ],
    async () => {

      const objects =
        await db.objects
          .where("drawingId")
          .equals(id)
          .toArray();

      const objectIds =
        objects.map(
          (object) => object.id
        );

      if (objectIds.length > 0) {

        await db.photos
          .where("objectId")
          .anyOf(objectIds)
          .delete();

      }

      await db.objects
        .where("drawingId")
        .equals(id)
        .delete();

      await db.drawings.delete(id);
    }
  );
}
