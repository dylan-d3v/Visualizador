import type { ReactNode } from 'react';

export function Sheet({ children }: { children: ReactNode }) {
  return <aside>{children}</aside>;
}
