import React from 'react';
import AppHeader from './AppHeader';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <AppHeader />
      <main>{children}</main>
    </div>
  );
}
