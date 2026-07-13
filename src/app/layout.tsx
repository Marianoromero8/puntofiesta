import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import CartDrawer from '@/components/CartDrawer';
import PopupAnnouncement from '@/components/PopupAnnouncement';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Punto Fiesta',
  description: 'Combos y productos para tu evento',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="h-full">
      <body className="min-h-full flex flex-col">
        <Navbar />
        <CartDrawer />
        <PopupAnnouncement />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
