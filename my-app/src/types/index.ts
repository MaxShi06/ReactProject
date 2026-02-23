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
