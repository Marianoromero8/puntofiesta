import type { PFCategory, PFProduct, CreateOrderDto, PFAnnouncement, PFPublicSettings } from './types';

const BASE = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/punto-fiesta`;

export async function getCategories(): Promise<PFCategory[]> {
  const res = await fetch(`${BASE}/categories`);
  if (!res.ok) throw new Error('Error fetching categories');
  const json = await res.json();
  return json.data as PFCategory[];
}

export async function getProducts(): Promise<PFProduct[]> {
  const res = await fetch(`${BASE}/products`);
  if (!res.ok) throw new Error('Error fetching products');
  const json = await res.json();
  return json.data as PFProduct[];
}

export async function getActivePopup(): Promise<PFAnnouncement[]> {
  const res = await fetch(`${BASE}/announcements/active-popup`);
  if (!res.ok) return [];
  const json = await res.json();
  return json.data as PFAnnouncement[];
}

export async function getActiveCarousel(): Promise<PFAnnouncement[]> {
  const res = await fetch(`${BASE}/announcements/active-carousel`);
  if (!res.ok) return [];
  const json = await res.json();
  return json.data as PFAnnouncement[];
}

export async function getPublicSettings(): Promise<PFPublicSettings> {
  const res = await fetch(`${BASE}/settings/public`);
  if (!res.ok) return { address: '', instagramUrl: '', facebookUrl: '', whatsappUrl: '' };
  const json = await res.json();
  return json.data as PFPublicSettings;
}

export async function createOrder(data: CreateOrderDto) {
  const res = await fetch(`${BASE}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message ?? 'Error al crear el pedido');
  }
  return res.json();
}
