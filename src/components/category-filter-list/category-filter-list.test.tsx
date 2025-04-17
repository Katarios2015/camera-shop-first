import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import CategoryFilterList from './category-filter-list';
import { useSearchParams } from 'react-router-dom';
import { CATEGORY_RADIO_INPUTS, FilterParamsKeys } from '../filter-form/common';
import userEvent from '@testing-library/user-event';

vi.mock('react-router-dom', () => ({
  useSearchParams: vi.fn(),
}));

describe('CategoryFilterList', () => {
  const mockSetSearchParams = vi.fn();
  let searchParams: URLSearchParams;

  beforeEach(() => {
    searchParams = new URLSearchParams();
    vi.mocked(useSearchParams).mockReturnValue([
      searchParams,
      mockSetSearchParams,
    ]);
    vi.clearAllMocks();
  });
  afterEach(() => {
    searchParams.delete(FilterParamsKeys.Category);
  });

  it('renders all category radio inputs', () => {
    render(<CategoryFilterList />);

    CATEGORY_RADIO_INPUTS.forEach((item) => {
      expect(screen.getByLabelText(item.label)).toBeInTheDocument();
      expect(screen.getByDisplayValue(item.defaultValue)).toBeInTheDocument();
    });
  });

  it('sets search param when radio button is clicked', async() => {
    const categoryButtonId = 'categoryButton';
    render(<CategoryFilterList />);
    const radioButtons = screen.getAllByTestId(categoryButtonId);
    const firstRadio = radioButtons[0];

    await userEvent.click(firstRadio);

    expect(mockSetSearchParams).toHaveBeenCalledTimes(1);
    expect(searchParams.get(FilterParamsKeys.Category)).toBe('Фотоаппарат');
  });

  it('marks radio as checked when search param matches', () => {
    const categoryButtonId = 'categoryButton';
    const categorySearchValue = 'Фотоаппарат';
    searchParams.set(FilterParamsKeys.Category, categorySearchValue);
    render(<CategoryFilterList />);

    const radioButtons: HTMLInputElement[] = screen.getAllByTestId(categoryButtonId);

    expect(radioButtons[0].checked).toBe(true);
    expect(radioButtons[1].checked).toBe(false);
  });

  it('set correct cirillic value to searchParams', async() => {
    render(<CategoryFilterList />);
    const firstRadio = screen.getByDisplayValue(CATEGORY_RADIO_INPUTS[0].defaultValue);

    await userEvent.click(firstRadio);

    expect(searchParams.get(CATEGORY_RADIO_INPUTS[0].name)).toBe('Фотоаппарат');
  });

});
