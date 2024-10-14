import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Inter, IBM_Plex_Serif } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const ibmSerif = IBM_Plex_Serif({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-ibm-serif',
});

export const metadata: Metadata = {
  title: 'WealthNest',
  description: 'WealthNest is banking platform',
  icons: {
    icon: '/icons/logo.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${ibmSerif.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
