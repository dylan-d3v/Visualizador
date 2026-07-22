// Importo los hooks `useEffect` y `useState` desde la librería `react` para manejar el estado y los efectos secundarios en el componente
import { useEffect, useState } from "react";
// Importo el tipo `ObjectPhoto` desde el archivo de esquema para tipar las props del componente
import type { ObjectPhoto } from "../../../db/schema";
// Defino la interfaz `Props` que contiene un array de fotos de objetos
interface Props{
    photos:ObjectPhoto[];
}
// Exporto el componente `ObjectPhotoGallery` que recibe las props definidas en la interfaz `Props`
export function ObjectPhotoGallery({
    photos
}:Props){
    // Defino el estado `urls` que contiene un array de URLs de las fotos y la función `setUrls` para actualizarlo
    const [urls,setUrls]=useState<string[]>([]);
    // Uso el hook `useEffect` para crear y revocar las URLs de las fotos cuando cambian las fotos
    useEffect(()=>{

        const objectUrls=photos.map(photo=>
            URL.createObjectURL(photo.blob)
        );
        // Actualizo el estado `urls` con las nuevas URLs de las fotos
        setUrls(objectUrls);

        return ()=>{

            objectUrls.forEach(url=>
                URL.revokeObjectURL(url)
            );

        };

    },[photos]);
    // Si no hay fotos, muestro un mensaje indicando que no hay fotos todavía
    if(photos.length===0){

        return(

            <p>
                No hay fotos todavía.
            </p>

        );

    }

    return(
// Renderizo un contenedor `div` que contiene las imágenes de las fotos usando las URLs generadas
        <div>

            {urls.map((url,index)=>(

                <img
                    key={index}
                    src={url}
                    alt=""
                    width={250}
                />

            ))}

        </div>

    );

}