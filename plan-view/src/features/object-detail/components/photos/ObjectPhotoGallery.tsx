import type { ObjectPhoto } from "../../../../db/schema";
import { PhotoCard } from "./PhotoCard";

interface Props {
  photos: ObjectPhoto[];
}

export function ObjectPhotoGallery({
  photos,
}: Props) {

  if (photos.length === 0) {

    return (
      <div className="empty-gallery">

        <p>
          No existen fotografías.
        </p>

      </div>
    );

  }

  return (

    <div className="photo-grid">

      {photos.map(photo => (

        <PhotoCard
          key={photo.id}
          photo={photo}
          onClick={() => {
            console.log(photo.id);
          }}
        />

      ))}

    </div>

  );

}