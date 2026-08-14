import { db } from "../database";

import { drawingObjects } from "../../data/drawingObjects";

const DRAWING_ID = "drawing-general-arrangement";

export async function initializeDatabase() {
  const drawingCount =
    await db.drawings.count();

  // Si ya existe un plano,
  // no volvemos a inicializarlo.
  if (drawingCount > 0) {
    return;
  }

  /*
   * Por ahora el plano está almacenado
   * públicamente en /drawings/plano-1.webp.
   *
   * Lo cargamos como Blob para almacenarlo
   * en IndexedDB.
   */
  const response =
    await fetch("/drawings/plano-1.webp");

  if (!response.ok) {
    throw new Error(
      "No se pudo cargar el plano inicial."
    );
  }

  const imageBlob =
    await response.blob();

  /*
   * Obtenemos las dimensiones reales
   * de la imagen.
   */
  const imageUrl =
    URL.createObjectURL(imageBlob);

  const image =
    new Image();

  image.src = imageUrl;

  await new Promise<void>(
    (resolve, reject) => {

      image.onload = () => resolve();

      image.onerror = () =>
        reject(
          new Error(
            "No se pudieron obtener las dimensiones del plano."
          )
        );
    }
  );

  const drawingWidth =
    image.naturalWidth;

  const drawingHeight =
    image.naturalHeight;

  URL.revokeObjectURL(imageUrl);

  /*
   * Creamos el plano.
   */
  const drawing = {
    id: DRAWING_ID,

    name: "General Arrangement",

    imageBlob,

    width: drawingWidth,

    height: drawingHeight,

    createdAt: Date.now(),

    updatedAt: Date.now(),
  };

  /*
   * Creamos el plano y sus objetos
   * dentro de una misma transacción.
   */
  await db.transaction(
    "rw",
    [
      db.drawings,
      db.objects,
    ],
    async () => {

      await db.drawings.add(
        drawing
      );

      await db.objects.bulkAdd(
        drawingObjects.map(
          (object) => ({
            ...object,

            drawingId:
              DRAWING_ID,

            updatedAt:
              Date.now(),
          })
        )
      );

    }
  );

  console.log(
    "Plano inicializado correctamente."
  );
}