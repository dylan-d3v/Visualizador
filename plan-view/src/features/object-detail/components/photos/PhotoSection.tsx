import { PhotoUploader } from "./PhotoUploader";
import { ObjectPhotoGallery } from "./ObjectPhotoGallery";
import { useObjectPhotos } from "../../hooks/useObjectPhotos";
import { useFullscreenPhoto } from "../../hooks/useFullscreenPhoto";
import { FullscreenPhotoDialog } from "./FullScreenPhotoDialog";

interface Props {
  objectId: string;
}

export function PhotoSection({
  objectId,
}: Props) {

  const photos = useObjectPhotos(objectId);
  const fullscreen = useFullscreenPhoto();
  const selectedPhoto = photos.find(
    photo => photo.id === fullscreen.selectedPhotoId
  ) ?? null;

  return (
    <section>

      <PhotoUploader
        objectId={objectId}
      />

      <ObjectPhotoGallery
        photos={photos}
        onPhotoClick={(photo) =>

          fullscreen.open(photo.id)

        } />

      <FullscreenPhotoDialog
        photo={selectedPhoto}
        onClose={fullscreen.close}

      />

    </section>
  );

}