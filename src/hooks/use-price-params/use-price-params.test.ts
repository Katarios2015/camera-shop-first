import { renderHook } from '@testing-library/react';
import { useSearchParams, SetURLSearchParams, URLSearchParamsInit } from 'react-router-dom';
import usePriceParams from './use-price-params';
import { Mock } from 'vitest';
import { FilterParamsKeys } from '../../components/filter-form/common';

type SetSearchParamsMock = Mock<Parameters<SetURLSearchParams>, ReturnType<SetURLSearchParams>>;

vi.mock('react-router-dom', () => ({
  useSearchParams: vi.fn<[], [URLSearchParams, SetURLSearchParams]>(),
}));

describe('usePriceParams', () => {
  let setSearchParamsMock: SetSearchParamsMock;

  const getSearchParamsFromCall = (callIndex: number): URLSearchParams => {

    const calls = (vi.mocked(setSearchParamsMock).mock.calls as Array<[URLSearchParamsInit | ((prev: URLSearchParams) => URLSearchParamsInit)]>);

    if (!calls[callIndex]) {
      return new URLSearchParams();
    }
    const arg = calls[callIndex][0];

    if (arg instanceof URLSearchParams) {
      return arg;
    }

    if (typeof arg === 'function') {
      const prev = new URLSearchParams();
      const result = arg(prev);

      if (result instanceof URLSearchParams) {
        return result;
      }
      if (Array.isArray(result)) {
        return new URLSearchParams(result as string[][] | FilterParamsKeys);
      }
      if (typeof result === 'object' && result !== null) {
        return new URLSearchParams(result as Record<string, string>);
      }
      return new URLSearchParams(result as string | undefined);
    }

    if (Array.isArray(arg)) {
      return new URLSearchParams(arg as string[][] | FilterParamsKeys);
    }
    if (typeof arg === 'object' && arg !== null) {
      return new URLSearchParams(arg as Record<string, string>);
    }
    return new URLSearchParams(arg as string | undefined);
  };

  beforeEach(() => {
    setSearchParamsMock = vi.fn<Parameters<SetURLSearchParams>, ReturnType<SetURLSearchParams>>();
    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams(),
      setSearchParamsMock,
    ]);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should update price parameter', () => {
    const { result } = renderHook(() => usePriceParams());
    result.current('100-200', 'price');

    expect(setSearchParamsMock).toHaveBeenCalledTimes(1);
    const newParams = getSearchParamsFromCall(0);
    expect(newParams.get('price')).toBe('100-200');
  });

  it('should delete parameter when it empty', () => {
    const { result } = renderHook(() => usePriceParams());
    result.current('', 'price');

    expect(setSearchParamsMock).toHaveBeenCalledTimes(1);
    const newParams = getSearchParamsFromCall(0);
    expect(newParams.has('price')).toBe(false);
  });

  it('should update parameters whit different names', () => {
    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams('category=books'),
      setSearchParamsMock,
    ]);

    const { result } = renderHook(() => usePriceParams());
    result.current('100-200', 'price');

    const newParams = getSearchParamsFromCall(0);
    expect(newParams.get('category')).toBe('books');
    expect(newParams.get('price')).toBe('100-200');
  });
});
