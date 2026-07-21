import { useState } from 'react';

export default function useObjectPhotos() {
  const [photos] = useState([] as string[]);
  return { photos };
}
