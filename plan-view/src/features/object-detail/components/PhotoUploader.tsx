// Importo el tipo `ChangeEvent` desde la librería `react` para tipar el evento de cambio del input
import type { ChangeEvent } from "react";
// Importo la función `addPhoto` desde el repositorio de fotos para agregar una foto a la base de datos
import { addPhoto } from "../../../db/repositories/photoRepository";
// Defino la interfaz `Props` que contiene el `objectId` del objeto al que se le van a subir las fotos
interface Props{
    objectId:string;
}
// Exporto el componente `PhotoUploader` que recibe las props definidas en la interfaz `Props`
export function PhotoUploader({
    objectId
}:Props){
    // Defino la función `handleChange` que se ejecuta cuando el usuario selecciona un archivo en el input
    async function handleChange(
        event:ChangeEvent<HTMLInputElement>
    ){
        // Obtengo el primer archivo seleccionado por el usuario (si existe)    
        const file=event.target.files?.[0];

        if(!file)
            return;
        // Llamo a la función `addPhoto` para agregar la foto a la base de datos, pasando el `objectId` y el archivo seleccionado
        await addPhoto(
            objectId,
            file
        );
        // Limpio el valor del input para permitir subir la misma foto nuevamente si se desea
        event.target.value="";
    }

    return(
        // Renderizo un input de tipo archivo que acepta solo imágenes y llama a la función `handleChange` cuando el usuario selecciona un archivo
        <input
            type="file"
            accept="image/*"
            onChange={handleChange}
        />

    );

}