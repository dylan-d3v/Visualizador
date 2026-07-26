import { useState } from "react";

export function useFullscreenPhoto() {

    const [
        selectedPhotoId,
        setSelectedPhotoId
    ]=useState<string|null>(null);

    function open(id:string){

        setSelectedPhotoId(id);

    }

    function close(){

        setSelectedPhotoId(null);

    }

    return{

        selectedPhotoId,

        open,

        close

    };

}