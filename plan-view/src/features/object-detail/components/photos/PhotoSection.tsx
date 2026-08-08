import { PhotoUploader } from "./PhotoUploader";
import { ObjectPhotoGallery } from "./ObjectPhotoGallery";
import { useObjectPhotos } from "../../hooks/useObjectPhotos";

interface Props {
  objectId: string;
}

export function PhotoSection({
  objectId,
}: Props) {

  const photos = useObjectPhotos(objectId);

  return (
    <section>

      <PhotoUploader
        objectId={objectId}
      />

      <ObjectPhotoGallery
        photos={photos}
        onPhotoClick={(photo) => {
          console.log("Photo clicked:", photo);
        }}
      />

    </section>
  );

}