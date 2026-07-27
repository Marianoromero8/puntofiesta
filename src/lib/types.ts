export interface PFCategory {
  id: string;
  name: string;
  slug: string;
  active: boolean;
}

export interface PFProduct {
  id: string;
  name: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
  categoryId: string;
  stock: number;
  active: boolean;
  featured: boolean;
  category?: PFCategory | null;
}

export interface PFPublicSettings {
  address: string;
  instagramUrl: string;
  facebookUrl: string;
  whatsappUrl: string;
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  imageUrl: string | null;
  quantity: number;
  stock: number;
}

export interface PFAnnouncement {
  id: string;
  type: 'POPUP' | 'CAROUSEL';
  imageUrl: string;
  title: string | null;
  isActive: boolean;
  displayOrder: number;
}

export type PFDeliveryMethod = 'PICKUP' | 'DELIVERY';

export interface CreateOrderDto {
  clientName: string;
  clientSurname: string;
  clientEmail: string;
  clientPhone: string;
  clientDni: string;
  clientCuil: string;
  clientAddress: string;
  deliveryMethod: PFDeliveryMethod;
  items: { productId: string; quantity: number }[];
}

export interface PFOrderItemResult {
  id: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  product?: { id: string; name: string; imageUrl: string | null } | null;
}

export interface PFOrderResult {
  id: string;
  orderNumber: number;
  clientName: string;
  clientSurname: string;
  total: number;
  deliveryMethod: PFDeliveryMethod;
  status: string;
  items: PFOrderItemResult[];
  createdAt?: string;
}
