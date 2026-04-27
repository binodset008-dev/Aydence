import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Aydence — Expert Career Strategy for Germany',
  description:
    'Dr. rer. nat. Shoba Kapoor guides professionals, researchers, and students to build successful careers in Germany. Webinars, courses, and personal coaching.',
  keywords: 'Germany career strategy, PhD Germany, German job market, Aydence, Shoba Kapoor',
  openGraph: {
    title: 'Aydence — Expert Career Strategy for Germany',
    description: 'Personalized guidance for your career move to Germany.',
    type: 'website',
  },
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="de" className={jakarta.variable} data-scroll-behavior="smooth">
      <head>
        <link rel="icon" href="/logo-new.svg" type="image/svg+xml" />
      </head>
      <body className="antialiased font-sans">{children}</body>
    </html>
  );
}
