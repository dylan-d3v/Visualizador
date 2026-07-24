// PhotoUploader es un componente que permite al usuario subir una foto para un objeto específico. Utiliza un input de tipo file oculto y un botón que, al hacer clic, activa el input para seleccionar un archivo. Cuando se selecciona un archivo, se llama a la función `addPhoto` para agregar la foto al objeto correspondiente en la base de datos.
import { useRef } from "react";
import { addPhoto } from "../../../../db/repositories/photoRepository";

interface Props {
  objectId: string;
}

export function PhotoUploader({
  objectId,
}: Props) {
    // Uso useRef para crear una referencia al input de tipo file, lo que me permite activarlo programáticamente cuando el usuario hace clic en el botón
  const inputRef =
    useRef<HTMLInputElement>(null);
    // Función que maneja el cambio en el input de tipo file. Cuando el usuario selecciona un archivo, se obtiene el primer archivo del array de archivos seleccionados y se llama a `addPhoto` para agregar la foto al objeto correspondiente. Luego, se limpia el valor del input para permitir subir la misma foto nuevamente si es necesario
  async function handleChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {

    const file =
      event.target.files?.[0];

    if (!file)
      return;

    await addPhoto(
      objectId,
      file
    );

    event.target.value = "";

  }

  return (
    <>

      <input
        hidden
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
      />

      <button
        className="upload-card"
        onClick={() =>
          inputRef.current?.click()
        }
      >

        📷

        <br />

        Agregar fotografía

      </button>

    </>

  );

}