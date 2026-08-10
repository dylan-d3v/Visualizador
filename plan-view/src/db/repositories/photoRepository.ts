import { createThumbnail } from "../../features/object-detail/components/photos/utils/imageProcesor";
// Importo el objeto `db` desde el archivo de base de datos 
import { db } from "../database";
// Importo el tipo `ObjectPhoto` desde el archivo de esquema
import type { ObjectPhoto } from "../schema";
// Exporto las funciones para agregar, eliminar y obtener fotos de objetos
export async function addPhoto(
  objectId: string,
  file: File
) {
   const thumbnailBlob =
    await createThumbnail(file);
  // Creo un objeto `photo` de tipo `ObjectPhoto` con los datos proporcionados y un ID único generado por `crypto.randomUUID()`
  const photo: ObjectPhoto = {
    id: crypto.randomUUID(),

    objectId,

    originalBlob: file,

    thumbnailBlob: thumbnailBlob,

    fileName: file.name,

    mimeType: file.type,

    isPrimary: false, //agregado

    size: file.size,

    createdAt: Date.now(),
  };

   

  // Verifico si ya existen fotos para el objeto dado. Si no existen, establezco la nueva foto como primaria
  await getPhotosByObject(objectId).then((photos) => {
    if (photos.length === 0) {
      photo.isPrimary = true; // Si no hay fotos existentes, establezco la nueva foto como primaria
    }
  });

  await db.photos.add(photo);

}
// Exporto la función para eliminar una foto de objeto por su ID
export async function deletePhoto(id: string) {
  await db.transaction(
    "rw",
    db.photos,
    async () => {

      const photo = await db.photos.get(id);

      if (!photo) {
        return;
      }

      // Si no era la principal,
      // simplemente la eliminamos.
      if (!photo.isPrimary) {
        await db.photos.delete(id);
        return;
      }

      // Buscamos las demás fotografías
      // pertenecientes al mismo objeto.
      const remainingPhotos = await db.photos
        .where("objectId")
        .equals(photo.objectId)
        .filter(
          (item) => item.id !== photo.id
        )
        .sortBy("createdAt");

      // Eliminamos la fotografía principal.
      await db.photos.delete(id);

      // Si todavía existen fotografías,
      // la primera pasa a ser principal.
      if (remainingPhotos.length > 0) {

        await db.photos.update(
          remainingPhotos[0].id,
          {
            isPrimary: true,
          }
        );

      }
    }
  );
}
// Exporto la función para obtener todas las fotos de un objeto por su ID
export async function getPhotosByObject(
  objectId: string
) {
  return db.photos
    .where("objectId")
    .equals(objectId)
    .sortBy("createdAt");
}
// Exporto la función para establecer una foto como primaria para un objeto dado
export async function setPrimaryPhoto(
  photoId: string,
  objectId: string
) {
  await db.transaction(
    "rw",
    db.photos,
    async () => {

      // Quitamos la condición de principal
      // de todas las fotos del objeto.
      await db.photos
        .where("objectId")
        .equals(objectId)
        .modify({
          isPrimary: false,
        });

      // Marcamos la seleccionada como principal.
      await db.photos.update(
        photoId,
        {
          isPrimary: true,
        }
      );
    }
  );
}