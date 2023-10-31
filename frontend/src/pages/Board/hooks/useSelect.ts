import { useRecoilState, useRecoilValue } from "recoil";
import { mobileSizeState, messageMapState, selectedMessageState, globalStateState } from "../../../recoil/atoms";

const useSelect = (id: number, ref) => {
  const [{ clientWidth }] = useRecoilState(mobileSizeState);
  const { isMovable } = useRecoilValue(globalStateState)
  const [, setSelectedMessage] = useRecoilState(selectedMessageState)
  const [msgMap, setMessageMap] = useRecoilState(messageMapState)

  const handleSelect = (event: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>) => {
    if (!isMovable) return;
    const { pageX, pageY } = "targetTouches" in event ? event.targetTouches[0] : event;
    const { top, left } = msgMap.get(id)!;
    setSelectedMessage(() => ({
      id,
      ref,
      top,
      left,
      startX: pageX / clientWidth,
      startY: pageY / clientWidth,
      isDragged: true,
    }));

    setMessageMap(msgMap => {
      const updated = { ...msgMap.get(id), zindex: msgMap.size };
      msgMap.set(id, updated);
      [...msgMap.values()]
        .sort((a, b) => a.zindex - b.zindex)
        .forEach((msg, zindex) => msgMap.set(msg.id, { ...msg, zindex }));
      return msgMap;
    })
  }
  return handleSelect;
}

export default useSelect;