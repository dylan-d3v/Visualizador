/* Datos iniciales para probar. */
import type { DrawingObject } from "../db/schema";

export const drawingObjects: DrawingObject[] = [
  {
    id: "object-md-32",
    drawingId: "drawing-general-arrangement",
    code: "MD 32",
    description: "S6x1",
    x: 0.25,
    y: 0.2,
    createdAt: Date.now(),
  },
  {
    id: "object-md-82",
    drawingId: "drawing-general-arrangement",
    code: "MD 82",
    description: "MCT - RS31",
    x: 0.4,
    y: 0.3,
    createdAt: Date.now(),
  },
  {
    id: "object-md-49",
    drawingId: "drawing-general-arrangement",
    code: "MD 49",
    description: "MCT - RS31",
    x: 0.6,
    y: 0.45,
    createdAt: Date.now(),
  },
];
