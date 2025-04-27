import { renderHook } from '@testing-library/react';
import { describe, it, expect} from 'vitest';
import useFocus from './use-focus';

describe('useFocus hook', () => {
  it('should return a ref object', () => {
    const { result } = renderHook(() => useFocus(false));

    expect(result.current).toBeDefined();
    expect(result.current).toHaveProperty('current');
  });

});
