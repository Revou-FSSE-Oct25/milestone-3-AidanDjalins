// app/product/[id]/page.tsx

import { Product } from "@/types/product";
import ProductCard from "@/components/product_card";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{
    id: string;  // Changed from 'number' to 'id'
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
    const { id } = await params;  // Changed from 'number' to 'id'
    const product = await fetchProduct(id);

    return (
        <div className="mx-auto max-w-3xl px-4 py-8">
            {!product && (
          <p className="text-red-600">Error: Unable to load product at this time.</p>
            )}
            {product && (
            <div className="space-y-4">
                <ProductCard product={product} />
            </div>
            )}
        </div>
    );
};

export default ProductPage;