import { renderHook } from '@testing-library/react';
import useAllFilters from './use-all-filters';
import { GoodType } from '../../types/good-type';
import { FilterParamsKeys } from '../../components/filter-form/common';
import {SortParamsKeys} from '../../components/sort-catalog/common';


describe('useAllFilters', () => {
  const mockGoods: GoodType[] = [
    {
      id: 1,
      name: 'Camera 1',
      vendorCode: 'string',
      category: 'Photocamera',
      type: 'Digital',
      level: 'Professional',
      price: 1000,
      rating: 5,
      description: 'Test',
      reviewCount: 10,
      previewImg: 'test.jpg',
      previewImg2x: 'test@2x.jpg',
      previewImgWebp: 'test.webp',
      previewImgWebp2x: 'test@2x.webp',
    },
    {
      id: 2,
      name: 'Camera 2',
      vendorCode: 'string',
      category: 'Videocamera',
      type: 'Film',
      level: 'Amateur',
      price: 500,
      rating: 4,
      description: 'Test',
      reviewCount: 5,
      previewImg: 'test2.jpg',
      previewImg2x: 'test2@2x.jpg',
      previewImgWebp: 'test2.webp',
      previewImgWebp2x: 'test2@2x.webp',
    },
    {
      id: 3,
      name: 'Camera 3',
      vendorCode: 'string',
      category: 'Photocamera',
      type: 'Film',
      level: 'Zero',
      price: 200,
      rating: 3,
      description: 'Test',
      reviewCount: 2,
      previewImg: 'test3.jpg',
      previewImg2x: 'test3@2x.jpg',
      previewImgWebp: 'test3.webp',
      previewImgWebp2x: 'test3@2x.webp',
    },
  ];

  it('should return all goods when no filters applied', () => {
    const searchParams = new URLSearchParams();
    const { result } = renderHook(() => useAllFilters(mockGoods, searchParams));
    expect(result.current).toEqual(mockGoods);
  });

  it('should filter by category', () => {
    const searchParams = new URLSearchParams();
    searchParams.append(FilterParamsKeys.Category, 'Photocamera');
    const { result } = renderHook(() => useAllFilters(mockGoods, searchParams));
    expect(result.current).toEqual([mockGoods[0], mockGoods[2]]);
  });

  it('should filter by multiple categories', () => {
    const searchParams = new URLSearchParams();
    searchParams.append(FilterParamsKeys.Category, 'Photocamera');
    searchParams.append(FilterParamsKeys.Category, 'Videocamera');
    const { result } = renderHook(() => useAllFilters(mockGoods, searchParams));
    expect(result.current).toEqual(mockGoods);
  });

  it('should filter by type', () => {
    const searchParams = new URLSearchParams();
    searchParams.append(FilterParamsKeys.Type, 'Digital');
    const { result } = renderHook(() => useAllFilters(mockGoods, searchParams));
    expect(result.current).toEqual([mockGoods[0]]);
  });

  it('should filter by level', () => {
    const searchParams = new URLSearchParams();
    searchParams.append(FilterParamsKeys.Level, 'Professional');
    const { result } = renderHook(() => useAllFilters(mockGoods, searchParams));
    expect(result.current).toEqual([mockGoods[0]]);
  });

  it('should filter by price range', () => {
    const searchParams = new URLSearchParams();
    searchParams.append(FilterParamsKeys.MinimumPrice, '300');
    searchParams.append(FilterParamsKeys.MaximumPrice, '600');
    const { result } = renderHook(() => useAllFilters(mockGoods, searchParams));
    expect(result.current).toEqual([mockGoods[1]]);
  });

  it('should filter by multiple parameters', () => {
    const searchParams = new URLSearchParams();
    searchParams.append(FilterParamsKeys.Category, 'Photocamera');
    searchParams.append(FilterParamsKeys.Type, 'Film');
    searchParams.append(FilterParamsKeys.Level, 'Zero');
    const { result } = renderHook(() => useAllFilters(mockGoods, searchParams));
    expect(result.current).toEqual([mockGoods[2]]);
  });

  it('should ignore sort parameters', () => {
    const searchParams = new URLSearchParams();
    searchParams.append(SortParamsKeys.Sort, 'price');
    searchParams.append(SortParamsKeys.Direction, 'asc');
    const { result } = renderHook(() => useAllFilters(mockGoods, searchParams));
    expect(result.current).toEqual(mockGoods);
  });

  it('should return empty array when no matches found', () => {
    const searchParams = new URLSearchParams();
    searchParams.append(FilterParamsKeys.Category, 'Nonexistent');
    const { result } = renderHook(() => useAllFilters(mockGoods, searchParams));
    expect(result.current).toEqual([]);
  });
});
