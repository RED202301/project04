import mobileSizeState from "../recoil/mobileSizeState";
import { useSetRecoilState } from "recoil";

const useHandleResize = () => {
  const W_ratio = 10;
  const H_ratio = 16;
  const setMobileSize = useSetRecoilState(mobileSizeState);
  const handleResize = () => {
    const { innerWidth, innerHeight } = window
    let [width, height] = [innerWidth, innerHeight];
    if (width < height) {
      height = H_ratio / W_ratio * width;
      height = height < innerHeight ? height : innerHeight;
      width = W_ratio / H_ratio * height;
    }
    else {
      width = W_ratio / H_ratio * height;
    }
    setMobileSize(() => ({ width, height }));
  };
  return handleResize;
}

export default useHandleResize