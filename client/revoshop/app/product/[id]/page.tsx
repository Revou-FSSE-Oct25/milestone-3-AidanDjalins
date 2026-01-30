// app/product/[id]/page.tsx

import { Product } from "@/types/product";
import ProductCard from "@/components/product_card";
import Image from "next/image";

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

const ProductPage = async ({ params }: PageProps) => {
    const { id } = await params;  
    const product = await fetchProduct(id);

    if (!product) {
      return (
        <div className="mx-auto max-w-3xl px-4 py-8">
          <p className="text-red-600">Error: Unable to load product at this time.</p>
        </div>
      );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            {/* PRODUCT IMAGE */}
            <div className="w-full lg:w-1/2">
              <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden">
                <Image
                  src={product.images[0]}
                  alt={product.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            
            {/* PRODUCT DETAILS */}
            <div className="w-full lg:w-1/2 flex flex-col gap-6">
              <h1 className="text-3xl lg:text-4xl font-bold">
                {product.title}
              </h1>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
              <div className="text-4xl font-bold">${product.price.toFixed(2)}</div>
              <button className="w-full bg-black text-white px-8 py-4 rounded-lg hover:bg-gray-800 transition-colors font-medium mt-4">
                Add to Cart
              </button>
              <p className="text-gray-500 text-sm mt-2">
                By clicking Pay Now, you agree to our{" "}
                <span className="underline hover:text-black cursor-pointer">Terms & Conditions</span>{" "}
                and <span className="underline hover:text-black cursor-pointer">Privacy Policy</span>
                . You authorize us to charge your selected payment method for the
                total amount shown. All sales are subject to our return and{" "}
                <span className="underline hover:text-black cursor-pointer">Refund Policies</span>.
              </p>
            </div>
          </div>
        </div>
    );
};

export default ProductPage;