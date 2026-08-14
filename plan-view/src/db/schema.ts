export interface Drawing {
  id: string;

  name: string;

  imageBlob: Blob;

  width: number;

  height: number;

  createdAt: number;

  updatedAt: number;
}

export interface DrawingObject {
  id: string;

  drawingId: string;

  code: string;

  description?: string;

  x: number;

  y: number;

  width?: number;

  height?: number;

  createdAt: number;

  updatedAt: number;
}

export interface ObjectPhoto {
  id: string;

  objectId: string;

  originalBlob: Blob;

  thumbnailBlob: Blob;

  fileName: string;

  mimeType: string;

  isPrimary: boolean;

  size: number;

  createdAt: number;
}