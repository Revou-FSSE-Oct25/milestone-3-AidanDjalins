"use client"

import { useEffect, useState } from "react";
import ProductList from "@/components/products_list";
import { Product } from "@/types/product";
import Spinner from "@/components/spinner";
import Image from "next/image";
import axios from "axios";

const Homepage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        const { data } = await axios.get<Product[]>(
          "https://api.escuelajs.co/api/v1/products",
        );
        // Filter product amount shown by id
        const filteredData = data.filter(product => product.id >= 1 && product.id <= 100);
        setProducts(filteredData);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Products could not be fetched. Please try again";
        setErrorMessage(message);
      } finally {
        setIsLoading(false);
      }
    }

    loadProducts();
  }, []);
  return (
    <div className="">
      <div className="relative aspect-[3/1] mb-12">
        <Image src="/featured.png" alt="Featured Product" fill />
      </div>
      {isLoading && <Spinner />}
        {errorMessage && <p className="text-red-600">Error: {errorMessage}</p>}
        {!isLoading && !errorMessage && <ProductList products={products} />}
    </div>
  );
};

export default Homepage;