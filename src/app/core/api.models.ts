export interface Store {
  id: number;
  name: string;
  address: string | null;
  manager: string | null;
}

export interface Product {
  id: number;
  name: string;
  description: string | null;
  price: string;
  store_id: number;
}

export interface Payment {
  id: number;
  name: string;
}

export interface Order {
  id: number;
  total_value: string;
  store_id: number;
  payment_id: number;
  customer_id: number;
}

export interface OrderItem {
  id: number;
  quantity: number;
  unitary_value: string;
  total_value: string;
  order_id: number;
  product_id: number;
}

export interface AuthenticatedUser {
  id: number;
  email: string;
  role: 'customer' | 'admin';
  customer_id: number | null;
}

export interface Session {
  token: string;
  user: AuthenticatedUser;
}
