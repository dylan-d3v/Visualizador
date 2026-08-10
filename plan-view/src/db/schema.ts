/* Esta es la entidad del plano */
export interface Drawing { 
  id: string;
  name: string;
  imagePath: string;
  width: number;
  height: number;
  createdAt: number;
}
/* Esta es la entidad del objeto en el plano */
export interface DrawingObject {
  id: string;
  drawingId: string;
  code: string;
  description?: string;
  x: number;
  y: number;
  createdAt: number;
}
/* Esta es la entidad de la foto del objeto en el plano */
export interface ObjectPhoto {
  id: string;
  objectId: string;
  originalBlob: Blob;
  thumbnailBlob: Blob;
  fileName: string;
  mimeType: string;
  size: number;
  isPrimary: boolean; //Para agregar foto primaria
  createdAt: number;
}