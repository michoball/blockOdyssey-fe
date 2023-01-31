const BASE_URL = "https://dummyjson.com";

export interface Product {
  id: number;
  title: string;
  brand: string;
  description: string;
  price: number;
  rating: number;
  stock: number;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface IProducts {
  total: number;
  products: Product[];
  limit: number;
}

const getProduct = async (): Promise<IProducts> => {
  const response = await fetch(`${BASE_URL}/products?limit=100`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

const ProductService = {
  getProduct,
};

export default ProductService;
