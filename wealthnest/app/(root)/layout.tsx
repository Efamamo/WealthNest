import React from 'react';

function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      SIDEBAR
      {children}
    </main>
  );
}

export default Layout;
