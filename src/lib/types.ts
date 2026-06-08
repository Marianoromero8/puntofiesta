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
  category?: PFCategory | null;
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  imageUrl: string | null;
  quantity: number;
}

export interface CreateOrderDto {
  clientName: string;
  clientSurname: string;
  clientEmail: string;
  clientPhone: string;
  clientDni: string;
  clientCuil: string;
  clientAddress: string;
  items: { productId: string; quantity: number }[];
}
