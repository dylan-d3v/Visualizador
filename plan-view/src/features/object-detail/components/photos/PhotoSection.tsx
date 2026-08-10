import { useState } from "react";

import type { ObjectPhoto } from "../../../../db/schema";

import {
  deletePhoto,
} from "../../../../db/repositories/photoRepository";

import { useObjectPhotos } from "../../hooks/useObjectPhotos";

import { PhotoUploader } from "./PhotoUploader";
import { ObjectPhotoGallery } from "./ObjectPhotoGallery";
import { FullscreenPhotoDialog } from "./FullScreenPhotoDialog";
interface Props {
  objectId: string;
}

export function PhotoSection({
  objectId,
}: Props) {
  const photos = useObjectPhotos(objectId);

  const [selectedPhotoId, setSelectedPhotoId] =
    useState<string | null>(null);

  const selectedPhoto =
    photos.find(
      (photo) => photo.id === selectedPhotoId
    ) ?? null;

  function handlePhotoClick(photo: ObjectPhoto) {
    setSelectedPhotoId(photo.id);
  }

  async function handleDelete(photo: ObjectPhoto) {
    await deletePhoto(photo.id);

    setSelectedPhotoId(null);
  }

  function handleCloseFullscreen() {
    setSelectedPhotoId(null);
  }

  return (
    <section>

      <PhotoUploader
        objectId={objectId}
      />

      <ObjectPhotoGallery
        photos={photos}
        onPhotoClick={handlePhotoClick}
      />

      <FullscreenPhotoDialog
        photo={selectedPhoto}
        onClose={handleCloseFullscreen}
        onDelete={handleDelete}
      />

    </section>
  );
}