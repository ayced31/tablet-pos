export interface Product {
  id: string;
  name: string;
  price: number;
  categoryId: string;
  image: string;
  inStock: boolean;
}

export interface CartItem extends Product {
  quantity: number;
  notes?: string;
}

export interface Category {
  id: string;
  name: string;
}
