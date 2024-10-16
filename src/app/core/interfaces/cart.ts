export interface CartDetails {
  status: string;
  numOfCartItems: number;
  data: Data;
}

export interface Cart {
  numOfCartItems: number;
  data: Data;
}

export interface Data {
  totalCartPrice: number;
  products: Products[];
  _id: string;
}

export interface Products {
  count: number;
  _id: string;
  price: number;
  product: InnerProduct;
}

export interface InnerProduct {
  subcategory: Brand[];
  _id: string;
  title: string;
  quantity: number;
  imageCover: string;
  category: Brand;
  brand: Brand;
  ratingsAverage: number;
  id: string;
}

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image?: string;
  category?: string;
}
