import { useRecoilState } from "recoil";
import { draggingState, canDragState, placeableInfoListState } from '../recoil/atoms'

const useOnDragEnd = () => {
  const [dragging, setDragging] = useRecoilState(draggingState);
  const [canDrag] = useRecoilState(canDragState);
  const [, setPlaceableInfoList] = useRecoilState(placeableInfoListState);

  const onDragEnd = () => {
    if (!canDrag || !dragging.isDrag) return;
    const rotate = Math.random() * 10 - 5;

    setPlaceableInfoList((placeableInfoList) => {
      const updated = placeableInfoList.map((placeableInfo) => {
        if (placeableInfo.id === dragging.placeableId) return { ...placeableInfo, rotate }
        return placeableInfo;
      })

      return updated;
    })

    setDragging((dragging) => {
      return { ...dragging, isDrag: false }
    })
  };

  return onDragEnd;
};

export default useOnDragEnd;