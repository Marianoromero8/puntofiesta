import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import CartDrawer from '@/components/CartDrawer';
import PopupAnnouncement from '@/components/PopupAnnouncement';

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
        <footer className="bg-[#044389] text-white/70 text-xs text-center py-4 mt-8">
          © {new Date().getFullYear()} Punto Fiesta — Todos los derechos reservados
        </footer>
      </body>
    </html>
  );
}
