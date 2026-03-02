export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  token: string;
}

export interface Book {
  id: number;
  title: string;
  author: string;
  type: string;
  price: number;
  image?: string;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
}
