// import React, { useRef } from 'react';

// const useLongPressBlocker = () => {
//   const touchStartTimeRef = useRef<number | null>(null);

//   const handleTouchStart = () => {
//     touchStartTimeRef.current = Date.now();
//   };

//   const handleTouchMove = (event: React.TouchEvent) => {
//     event.preventDefault(); // 드래그 동작 막기
//   };

//   const handleTouchEnd = (event: React.TouchEvent) => {
//     const touchEndTime = Date.now();
//     const touchDuration = touchEndTime - (touchStartTimeRef.current || 0);

//     if (touchDuration > 200) { 
//       event.preventDefault(); // 기본 동작 막기
//       return;
//     }

//     // 일반적인 터치 동작 처리 로직...
//   };

//   return [handleTouchStart, handleTouchMove, handleTouchEnd] as const;
// };

// export default useLongPressBlocker;
