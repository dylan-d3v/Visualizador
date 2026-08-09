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

  function setScale(scale: number) {
    setZoom((current) => ({
      ...current,
      scale: Math.min(
        Math.max(scale, MIN_SCALE),
        MAX_SCALE
      ),
    }));
  }

  function zoomIn() {
    setZoom((current) => ({
      ...current,
      scale: Math.min(
        current.scale + 1,
        MAX_SCALE
      ),
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
    setScale,
    zoomIn,
    reset,
    setPosition,
  };
}