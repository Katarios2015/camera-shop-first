import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SortCatalog from './sort-catalog';
import { useSearchParams } from 'react-router-dom';
import { SortTypes, SortDirectionTypes, SortParamsKeys } from './common';

vi.mock('react-router-dom', () => ({
  useSearchParams: vi.fn(),
}));

describe('SortCatalog component', () => {
  const mockSetSearchParams = vi.fn();

  beforeEach(() => {
    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams({
        [SortParamsKeys.Sort]: SortTypes.Price,
        [SortParamsKeys.Direction]: SortDirectionTypes.LowToHigh
      }),
      mockSetSearchParams
    ]);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly with default values', () => {
    render(<SortCatalog />);

    expect(screen.getByText('Сортировать:')).toBeInTheDocument();
    expect(screen.getByLabelText('по цене')).toBeChecked();
    expect(screen.getByLabelText('по популярности')).not.toBeChecked();
    expect(screen.getByLabelText('По возрастанию')).toBeChecked();
    expect(screen.getByLabelText('По убыванию')).not.toBeChecked();
  });

  it('updates sort type when clicking on price radio button', () => {
    render(<SortCatalog />);

    const priceRadio = screen.getByLabelText('по цене');
    fireEvent.click(priceRadio);

    expect(mockSetSearchParams).toHaveBeenCalledWith({
      [SortParamsKeys.Sort]: 'sortPrice',
      [SortParamsKeys.Direction]: 'up'
    });
  });

  it('updates sort type when clicking on popularity radio button', () => {
    render(<SortCatalog />);

    const popularityRadio = screen.getByLabelText('по популярности');
    fireEvent.click(popularityRadio);

    expect(mockSetSearchParams).toHaveBeenCalledWith({
      [SortParamsKeys.Sort]: 'sortPopular',
      [SortParamsKeys.Direction]: 'up'
    });
  });

  it('updates sort direction when clicking on up radio button', () => {
    render(<SortCatalog />);

    const upRadio = screen.getByLabelText('По возрастанию');
    fireEvent.click(upRadio);

    expect(mockSetSearchParams).toHaveBeenCalledWith({
      [SortParamsKeys.Sort]: 'sortPrice',
      [SortParamsKeys.Direction]: 'up'
    });
  });

  it('updates sort direction when clicking on down radio button', () => {
    render(<SortCatalog />);

    const downRadio = screen.getByLabelText('По убыванию');
    fireEvent.click(downRadio);

    expect(mockSetSearchParams).toHaveBeenCalledWith({
      [SortParamsKeys.Sort]: 'sortPrice',
      [SortParamsKeys.Direction]: 'down'
    });
  });

  it('reflects the current search params in the UI', () => {
    vi.mocked(useSearchParams).mockReturnValueOnce([
      new URLSearchParams({
        [SortParamsKeys.Sort]: SortTypes.Popular,
        [SortParamsKeys.Direction]: SortDirectionTypes.HighToLow
      }),
      mockSetSearchParams
    ]);

    render(<SortCatalog />);

    expect(screen.getByLabelText('по популярности')).toBeChecked();
    expect(screen.getByLabelText('по цене')).not.toBeChecked();
    expect(screen.getByLabelText('По убыванию')).toBeChecked();
    expect(screen.getByLabelText('По возрастанию')).not.toBeChecked();
  });
});
