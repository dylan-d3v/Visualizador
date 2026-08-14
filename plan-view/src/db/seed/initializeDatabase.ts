import { db } from "../database";

import { drawingObjects } from "../../data/drawingObjects";

export async function initializeDatabase() {
  const drawingCount =
    await db.drawings.count();

  // Si ya existe un plano,
  // no hacemos nada.
  if (drawingCount > 0) {
    return;
  }

  console.log(
    "No existe ningún plano. Se requiere inicialización."
  );
}