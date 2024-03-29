import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import useOpen from './useOpen';

describe('useOpen custom hook', () => {
  it('should toggle isOpen state', () => {
    const { result } = renderHook(() => useOpen());

    expect(result.current.isOpen).toBe(false);

    act(() => {
      result.current.handleOpen();
    });

    expect(result.current.isOpen).toBe(true);

    act(() => {
      result.current.handleClose();
    });

    expect(result.current.isOpen).toBe(false);
  });
});
