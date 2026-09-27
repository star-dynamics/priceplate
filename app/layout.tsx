import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PricePlate | UK vehicle value check',
  description: 'A clearer way to understand what a used vehicle may be worth.'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en-GB"><body>{children}</body></html>;
}
