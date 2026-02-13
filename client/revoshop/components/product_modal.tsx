"use client"

import { Product } from "@/types/product";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { X } from "lucide-react";

type ProductModalProps = {
  product: Product | null;
  onClose: () => void;
  onSave: (product: Product) => void;
};

const ProductModal = ({ product, onClose, onSave }: ProductModalProps) => {
  const [formData, setFormData] = useState({
    title: product?.title || "",
    price: product?.price || 0,
    description: product?.description || "",
    categoryId: product?.category.id || 1,
    images: product?.images || [""],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (product) {
        const { data } = await axios.put(`/api/products/${product.id}`, formData);
        toast.success("Product updated successfully");
        onSave(data);
      } else {
        const { data } = await axios.post("/api/products", formData);
        toast.success("Product created successfully");
        onSave(data);
      }
    } catch (error) {
      toast.error(`Failed to ${product ? 'update' : 'create'} product`);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {product ? 'Edit Product' : 'Add Product'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Price</label>
            <input
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg h-32"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Category ID</label>
            <input
              type="number"
              value={formData.categoryId}
              onChange={(e) => setFormData({ ...formData, categoryId: parseInt(e.target.value) })}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Image URL</label>
            <input
              type="url"
              value={formData.images[0]}
              onChange={(e) => setFormData({ ...formData, images: [e.target.value] })}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="https://example.com/image.jpg"
              required
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-black text-white py-3 rounded-lg hover:bg-gray-800"
            >
              {product ? 'Update' : 'Create'} Product
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;