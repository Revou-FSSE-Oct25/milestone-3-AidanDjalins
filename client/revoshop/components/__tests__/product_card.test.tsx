import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from '../product_card';
import { Product } from '@/types/product';
import useCartStore from '@/app/stores/cartStore';

jest.mock('@/app/stores/cartStore');

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

const mockProduct: Product = {
  id: 1,
  title: 'Test Product',
  slug: 'test-product',
  price: 99.99,
  description: 'This is a test product description',
  category: {
    id: 1,
    name: 'Electronics',
    image: 'https://example.com/image.jpg',
    slug: 'electronics',
  },
  images: ['https://example.com/product.jpg'],
};

describe('ProductCard - Functionality', () => {
  const mockAddToCart = jest.fn();

  beforeEach(() => {
    (useCartStore as unknown as jest.Mock).mockReturnValue({
      addToCart: mockAddToCart,
    });
    jest.clearAllMocks();
  });

  it('adds product to cart when Add to Cart button is clicked', () => {
    render(<ProductCard product={mockProduct} />);

    const addButton = screen.getByRole('button', { name: /add to cart/i });
    fireEvent.click(addButton);

    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct, 1);
  });
});