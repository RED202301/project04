import { PropsWithChildren, useEffect } from "react"
import tw from "twin.macro"
import useHandleResize from "../hooks/useHandleResize"
import useHandleDrag from "../hooks/useHandleDrag";



const ScreenContainer = ({ children }: PropsWithChildren) => {
  const handleResize = useHandleResize();
  const {handleDragMove, handleDragEnd} = useHandleDrag()

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [])

  return (
    <section {...{
      css: tw`w-screen h-screen bg-orange-100`,
      onMouseMove: handleDragMove,
      onMouseUp: handleDragEnd,
      onTouchMove: handleDragMove,
      onTouchEnd: handleDragEnd,
    }}>
      {children}
    </section>
  );
}

export default ScreenContainer