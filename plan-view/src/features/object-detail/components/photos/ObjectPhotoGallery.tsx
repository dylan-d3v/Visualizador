// Importo los hooks `useEffect` y `useMemo` desde la librería `react` para manejar efectos secundarios y memorizar valores derivados
import { useEffect, useMemo } from "react";
// Importo el tipo `ObjectPhoto` desde el archivo de esquema para tipar las props del componente
import type { ObjectPhoto } from "../../../../db/schema";
// Defino la interfaz `Props` que contiene un array de fotos de objetos
interface Props{
    photos:ObjectPhoto[];
}
// Exporto el componente `ObjectPhotoGallery` que recibe las props definidas en la interfaz `Props`
export function ObjectPhotoGallery({
    photos
}:Props){
    // Derivo las URLs directamente de las fotos con useMemo
  const urls = useMemo(() => {
    return photos.map(photo => URL.createObjectURL(photo.blob));
  }, [photos]);

  // Limpieza: revocar URLs cuando cambien las fotos
  useEffect(() => {
    return () => {
      urls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [urls]);

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