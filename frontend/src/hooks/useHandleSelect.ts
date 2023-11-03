import { MutableRefObject } from "react"
import { useRecoilValue, useSetRecoilState } from "recoil";
import { dragStateState, dragTimeoutState, isDraggedState, selectedRefObjectState } from "../recoil/atoms";
import mobileSizeState from "../recoil/mobileSizeState";

const useHandleSelect = (ref: MutableRefObject<HTMLElement>) => {
  const setDragStae = useSetRecoilState(dragStateState);
  const setDragTimeout = useSetRecoilState(dragTimeoutState);
  const setIsDragged = useSetRecoilState(isDraggedState);
  const setSelectedRefObject = useSetRecoilState(selectedRefObjectState);
  const mobileSize = useRecoilValue(mobileSizeState)

  const handleSelect = (event: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>) => {
    const { pageX, pageY } = "targetTouches" in event ? event.targetTouches[0] : event;
    const { offsetTop, offsetLeft } = ref.current
    setDragStae({
      prevTop: offsetTop / mobileSize.width,
      prevLeft: offsetLeft / mobileSize.width,
      startX: pageX / mobileSize.width,
      startY: pageY / mobileSize.width,
    })
    setSelectedRefObject(ref)
    const dragTimeout = setTimeout(() => setIsDragged(true), 200);
    setDragTimeout(dragTimeout);
  }
  return handleSelect
}

export default useHandleSelect