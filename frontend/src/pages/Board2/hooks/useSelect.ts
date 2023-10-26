import { useRecoilState } from "recoil";
import { isMovableState, mobileSizeState, messagesState, selectedMessageState } from "../recoil/atoms";

const useSelect = (id: number) => {
  const [{ clientWidth }] = useRecoilState(mobileSizeState);
  const [isMovable] = useRecoilState(isMovableState);
  const [, setSelectedMessage] = useRecoilState(selectedMessageState)
  const [[msgMap], setMessages] = useRecoilState(messagesState)

  const handleSelect = (event: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>) => {
    if (!isMovable) return;
    console.log('down', id)
    const { pageX, pageY } = "targetTouches" in event ? event.targetTouches[0] : event;
    const { top, left } = msgMap.get(id)!;
    setSelectedMessage((selectedMessage) => ({
      ...selectedMessage,
      isDragged: true,
      messageId: id,
      offsetTop: top,
      offsetLeft: left,
      startX: pageX / clientWidth,
      startY: pageY / clientWidth
    }));

    setMessages(([msgMap]) => {
      const updated = { ...msgMap.get(id)!, zindex: msgMap.size };
      msgMap.set(id, updated);
      const updatedList = [...msgMap.values()]
        .sort((a, b) => a.zindex - b.zindex)
        .map((msg, zindex) => {
          const updated = { ...msg, zindex };
          msgMap.set(updated.id, updated);
          return updated
        });
      return [msgMap, updatedList];
    })
  }
  return { handleSelect };
}

export default useSelect;