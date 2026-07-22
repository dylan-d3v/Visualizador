// Importo el objeto `db` desde el archivo de base de datos 
import { db } from "../database";
// Importo el tipo `ObjectPhoto` desde el archivo de esquema
import type { ObjectPhoto } from "../schema";
// Exporto las funciones para agregar, eliminar y obtener fotos de objetos
export async function addPhoto(
  objectId: string,
  file: File
) { // Creo un objeto `photo` de tipo `ObjectPhoto` con los datos proporcionados y un ID único generado por `crypto.randomUUID()`
  const photo: ObjectPhoto = {
    id: crypto.randomUUID(),
    objectId,

    blob: file,

    fileName: file.name,
    mimeType: file.type,
    size: file.size,

    createdAt: Date.now(),
  };

  await db.photos.add(photo);
}
// Exporto la función para eliminar una foto de objeto por su ID
export async function deletePhoto(id: string) {
  await db.photos.delete(id);
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