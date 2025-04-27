import { renderHook } from '@testing-library/react';
import useSort from './use-sort';
import { GoodType } from '../../types/good-type';
import { SortTypes, SortDirectionTypes, SortParamsKeys } from '../../components/sort-catalog/common';

describe('useSort hook', () => {
  const mockGoods: GoodType[] = [
    {
      id: 2,
      name: 'Test Item',
      vendorCode: 'string',
      category: 'Photocamera',
      type: 'Digital',
      level: 'Professional',
      price: 200,
      rating: 5,
      description: 'Test',
      reviewCount: 10,
      previewImg: 'test.jpg',
      previewImg2x: 'test@2x.jpg',
      previewImgWebp: 'test.webp',
      previewImgWebp2x: 'test@2x.webp',
    },
    {
      id: 1,
      name: 'Test Item',
      vendorCode: 'string',
      category: 'Photocamera',
      type: 'Digital',
      level: 'Professional',
      price: 100,
      rating: 3,
      description: 'Test',
      reviewCount: 10,
      previewImg: 'test.jpg',
      previewImg2x: 'test@2x.jpg',
      previewImgWebp: 'test.webp',
      previewImgWebp2x: 'test@2x.webp',
    },
    {
      id: 3,
      name: 'Test Item',
      vendorCode: 'string',
      category: 'Photocamera',
      type: 'Digital',
      level: 'Professional',
      price: 300,
      rating: 1,
      description: 'Test',
      reviewCount: 10,
      previewImg: 'test.jpg',
      previewImg2x: 'test@2x.jpg',
      previewImgWebp: 'test.webp',
      previewImgWebp2x: 'test@2x.webp',
    },
  ];

  it('should return default sorted goods (price low to high) when no params provided', () => {
    const searchParams = new URLSearchParams();

    const { result } = renderHook(() => useSort(searchParams, mockGoods));

    expect(result.current).toEqual([
      {
        id: 1,
        name: 'Test Item',
        vendorCode: 'string',
        category: 'Photocamera',
        type: 'Digital',
        level: 'Professional',
        price: 100,
        rating: 3,
        description: 'Test',
        reviewCount: 10,
        previewImg: 'test.jpg',
        previewImg2x: 'test@2x.jpg',
        previewImgWebp: 'test.webp',
        previewImgWebp2x: 'test@2x.webp',
      },
      {
        id: 2,
        name: 'Test Item',
        vendorCode: 'string',
        category: 'Photocamera',
        type: 'Digital',
        level: 'Professional',
        price: 200,
        rating: 5,
        description: 'Test',
        reviewCount: 10,
        previewImg: 'test.jpg',
        previewImg2x: 'test@2x.jpg',
        previewImgWebp: 'test.webp',
        previewImgWebp2x: 'test@2x.webp',
      },
      {
        id: 3,
        name: 'Test Item',
        vendorCode: 'string',
        category: 'Photocamera',
        type: 'Digital',
        level: 'Professional',
        price: 300,
        rating: 1,
        description: 'Test',
        reviewCount: 10,
        previewImg: 'test.jpg',
        previewImg2x: 'test@2x.jpg',
        previewImgWebp: 'test.webp',
        previewImgWebp2x: 'test@2x.webp',
      }
    ]);
  });

  it('should sort by price high to low when direction param is set', () => {
    const searchParams = new URLSearchParams();
    searchParams.set(SortParamsKeys.Direction, SortDirectionTypes.HighToLow);

    const { result } = renderHook(() => useSort(searchParams, mockGoods));

    expect(result.current).toEqual([
      {
        id: 3,
        name: 'Test Item',
        vendorCode: 'string',
        category: 'Photocamera',
        type: 'Digital',
        level: 'Professional',
        price: 300,
        rating: 1,
        description: 'Test',
        reviewCount: 10,
        previewImg: 'test.jpg',
        previewImg2x: 'test@2x.jpg',
        previewImgWebp: 'test.webp',
        previewImgWebp2x: 'test@2x.webp',
      },
      {
        id: 2,
        name: 'Test Item',
        vendorCode: 'string',
        category: 'Photocamera',
        type: 'Digital',
        level: 'Professional',
        price: 200,
        rating: 5,
        description: 'Test',
        reviewCount: 10,
        previewImg: 'test.jpg',
        previewImg2x: 'test@2x.jpg',
        previewImgWebp: 'test.webp',
        previewImgWebp2x: 'test@2x.webp',
      },
      {
        id: 1,
        name: 'Test Item',
        vendorCode: 'string',
        category: 'Photocamera',
        type: 'Digital',
        level: 'Professional',
        price: 100,
        rating: 3,
        description: 'Test',
        reviewCount: 10,
        previewImg: 'test.jpg',
        previewImg2x: 'test@2x.jpg',
        previewImgWebp: 'test.webp',
        previewImgWebp2x: 'test@2x.webp',
      },

    ]);
  });

  it('should sort by rating high to low when sort type is rating and direction is high to low', () => {
    const searchParams = new URLSearchParams();
    searchParams.set(SortParamsKeys.Sort, SortTypes.Popular);
    searchParams.set(SortParamsKeys.Direction, SortDirectionTypes.HighToLow);

    const { result } = renderHook(() => useSort(searchParams, mockGoods));

    expect(result.current).toEqual([
      {
        id: 2,
        name: 'Test Item',
        vendorCode: 'string',
        category: 'Photocamera',
        type: 'Digital',
        level: 'Professional',
        price: 200,
        rating: 5,
        description: 'Test',
        reviewCount: 10,
        previewImg: 'test.jpg',
        previewImg2x: 'test@2x.jpg',
        previewImgWebp: 'test.webp',
        previewImgWebp2x: 'test@2x.webp',
      },
      {
        id: 1,
        name: 'Test Item',
        vendorCode: 'string',
        category: 'Photocamera',
        type: 'Digital',
        level: 'Professional',
        price: 100,
        rating: 3,
        description: 'Test',
        reviewCount: 10,
        previewImg: 'test.jpg',
        previewImg2x: 'test@2x.jpg',
        previewImgWebp: 'test.webp',
        previewImgWebp2x: 'test@2x.webp',
      },
      {
        id: 3,
        name: 'Test Item',
        vendorCode: 'string',
        category: 'Photocamera',
        type: 'Digital',
        level: 'Professional',
        price: 300,
        rating: 1,
        description: 'Test',
        reviewCount: 10,
        previewImg: 'test.jpg',
        previewImg2x: 'test@2x.jpg',
        previewImgWebp: 'test.webp',
        previewImgWebp2x: 'test@2x.webp',
      }
    ]);
  });
});
