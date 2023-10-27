import React, { useRef } from 'react';

const useLongPressBlocker = () => {
  const touchStartTimeRef = useRef<number | null>(null);

  const handleTouchStart = () => {
    touchStartTimeRef.current = Date.now();
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    const touchEndTime = Date.now();
    const touchDuration = touchEndTime - (touchStartTimeRef.current || 0);

    if (touchDuration > 500) { // 예시: 500ms 이상의 지속 시간을 long press로 간주
      event.preventDefault(); // 기본 동작 막기
      return;
    }

    // 일반적인 터치 동작 처리 로직...
  };

  return [handleTouchStart, handleTouchEnd] as const;
};

export default useLongPressBlocker;
