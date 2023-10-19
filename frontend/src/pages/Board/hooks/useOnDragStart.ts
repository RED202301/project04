import React from "react"
import { useRecoilState } from "recoil";
import { draggingState, placeableInfoMapState, placeableInfoListState, canDragState } from '../recoil/atoms'

const useOnDragStart = (placeableId: number) => {
  const [, setDragging] = useRecoilState(draggingState);
  const [placeableInfoMap,] = useRecoilState(placeableInfoMapState);
  const [, setPlaceableInfoList] = useRecoilState(placeableInfoListState);
  const [canDrag] = useRecoilState(canDragState);

  const onDragStart = (event: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>) => {
    if (!canDrag) return;
    const { pageX, pageY } = "targetTouches" in event ? event.targetTouches[0] : event;

    setDragging(() => { return { isDrag: true, placeableId, startX: pageX, startY: pageY } });

    const { zIndex } = placeableInfoMap.get(placeableId)!;
    setPlaceableInfoList(placeableInfoList => placeableInfoList.map(placeableInfo => {
      const updated = { ...placeableInfo };
      if (updated.zIndex > zIndex) updated.zIndex -= 1;
      else if (updated.zIndex === zIndex) updated.zIndex = placeableInfoList.length;
      return updated
    })
    )
  };

  return onDragStart
}

export default useOnDragStart;