import { useQuery } from "@tanstack/react-query";
import ProductService from "../../api/productService";

const useProductQuery = () => {
  const useGetAllProductQuery = () => {
    return useQuery({
      queryKey: ["Products"],
      queryFn: ProductService.getProduct,
      staleTime: 5000,
    });
  };

  return {
    useGetAllProductQuery,
  };
};

export default useProductQuery;
