import { db } from "../database";
import type { DrawingObject } from "../schema";

export async function addDrawingObject(
  object: DrawingObject
) {
  await db.objects.add(object);
}

export async function updateDrawingObject(
  object: DrawingObject
) {
  await db.objects.put(object);
}

export async function deleteDrawingObject(
  id: string
) {
  await db.objects.delete(id);
}