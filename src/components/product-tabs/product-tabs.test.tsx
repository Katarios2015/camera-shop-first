import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { useSearchParams } from 'react-router-dom';
import ProductTabs from './product-tabs';
import { GoodType } from '../../types/good-type';


vi.mock('react-router-dom', () => ({
  useSearchParams: vi.fn(),
}));

describe('ProductTabs', () => {
  const mockProduct: GoodType = {
    id: 1,
    name: 'Test Camera',
    vendorCode: 'VC123',
    type: 'Цифровая',
    category: 'Фотоаппарат',
    description: 'Это тестовое описание продукта',
    level: 'Любительский',
    price: 1000,
    previewImg: 'img/test.jpg',
    previewImg2x: 'img/test@2x.jpg',
    previewImgWebp: 'img/test.webp',
    previewImgWebp2x: 'img/test@2x.webp',
    rating: 4,
    reviewCount: 10,
  };

  const mockSetSearchParams = vi.fn();

  beforeEach(() => {
    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams(),
      mockSetSearchParams,
    ]);
  });

  it('render correctly tab Property by default', () => {
    render(<ProductTabs product={mockProduct} />);

    expect(screen.getByTestId('propertyButton')).toHaveClass('is-active');
    expect(screen.getByTestId('descriptionButton')).not.toHaveClass('is-active');

    expect(screen.getByTestId('tabElementProperty')).toHaveClass('is-active');
    expect(screen.getByTestId('tabElementDescription')).not.toHaveClass('is-active');
  });

  it('render correctly tab Description after click', () => {
    render(<ProductTabs product={mockProduct} />);

    const descriptionButton = screen.getByTestId('descriptionButton');
    fireEvent.click(descriptionButton);

    expect(screen.getByTestId('propertyButton')).not.toHaveClass('is-active');
    expect(screen.getByTestId('descriptionButton')).toHaveClass('is-active');

    expect(screen.getByTestId('tabElementProperty')).not.toHaveClass('is-active');
    expect(screen.getByTestId('tabElementDescription')).toHaveClass('is-active');
  });

  it('render correct properties', () => {
    render(<ProductTabs product={mockProduct} />);

    expect(screen.getByText(/Артикул:/i)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.vendorCode)).toBeInTheDocument();
    expect(screen.getByText(/Категория:/i)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.category)).toBeInTheDocument();
    expect(screen.getByText(/Тип камеры:/i)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.type)).toBeInTheDocument();
    expect(screen.getByText(/Уровень:/i)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.level)).toBeInTheDocument();
  });

  it('render correct description tab content', () => {
    render(<ProductTabs product={mockProduct} />);

    fireEvent.click(screen.getByTestId('descriptionButton'));

    expect(screen.getByTestId('description')).toHaveTextContent(mockProduct.description);
  });

  it('render correct active tab if searchParam is true', () => {
    const mockSearchParams = new URLSearchParams();
    mockSearchParams.set('tab', 'Описание');

    vi.mocked(useSearchParams).mockReturnValue([
      mockSearchParams,
      mockSetSearchParams,
    ]);

    render(<ProductTabs product={mockProduct} />);

    expect(screen.getByTestId('descriptionButton')).toHaveClass('is-active');
    expect(screen.getByTestId('tabElementDescription')).toHaveClass('is-active');
  });
});
