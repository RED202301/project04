import React from "react"
import { useRecoilState } from "recoil";
import { draggingState, canDragState, placeableInfoListState, placeableInfoMapState, windowSizeState } from '../recoil/atoms'

const useOnDragMove = () => {
  const [dragging] = useRecoilState(draggingState);
  const [canDrag] = useRecoilState(canDragState);
  const [, setPlaceableInfoList] = useRecoilState(placeableInfoListState);
  const [placeableInfoMap] = useRecoilState(placeableInfoMapState);
  const [windowSize] = useRecoilState(windowSizeState);

  const onDragMove = (event: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>) => {
    if (!canDrag || !dragging?.isDrag) return;

    const { pageX, pageY } = "targetTouches" in event ? event.targetTouches[0] : event;
    const { placeableId, startX, startY } = dragging;

    const placeableInfo = placeableInfoMap.get(placeableId)!
    const top = placeableInfo.top + (pageY / windowSize.width - startY);
    const left = placeableInfo.left + (pageX / windowSize.width - startX);

    setPlaceableInfoList((placeableInfoList) => {
      const updated = placeableInfoList.map((placeableInfo) => {
        if (placeableInfo.id === placeableId) return {
          ...placeableInfo,
          top: Math.max(0, top),
          left: Math.max(0, Math.min(left, 0.7))
        }
        return placeableInfo;
      })

      return updated;
    })

  };

  return onDragMove;
}

export default useOnDragMove;