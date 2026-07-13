'use client';
import { useEffect, useState } from 'react';
import { getPublicSettings } from '@/lib/api';
import type { PFPublicSettings } from '@/lib/types';

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.55.22.95.47 1.36.88.41.41.66.81.88 1.36.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.55-.47.95-.88 1.36-.41.41-.81.66-1.36.88-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.66 3.66 0 0 1-1.36-.88 3.66 3.66 0 0 1-.88-1.36c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.55.47-.95.88-1.36.41-.41.81-.66 1.36-.88.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.31-1.46.72-2.13 1.38A5.86 5.86 0 0 0 .63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.79.72 1.46 1.38 2.13.66.66 1.34 1.07 2.13 1.38.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56.79-.31 1.46-.72 2.13-1.38.66-.66 1.07-1.34 1.38-2.13.3-.76.5-1.64.56-2.91.06-1.27.07-1.68.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.86 5.86 0 0 0-1.38-2.13A5.86 5.86 0 0 0 19.86.63C19.1.33 18.22.13 16.95.07 15.67.01 15.26 0 12 0z" />
      <path d="M12 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84zm0 10.16A4 4 0 1 1 16 12a4 4 0 0 1-4 4zM18.41 4.6a1.44 1.44 0 1 0 1.44 1.44 1.44 1.44 0 0 0-1.44-1.44z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M17.47 14.38c-.29-.15-1.7-.84-1.97-.93-.26-.1-.46-.15-.65.14-.2.3-.75.94-.92 1.13-.17.2-.34.22-.63.08-.29-.15-1.22-.45-2.33-1.44-.86-.77-1.44-1.71-1.61-2-.17-.3-.02-.46.13-.6.13-.13.29-.34.44-.51.15-.17.2-.3.29-.49.1-.2.05-.37-.02-.51-.08-.15-.65-1.58-.9-2.16-.24-.58-.48-.5-.65-.5h-.56c-.2 0-.51.07-.78.37-.26.3-1.02 1-1.02 2.45s1.05 2.84 1.19 3.04c.15.2 2.06 3.15 5 4.41.7.3 1.24.48 1.67.62.7.22 1.34.19 1.84.12.56-.08 1.7-.7 1.94-1.37.24-.68.24-1.26.17-1.38-.07-.13-.26-.2-.55-.35z" />
      <path d="M12.01 2C6.5 2 2 6.48 2 12c0 1.85.5 3.65 1.44 5.22L2 22l4.9-1.4A9.96 9.96 0 0 0 12.01 22C17.5 22 22 17.52 22 12S17.5 2 12.01 2zm0 18.1c-1.62 0-3.2-.44-4.58-1.26l-.33-.2-3.02.86.83-2.98-.21-.34A8.08 8.08 0 0 1 3.9 12c0-4.47 3.64-8.1 8.1-8.1 4.47 0 8.1 3.63 8.1 8.1s-3.63 8.1-8.09 8.1z" />
    </svg>
  );
}

export default function Footer() {
  const [settings, setSettings] = useState<PFPublicSettings | null>(null);

  useEffect(() => {
    getPublicSettings().then(setSettings);
  }, []);

  const hasSocial =
    settings && (settings.instagramUrl || settings.facebookUrl || settings.whatsappUrl);

  return (
    <footer className="bg-[#044389] text-white/70 py-6 mt-8">
      {hasSocial && (
        <div className="flex justify-center gap-4 mb-3">
          {settings?.instagramUrl && (
            <a
              href={settings.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-white/80 hover:text-[#FCFF4B] transition-colors"
            >
              <InstagramIcon />
            </a>
          )}
          {settings?.facebookUrl && (
            <a
              href={settings.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-white/80 hover:text-[#FCFF4B] transition-colors"
            >
              <FacebookIcon />
            </a>
          )}
          {settings?.whatsappUrl && (
            <a
              href={settings.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="text-white/80 hover:text-[#FCFF4B] transition-colors"
            >
              <WhatsAppIcon />
            </a>
          )}
        </div>
      )}
      <p className="text-xs text-center">
        © {new Date().getFullYear()} Punto Fiesta — Todos los derechos reservados
      </p>
    </footer>
  );
}
