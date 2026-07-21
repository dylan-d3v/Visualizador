import { useState } from 'react';

export default function useDrawingObjects() {
  const [objects] = useState([] as any[]);
  return { objects };
}
