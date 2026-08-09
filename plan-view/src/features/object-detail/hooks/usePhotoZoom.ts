import { useState } from "react";

interface ZoomState {
  scale: number;
  x: number;
  y: number;
}

const MIN_SCALE = 1;
const MAX_SCALE = 4;

export function usePhotoZoom() {
  const [zoom, setZoom] = useState<ZoomState>({
    scale: 1,
    x: 0,
    y: 0,
  });

  function reset() {
    setZoom({
      scale: 1,
      x: 0,
      y: 0,
    });
  }

  function zoomIn() {
    setZoom((current) => ({
      ...current,
      scale: Math.min(current.scale + 1, MAX_SCALE),
    }));
  }

  function zoomOut() {
    setZoom((current) => ({
      ...current,
      scale: Math.max(current.scale - 1, MIN_SCALE),
    }));
  }

  function setPosition(x: number, y: number) {
    setZoom((current) => ({
      ...current,
      x,
      y,
    }));
  }

  return {
    zoom,
    zoomIn,
    zoomOut,
    reset,
    setPosition,
    minScale: MIN_SCALE,
    maxScale: MAX_SCALE,
  };
}