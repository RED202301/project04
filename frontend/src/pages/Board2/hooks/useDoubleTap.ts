import { useState } from "react";

const useDoubleTap = (callback: () => void) => {
  const [isTapped, setIsTapped] = useState(false);
  const [isDoubleTapped, setIsDoubleTapped] = useState(false);
  const [tapTO, setTapTO] = useState<number>();
  const [doubleTapTO, setDoubleTapTO] = useState<number>();

  const handleDoubleTap = () => {
    if (isDoubleTapped) {

      // 연속 3번이상 탭될 때마다, 초기화까지 남은 시간 갱신
      clearTimeout(doubleTapTO);
      setDoubleTapTO(() => setTimeout(() => setIsDoubleTapped(false), 600));

    } else if (isTapped) {

      // 탭한 상태에서 또 탭하면 더블탭, 0.6초 후 초기화
      clearTimeout(tapTO);
      setIsTapped(false);
      setIsDoubleTapped(true);
      setDoubleTapTO(() => setTimeout(() => setIsDoubleTapped(false), 600));

      // 더블탭 시 실행될 함수
      callback();

    } else {

      // 탭 상태, 0.6초 후 초기화
      setIsTapped(true)
      setTapTO(() => setTimeout(() => setIsTapped(false), 600));

    }
  }
  return [handleDoubleTap]
}

export default useDoubleTap;