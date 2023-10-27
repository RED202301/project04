import { useRecoilState } from "recoil";
import { isMovableState, mobileSizeState, messagesState, selectedMessageState } from "../recoil/atoms";
import messagesAPI from "../api/messagesAPI";

const useDrag = () => {
  const [{ clientWidth, clientHeight }] = useRecoilState(mobileSizeState);
  const [isMovable] = useRecoilState(isMovableState);
  const [{ messageId, isDragged, offsetTop, offsetLeft, startX, startY }, setSelectedMessage] = useRecoilState(selectedMessageState)
  const [, setMessages] = useRecoilState(messagesState)

  const handleDragMove = (event: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>) => {
    if (!isMovable || !isDragged || !messageId) return;
    const { pageX, pageY } = "targetTouches" in event ? event.targetTouches[0] : event;
    const top = (offsetTop + (pageY / clientWidth - startY));
    const left = (offsetLeft + (pageX / clientWidth - startX));
    const origin = clientWidth * (0.8 * 0.5 / 2) / clientWidth;
    const width = clientWidth * (0.8 * 0.5) / clientWidth;

    setMessages(([msgMap]) => {
      const updated = { ...msgMap.get(messageId!)! };
      updated.top = Math.max(Math.min((clientHeight / clientWidth - origin - width), top), -origin);
      updated.left = Math.max(Math.min(clientWidth / clientWidth - origin - width, left), -origin);
      msgMap.set(updated.id, updated);
      return [msgMap, [...msgMap.values()]];
    })
  }

  const handleDragEnd = () => {
    if (!isMovable || !isDragged) return;
    setMessages(([msgMap]) => {
      const updated = { ...msgMap.get(messageId!)! };
      updated.rotate = Math.random() * 20 - 10;
      msgMap.set(updated.id, updated);
      const { top, left, rotate, zindex } = updated;
      messagesAPI.update({ id: updated.id, top, left, rotate, zindex });
      return [msgMap, [...msgMap.values()]];
    })
    setSelectedMessage((dragData) => ({
      ...dragData,
      isDragged: false,
    }));
  }
  return { handleDragMove, handleDragEnd }
}

export default useDrag;