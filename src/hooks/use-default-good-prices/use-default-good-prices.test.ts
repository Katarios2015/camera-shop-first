import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import useDefaultGoodsPrices from './use-default-goods-prices';
import { GoodType } from '../../types/good-type';
import {makeFakeProductCard} from '../../utils/mocks';

describe('useDefaultGoodsPrices', () => {
  it('should return 0 for both prices when filteredGoods is empty', () => {
    const { result } = renderHook(() => useDefaultGoodsPrices([]));
    expect(result.current).toEqual({
      minimumGoodPrice: 0,
      maximumGoodPrice: 0
    });
  });

  it('should return correct prices for single item', () => {
    const mockGoods: GoodType[] = [makeFakeProductCard()];

    const { result } = renderHook(() => useDefaultGoodsPrices(mockGoods));

    expect(result.current).toEqual({
      minimumGoodPrice: mockGoods[0].price,
      maximumGoodPrice: mockGoods[0].price
    });
  });

  it('should return correct min and max prices for multiple items', () => {
    const mockGoods: GoodType[] = [
      {
        id: 1,
        name: 'Test Item',
        vendorCode: 'string',
        category: 'Photocamera',
        type: 'Digital',
        level: 'Professional',
        price: 50,
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
        price: 100,
        rating: 5,
        description: 'Test',
        reviewCount: 10,
        previewImg: 'test.jpg',
        previewImg2x: 'test@2x.jpg',
        previewImgWebp: 'test.webp',
        previewImgWebp2x: 'test@2x.webp',
      }
    ];

    const { result } = renderHook(() => useDefaultGoodsPrices(mockGoods));

    expect(result.current).toEqual({
      minimumGoodPrice: 50,
      maximumGoodPrice: 200
    });
  });

  it('should return correct prices when all items have same price', () => {
    const mockGoods: GoodType[] = [
      {
        id: 1,
        name: 'Test Item',
        vendorCode: 'string',
        category: 'Photocamera',
        type: 'Digital',
        level: 'Professional',
        price: 100,
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
        name: 'Test Item',
        vendorCode: 'string',
        category: 'Photocamera',
        type: 'Digital',
        level: 'Professional',
        price: 100,
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
        price: 100,
        rating: 5,
        description: 'Test',
        reviewCount: 10,
        previewImg: 'test.jpg',
        previewImg2x: 'test@2x.jpg',
        previewImgWebp: 'test.webp',
        previewImgWebp2x: 'test@2x.webp',
      }
    ];

    const { result } = renderHook(() => useDefaultGoodsPrices(mockGoods));

    expect(result.current).toEqual({
      minimumGoodPrice: 100,
      maximumGoodPrice: 100
    });
  });

  it('should memoize the result and not recalculate when filteredGoods reference is same', () => {
    const mockGoods: GoodType[] = [
      {
        id: 1,
        name: 'Test Item',
        vendorCode: 'string',
        category: 'Photocamera',
        type: 'Digital',
        level: 'Professional',
        price: 100,
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
      }
    ];

    const { result, rerender } = renderHook(
      ({ goods }) => useDefaultGoodsPrices(goods),
      { initialProps: { goods: mockGoods } }
    );

    const firstResult = result.current;
    rerender({ goods: mockGoods });

    expect(result.current).toBe(firstResult);
  });
});
