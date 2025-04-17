import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { useSearchParams } from 'react-router-dom';
import CheckboxFilterList from './checkbox-filter-list';
import { CheckboxType } from '../../types/checkbox-type';
import { FilterParamsKeys, FilterParamsValues, CirilicFilters, getCirilicParamValue } from '../filter-form/common';


vi.mock('react-router-dom', () => ({
  useSearchParams: vi.fn(),
}));

const mockItems: CheckboxType[] = [
  { name: FilterParamsValues.TypeFilm, label: 'Film' },
  { name: FilterParamsValues.TypeSnapshot, label: 'Snapshot' },
  { name: FilterParamsValues.TypeDigital, label: 'Digital' },
  { name: FilterParamsValues.TypeCollection, label: 'Collection' },
];

describe('CheckboxFilterList', () => {
  const mockSetSearchParams = vi.fn();
  const mockSearchParams = new URLSearchParams();

  beforeEach(() => {
    mockSearchParams.delete(FilterParamsKeys.Category);
    mockSearchParams.delete(FilterParamsKeys.Type);
    mockSetSearchParams.mockClear();
    vi.mocked(useSearchParams).mockReturnValue([mockSearchParams, mockSetSearchParams]);
  });

  it('renders checkboxes for all items', () => {
    render(<CheckboxFilterList items={mockItems} />);

    mockItems.forEach((item) => {
      expect(screen.getByLabelText(item.label)).toBeInTheDocument();
    });
  });

  it('sets checked state based on search params', () => {
    mockSearchParams.append(FilterParamsKeys.Type, getCirilicParamValue(mockItems[0].name));
    render(<CheckboxFilterList items={mockItems} />);

    const firstCheckbox = screen.getByLabelText(mockItems[0].label);
    expect(firstCheckbox).toBeChecked();

    const secondCheckbox = screen.getByLabelText(mockItems[1].label);
    expect(secondCheckbox).not.toBeChecked();
    const thirdCheckbox = screen.getByLabelText(mockItems[2].label);
    expect(thirdCheckbox).not.toBeChecked();
    const fourthCheckbox = screen.getByLabelText(mockItems[3].label);
    expect(fourthCheckbox).not.toBeChecked();
  });

  it('handles checkbox change by adding to search params when checked', () => {
    render(<CheckboxFilterList items={mockItems} />);
    const checkbox:HTMLInputElement = screen.getByLabelText(mockItems[0].label);

    fireEvent.click(checkbox);
    expect(mockSearchParams.get(FilterParamsKeys.Type)).toBe(getCirilicParamValue(checkbox.name));
  });

  it('handles checkbox change by removing from search params when unchecked', () => {
    mockSearchParams.append(FilterParamsKeys.Type, getCirilicParamValue(mockItems[0].name));
    render(<CheckboxFilterList items={mockItems} />);
    const checkbox = screen.getByLabelText(mockItems[0].label);
    fireEvent.click(checkbox);

    expect(mockSetSearchParams).toHaveBeenCalledWith(
      expect.not.objectContaining({
        [FilterParamsKeys.Type]: [getCirilicParamValue(mockItems[0].name)]
      })
    );
  });

  it('disables Film and Snapshot checkboxes when category is Videocamera', () => {
    mockSearchParams.set(FilterParamsKeys.Category, CirilicFilters.Videocamera);
    render(<CheckboxFilterList items={mockItems} />);

    const filmCheckbox = screen.getByLabelText(mockItems[0].label);
    const snapshotCheckbox = screen.getByLabelText(mockItems[1].label);
    const digitalCheckbox = screen.getByLabelText(mockItems[2].label);

    expect(filmCheckbox).toBeDisabled();
    expect(snapshotCheckbox).toBeDisabled();
    expect(digitalCheckbox).not.toBeDisabled();
  });

  it('does not disable any checkboxes when category is not Videocamera', () => {
    mockSearchParams.set(FilterParamsKeys.Category, 'some-other-category');
    render(<CheckboxFilterList items={mockItems} />);

    mockItems.forEach((item) => {
      expect(screen.getByLabelText(item.label)).not.toBeDisabled();
    });
  });

  it('does not remove Film and Snapshot from search params when category is not Videocamera', () => {
    mockSearchParams.append(FilterParamsKeys.Type, getCirilicParamValue(mockItems[0].name));
    mockSearchParams.append(FilterParamsKeys.Type, getCirilicParamValue(mockItems[1].name));
    mockSearchParams.set(FilterParamsKeys.Category, CirilicFilters.Photocamera);

    render(<CheckboxFilterList items={mockItems} />);

    expect(mockSearchParams.getAll(FilterParamsKeys.Type).length).toBe(2);
  });
});
