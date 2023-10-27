import React, { useRef } from 'react';

const useLongPressBlocker = () => {
  const touchStartTimeRef = useRef<number | null>(null);
  const isLongPressRef = useRef<boolean>(false);

  const handleTouchStart = () => {
    touchStartTimeRef.current = Date.now();
    isLongPressRef.current = false;
  };

  const handleTouchMove = () => {
    if (touchStartTimeRef.current) {
      isLongPressRef.current = true;
    }
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    if (isLongPressRef.current) {
      event.preventDefault(); // 기본 동작 막기
      return;
    }

    // 일반적인 터치 동작 처리 로직...
  };

  return [handleTouchStart, handleTouchMove, handleTouchEnd] as const;
};

export default useLongPressBlocker;
