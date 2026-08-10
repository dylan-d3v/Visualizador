const THUMBNAIL_SIZE = 300;

export async function createThumbnail(
  file: File
): Promise<Blob> {
  // Creo un bitmap a partir del archivo de imagen proporcionado
  // Un bitmap es una representación de la imagen en memoria que permite manipularla y renderizarla en un canvas
  // Un canvas es un elemento HTML que permite dibujar gráficos y manipular imágenes mediante JavaScript
  const bitmap = await createImageBitmap(file);

  const scale = Math.min(
    THUMBNAIL_SIZE / bitmap.width,
    THUMBNAIL_SIZE / bitmap.height,
    1
  );

  const width = Math.round(
    bitmap.width * scale
  );

  const height = Math.round(
    bitmap.height * scale
  );

  const canvas =
    document.createElement("canvas");

  canvas.width = width;
  canvas.height = height;

  const context =
    canvas.getContext("2d");

  if (!context) {
    bitmap.close();

    throw new Error(
      "No se pudo crear el contexto del canvas"
    );
  }

  context.drawImage(
    bitmap,
    0,
    0,
    width,
    height
  );

  bitmap.close();

  const thumbnail =
    await new Promise<Blob | null>(
      (resolve) => {

        canvas.toBlob(
          resolve,
          "image/jpeg",
          0.75
        );

      }
    );

  if (!thumbnail) {
    throw new Error(
      "No se pudo generar la miniatura"
    );
  }

  return thumbnail;
}