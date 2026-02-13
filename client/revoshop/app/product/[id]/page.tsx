"use client"

import { Product } from "@/types/product";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import useCartStore from "@/app/stores/cartStore";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{
    id: string;  
  }>;
};

async function fetchProduct(id: string) {
  const res = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`, {
    cache: "force-cache", 
    next: { revalidate: 60 }, 
  });

  if (!res.ok) return null;
  return (await res.json()) as Product;
}

export default function ProductPage({ params }: PageProps) {
    const [product, setProduct] = useState<Product | null>(null);
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCartStore();

    useEffect(() => {
        async function loadProduct() {
            const { id } = await params;
            const fetchedProduct = await fetchProduct(id);
            setProduct(fetchedProduct);
        }
        loadProduct();
    }, [params]);

    if (!product) {
      return (
        <div className="mx-auto max-w-3xl px-4 py-8">
          <p className="text-red-600">Error: Unable to load product at this time.</p>
        </div>
      );
    }

    const validImage = product.images?.find(img => img && img.startsWith('https://')) || '/placeholder.png';

    const handleAddToCart = () => {
        addToCart(product, quantity);
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            {/* IMAGE SECTION */}
            <div className="w-full lg:w-1/2">
              <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden">
                <Image
                  src={validImage}
                  alt={product.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            
            {/* PRODUCT DETAILS SECTION */}
            <div className="w-full lg:w-1/2 flex flex-col gap-6">
              <h1 className="text-3xl lg:text-4xl font-bold">
                {product.title}
              </h1>
              
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
              
              <div className="text-4xl font-bold">
                ${product.price.toFixed(2)}
              </div>

              {/* QUANTITY SELECTOR */}
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium">Quantity:</label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-md border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-md border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              <button 
                onClick={handleAddToCart}
                className="w-full bg-black text-white px-8 py-4 rounded-lg hover:bg-gray-800 transition-colors font-medium mt-4 flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>

              <div className="text-sm text-gray-500 mt-4">
                By clicking Pay Now, you agree to our{" "}
                <span className="underline cursor-pointer">Terms & Conditions</span> and{" "}
                <span className="underline cursor-pointer">Privacy Policy</span>. 
                You authorize us to charge your selected payment method for the total amount shown. 
                All sales are subject to our return and{" "}
                <span className="underline cursor-pointer">Refund Policies</span>.
              </div>
            </div>
          </div>
        </div>
    );
}