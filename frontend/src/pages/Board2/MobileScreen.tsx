import { useRef, useEffect } from "react"
import { useRecoilState } from "recoil";
import tw from "twin.macro"
import { mobileSizeState } from "./recoil/atoms";
import FontStyles from "./styles/FontStyles";

const MobileScreen: React.FC<React.PropsWithChildren> = ({children}) => {
  const [, setMobileSize] = useRecoilState(mobileSizeState);
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>;
  const handleResize = () => {
    let { clientWidth, clientHeight } = ref.current;
    const { innerHeight} = window
    if (clientWidth < clientHeight) {
      clientHeight = (clientWidth / 9) * 16;
      clientHeight = clientHeight < innerHeight ? clientHeight : innerHeight;
      clientWidth = (clientHeight / 16) * 9;
    }
    else {
      clientWidth = (clientHeight / 16) * 9;
    }
    setMobileSize(() => ({ clientWidth, clientHeight }));
  }

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [])


  return <div {...{ ref, css: [tw`w-screen h-screen flex`] }}>
      <FontStyles/>
      {children}
  </div>;
}
export default MobileScreen;