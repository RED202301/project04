import React from "react"
import { useRecoilState } from "recoil";
import { draggingState, placeableInfoMapState, placeableInfoListState, canDragState, windowSizeState } from '../recoil/atoms'

const useOnDragStart = (placeableId: number) => {
  const [, setDragging] = useRecoilState(draggingState);
  const [placeableInfoMap,] = useRecoilState(placeableInfoMapState);
  const [, setPlaceableInfoList] = useRecoilState(placeableInfoListState);
  const [canDrag] = useRecoilState(canDragState);
  const [windowSize] = useRecoilState(windowSizeState)

  const onDragStart = (event: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>) => {
    if (!canDrag) return;
    const { pageX, pageY } = "targetTouches" in event ? event.targetTouches[0] : event;

    setDragging(() => {
      return {
        isDrag: true,
        placeableId,
        startX: pageX / windowSize.width,
        startY: pageY / windowSize.width,
      }
    });

    const { zindex } = placeableInfoMap.get(placeableId)!;
    setPlaceableInfoList(placeableInfoList => placeableInfoList.map(placeableInfo => {
      const updated = { ...placeableInfo };
      if (updated.zindex > zindex) updated.zindex -= 1;
      else if (updated.zindex === zindex) updated.zindex = placeableInfoList.length;
      return updated
    })
    )
  };

  return onDragStart
}

export default useOnDragStart;