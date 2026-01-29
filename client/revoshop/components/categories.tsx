"use client"

import { 
    Store,
    Shirt, 
    Footprints, 
    Armchair, 
    Cable,
    Ellipsis, 
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const categories = [
  {
    name: "All",
    icon: <Store className="w-4 h-4" />,
    slug: "all",
  },
  {
    name: "Clothes",
    icon: <Shirt className="w-4 h-4" />,
    slug: "clothes",
  },
  {
    name: "Electronics",
    icon: <Cable className="w-4 h-4" />,
    slug: "electronics",
  },
  {
    name: "Furniture",
    icon: <Armchair className="w-4 h-4" />,
    slug: "furniture",
  },
  {
    name: "Shoes",
    icon: <Footprints className="w-4 h-4" />,
    slug: "shoes",
  },
  {
    name: "Miscellaneous",
    icon: <Ellipsis className="w-4 h-4" />,
    slug: "miscellaneous",
  },
];

const Categories = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const selectedCategory = searchParams.get("category") || "all";

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("category", value);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="w-full bg-gray-100 rounded-lg p-3 mb-6">
      {/* DESKTOP VIEW */}
      <div className="hidden md:flex items-center justify-evenly gap-2">
        {categories.map((category) => (
          <button
            key={category.slug}
            onClick={() => handleChange(category.slug)}
            className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-md transition-all duration-200 flex-1 font-medium whitespace-nowrap ${
              category.slug === selectedCategory
                ? "bg-white shadow-sm text-gray-900"
                : "text-gray-600 hover:bg-white/50 hover:text-gray-900"
            }`}
          >
            {category.icon}
            <span className="text-sm">{category.name}</span>
          </button>
        ))}
      </div>

      {/* MOBILE & TABLET VIEW */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:hidden">
        {categories.map((category) => (
          <button
            key={category.slug}
            onClick={() => handleChange(category.slug)}
            className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-md transition-all duration-200 font-medium ${
              category.slug === selectedCategory
                ? "bg-white shadow-sm text-gray-900"
                : "text-gray-600 hover:bg-white/50 hover:text-gray-900"
            }`}
          >
            {category.icon}
            <span className="text-sm">{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Categories;
