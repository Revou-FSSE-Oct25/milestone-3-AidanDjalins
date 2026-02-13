import { Product } from "@/types/product";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import useCartStore from "@/app/stores/cartStore";

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCartStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent Link navigation
    addToCart(product, 1);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col h-full">
      {/* PRODUCT IMAGE */}
      <div className="relative h-64 bg-gray-50 p-4">
        <Image
          src={product.images?.[0] || '/placeholder.png'}
          alt={product.title}
          fill
          className="object-contain p-2"
        />
      </div>

      {/* PRODUCT DETAILS */}
      <div className="flex flex-col flex-grow p-6">
        {/* PRODUCT TITLE */}
        <h2 className="font-semibold text-lg mb-3 line-clamp-2 min-h-[3.5rem]">
          {product.title}
        </h2>

        {/* PRODUCT DESCRIPTION */}
        <p className="text-sm text-gray-500 mb-4 line-clamp-3 flex-grow">
          {product.description}
        </p>

        {/* PRODUCT PRICE AND ADD TO CART BUTTON */}
        <div className="flex items-center justify-between mt-auto pt-4">
          <p className="font-bold text-xl">${product.price.toFixed(2)}</p>
          <button
            onClick={handleAddToCart}
            className="bg-white ring-1 ring-gray-300 rounded-md px-4 py-2 text-sm font-medium cursor-pointer hover:bg-black hover:text-white transition-all duration-300 flex items-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;