import React from 'react';

export default function Sheet({ children }: { children: React.ReactNode }) {
  return <div className="sheet">{children}</div>;
}
