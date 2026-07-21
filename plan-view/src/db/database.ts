import  type { Table } from "dexie";

import Dexie from "dexie";

import  type {
  Drawing,
  DrawingObject,
  ObjectPhoto,
} from "./schema";

export class PlanViewDatabase extends Dexie {
  drawings!: Table<Drawing, string>;
  objects!: Table<DrawingObject, string>;
  photos!: Table<ObjectPhoto, string>;

  constructor() {
    /* Crea una base de datos local llamada plan-view-db en el navegador o en el telefono del usuario */
    super("plan-view-db");

    this.version(1).stores({
      drawings: "id, name",
      objects: "id, drawingId, code",
      photos: "id, objectId, createdAt",
    });
  }
}

export const db = new PlanViewDatabase();