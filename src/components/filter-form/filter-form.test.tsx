import { describe, it, expect, vi, Mock } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import FilterForm from './filter-form';
import { useSearchParams } from 'react-router-dom';
import { TYPE_CHECKBOX_INPUTS, LEVEL_CHECKBOX_INPUTS } from './common';

vi.mock('../category-filter-list/category-filter-list', () => ({
  default: () => <div>CategoryFilterList</div>,
}));

vi.mock('../checkbox-filter-list/checkbox-filter-list', () => ({
  default: ({ items }: { items: Array<{ name: string }> }) => (
    <div>
      {items.map((item) => (
        <div key={item.name}>{item.name}</div>
      ))}
    </div>
  ),
}));

const mockSetSearchParams: Mock<[URLSearchParams], void> = vi.fn();

vi.mock('react-router-dom', () => ({
  useSearchParams: vi.fn(() => [
    new URLSearchParams(),
    mockSetSearchParams,
  ]),
}));

describe('FilterForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly', () => {
    render(<FilterForm />);

    expect(screen.getByText('Фильтр')).toBeInTheDocument();
    expect(screen.getByText('Цена, ₽')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('от')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('до')).toBeInTheDocument();
    expect(screen.getByText('Категория')).toBeInTheDocument();
    expect(screen.getByText('Тип камеры')).toBeInTheDocument();
    expect(screen.getByText('Уровень')).toBeInTheDocument();
    expect(screen.getByText('Сбросить фильтры')).toBeInTheDocument();
  });

  it('renders CheckboxFilterList with correct props', () => {
    render(<FilterForm />);

    TYPE_CHECKBOX_INPUTS.forEach((item) => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
    });

    LEVEL_CHECKBOX_INPUTS.forEach((item) => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
    });
  });

  it('handles reset button click correctly', () => {
    const initialParams = new URLSearchParams();
    initialParams.set('price', '1000');
    initialParams.set('priceUp', '5000');
    initialParams.set('sort', 'price');
    initialParams.set('sort-direction', 'asc');

    // Type the mock implementation
    (useSearchParams as Mock).mockReturnValueOnce([
      initialParams,
      mockSetSearchParams,
    ]);

    render(<FilterForm />);

    const resetButton = screen.getByText('Сбросить фильтры');
    fireEvent.click(resetButton);

    expect(mockSetSearchParams).toHaveBeenCalledTimes(1);

    const newParams: URLSearchParams = mockSetSearchParams.mock.calls[0][0];
    expect(newParams.get('sort')).toBe('price');
    expect(newParams.get('sort-direction')).toBe('asc');
    expect(newParams.get('price')).toBeNull();
    expect(newParams.get('priceUp')).toBeNull();
  });

  it('does not keep sort params if they are not present initially', () => {
    const initialParams = new URLSearchParams();
    initialParams.set('price', '1000');

    (useSearchParams as Mock).mockReturnValueOnce([
      initialParams,
      mockSetSearchParams,
    ]);

    render(<FilterForm />);

    const resetButton = screen.getByText('Сбросить фильтры');
    fireEvent.click(resetButton);

    const newParams: URLSearchParams = mockSetSearchParams.mock.calls[0][0];
    expect(newParams.toString()).toBe('');
  });
});
