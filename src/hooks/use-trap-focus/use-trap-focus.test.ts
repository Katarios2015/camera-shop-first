import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import useTrapFocus from './use-trap-focus';

describe('useTrapFocus', () => {
  let firstElement: HTMLElement;
  let lastElement: HTMLElement;
  let firstRef: React.RefObject<HTMLElement>;
  let lastRef: React.RefObject<HTMLElement>;

  beforeEach(() => {
    firstElement = document.createElement('button');
    firstElement.textContent = 'First';
    firstElement.tabIndex = 0;
    document.body.appendChild(firstElement);

    lastElement = document.createElement('button');
    lastElement.textContent = 'Last';
    lastElement.tabIndex = 0;
    document.body.appendChild(lastElement);

    firstRef = { current: firstElement };
    lastRef = { current: lastElement };
  });

  afterEach(() => {
    document.body.removeChild(firstElement);
    document.body.removeChild(lastElement);
  });

  it('should add event listeners when dependence is true', () => {
    const addEventListenerSpy = vi.spyOn(document, 'addEventListener');

    renderHook(() => useTrapFocus(firstRef, lastRef, true));

    expect(addEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
    addEventListenerSpy.mockRestore();
  });

  it('should trap focus from last to first element on Tab', () => {
    renderHook(() => useTrapFocus(firstRef, lastRef, true));

    lastElement.focus();
    expect(document.activeElement).toBe(lastElement);


    const tabEvent = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true });
    document.dispatchEvent(tabEvent);

    expect(document.activeElement).toBe(firstElement);
  });

  it('should trap focus from first to last element on Shift+Tab', () => {
    renderHook(() => useTrapFocus(firstRef, lastRef, true));

    firstElement.focus();
    expect(document.activeElement).toBe(firstElement);

    const shiftTabEvent = new KeyboardEvent('keydown', {
      key: 'Tab',
      shiftKey: true,
      bubbles: true
    });
    document.dispatchEvent(shiftTabEvent);

    expect(document.activeElement).toBe(lastElement);
  });

  it('should not trap focus when not on first/last elements', () => {
    const middleElement = document.createElement('button');
    middleElement.textContent = 'Middle';
    middleElement.tabIndex = 0;
    document.body.appendChild(middleElement);

    renderHook(() => useTrapFocus(firstRef, lastRef, true));

    middleElement.focus();
    expect(document.activeElement).toBe(middleElement);

    const tabEvent = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true });
    document.dispatchEvent(tabEvent);

    expect(document.activeElement).not.toBe(firstElement);

    document.body.removeChild(middleElement);
  });

  it('should cleanup event listeners on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener');

    const { unmount } = renderHook(() => useTrapFocus(firstRef, lastRef, true));
    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
    removeEventListenerSpy.mockRestore();
  });
});
