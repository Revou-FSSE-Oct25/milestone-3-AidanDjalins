import { Product } from "@/types/product";
import { useSearchParams } from "next/navigation";
import Categories from "./categories";
import ProductCard from "./product_card";
import Link from "next/link";

type ProductListProps = {
  products: Product[];
};

const ProductList = ({ products }: ProductListProps) => {
    const searchPrams = useSearchParams();
    const selectedCategory = searchPrams.get("category") || "all";

    // Categorize products according to Fake Store API slug
    const getCategorySlug = (productCategory: string): string => {
        const categoryMap: Record<string, string> = {
        "men's clothing": "clothes",      
        "women's clothing": "clothes",    
        "electronics": "electronics",     
        "jewelery": "miscellaneous",      
        };
    
        return categoryMap[productCategory.toLowerCase()] || "miscellaneous";
    }

    const filteredProducts = selectedCategory === "all" 
        ? products 
        : products.filter((product) => getCategorySlug(product.category) === selectedCategory);

  return (
    <div className="w-full">
        <Categories />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => (
            <Link
            key={product.id}
            href={`/product/${product.id}`}
            className="block transition-transform hover:-translate-y-1"
            >
            <ProductCard product={product} />
            </Link>
        ))}
        </div>
    </div>
  );
};

export default ProductList;