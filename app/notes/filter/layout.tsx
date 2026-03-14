import { ReactNode } from 'react';

export default function FilterLayout({
  children,
  sidebar,
}: {
  children: ReactNode;
  sidebar: ReactNode;
}) {
  return (
    <div style={{ display: 'flex', gap: '2rem', padding: '2rem' }}>
      <main style={{ flex: 1 }}>{children}</main>
      {sidebar}
    </div>
  );
}
