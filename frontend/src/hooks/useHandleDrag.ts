import { useRecoilState, useRecoilValue } from "recoil";
import { dragStateState, dragTimeoutState, isDraggedState, selectedRefObjectState } from "../recoil/atoms";
import mobileSizeState from "../recoil/mobileSizeState";

const useHandleDrag = () => {
  const dragTimeout = useRecoilValue(dragTimeoutState);
  const { prevTop, prevLeft, startX, startY } = useRecoilValue(dragStateState);
  const [selectedRefObject, setSelectedRefObject] = useRecoilState(selectedRefObjectState);
  const [isDragged, setIsDragged] = useRecoilState(isDraggedState);
  const mobileSize = useRecoilValue(mobileSizeState);

  const handleDragMove = (event: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>) => {
    if (!isDragged || !selectedRefObject) return;
    const { pageX, pageY } = "targetTouches" in event ? event.targetTouches[0] : event;
    const updatedTop = prevTop + (pageY / mobileSize.width - startY);
    const updatedLeft = prevLeft + (pageX / mobileSize.width - startX);

    selectedRefObject.current.style.top = `${updatedTop * mobileSize.width}px`
    selectedRefObject.current.style.left = `${updatedLeft * mobileSize.width}px`
  }
  const handleDragEnd = () => {
    clearTimeout(dragTimeout);
    setIsDragged(false)
    setSelectedRefObject(null);
  }

  return { handleDragMove, handleDragEnd }
}

export default useHandleDrag