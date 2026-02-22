/**
 * DigitSoft AI Landing Page
 * Root Layout
 */

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DigitSoft AI - Alternative Africaine à Claude/ChatGPT',
  description: 'Assistant AI agentic, auto-hébergé, adapté à l\'Afrique.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
