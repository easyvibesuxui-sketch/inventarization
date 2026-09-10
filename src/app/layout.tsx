import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Inverse — AI inventory verification',
    template: '%s · Inverse',
  },
  description:
    'Multi-tenant inventory management with AI-assisted physical stock verification, built for SMBs in Georgia and the Caucasus.',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
