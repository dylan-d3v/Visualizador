import { PhotoUploader } from "./PhotoUploader";
import { ObjectPhotoGallery } from "./ObjectPhotoGallery";
import { useObjectPhotos } from "../../hooks/useObjectPhotos";
import { useFullscreenPhoto } from "../../hooks/useFullscreenPhoto";

interface Props {
  objectId: string;
}

export function PhotoSection({
  objectId,
}: Props) {

  const photos = useObjectPhotos(objectId);
  const fullscreen = useFullscreenPhoto();
  return (
    <section>

      <PhotoUploader
        objectId={objectId}
      />

      <ObjectPhotoGallery
        photos={photos}
        onPhotoClick={(photo)=>

        fullscreen.open(photo.id)

        }      />

    </section>
  );

}