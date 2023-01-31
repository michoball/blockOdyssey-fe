const BASE_URL = "https://dummyjson.com";

const getProduct = async () => {
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
