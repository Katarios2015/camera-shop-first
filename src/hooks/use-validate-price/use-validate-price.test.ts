import { renderHook } from '@testing-library/react';
import useValidatePrice from './use-validate-price';


describe('useValidatePrice', () => {
  describe('validateMinimumCurrentValue', () => {
    it('should return minimumGoodPrice when currentValue is below minimumGoodPrice', () => {
      const { result } = renderHook(() => useValidatePrice(10, 100, 0, 0));

      expect(result.current.validateMinimumCurrentValue('5')).toBe('10');
      expect(result.current.validateMinimumCurrentValue('9')).toBe('10');
    });

    it('should return empty string when currentValue is above maximumPriceValue', () => {
      const { result } = renderHook(() => useValidatePrice(10, 100, 0, 50));

      expect(result.current.validateMinimumCurrentValue('51')).toBe('');
      expect(result.current.validateMinimumCurrentValue('100')).toBe('');
    });

    it('should return empty string when currentValue is above maximumGoodPrice', () => {
      const { result } = renderHook(() => useValidatePrice(10, 100, 0, 0));

      expect(result.current.validateMinimumCurrentValue('101')).toBe('');
      expect(result.current.validateMinimumCurrentValue('200')).toBe('');
    });

    it('should return currentValue when it is within valid range', () => {
      const { result } = renderHook(() => useValidatePrice(10, 100, 0, 50));

      expect(result.current.validateMinimumCurrentValue('15')).toBe('15');
      expect(result.current.validateMinimumCurrentValue('25')).toBe('25');
      expect(result.current.validateMinimumCurrentValue('50')).toBe('50');
    });

    it('should handle empty string correctly', () => {
      const { result } = renderHook(() => useValidatePrice(10, 100, 0, 50));

      expect(result.current.validateMinimumCurrentValue('')).toBe('');
    });
  });

  describe('validateMaximumCurrentValue', () => {
    it('should return maximumGoodPrice when currentValue is above maximumGoodPrice', () => {
      const { result } = renderHook(() => useValidatePrice(10, 100, 0, 0));

      expect(result.current.validateMaximumCurrentValue('101')).toBe('100');
      expect(result.current.validateMaximumCurrentValue('200')).toBe('100');
    });

    it('should return empty string when currentValue is below minimumPriceValue', () => {
      const { result } = renderHook(() => useValidatePrice(10, 100, 50, 0));

      expect(result.current.validateMaximumCurrentValue('49')).toBe('');
      expect(result.current.validateMaximumCurrentValue('10')).toBe('');
    });

    it('should return currentValue when it is within valid range', () => {
      const { result } = renderHook(() => useValidatePrice(10, 100, 50, 0));

      expect(result.current.validateMaximumCurrentValue('50')).toBe('50');
      expect(result.current.validateMaximumCurrentValue('75')).toBe('75');
      expect(result.current.validateMaximumCurrentValue('100')).toBe('100');
    });

    it('should handle empty string correctly', () => {
      const { result } = renderHook(() => useValidatePrice(10, 100, 50, 0));

      expect(result.current.validateMaximumCurrentValue('')).toBe('');
    });

    it('should not return empty string when currentValue equals minimumPriceValue', () => {
      const { result } = renderHook(() => useValidatePrice(10, 100, 50, 0));

      expect(result.current.validateMaximumCurrentValue('50')).toBe('50');
    });
  });
});
