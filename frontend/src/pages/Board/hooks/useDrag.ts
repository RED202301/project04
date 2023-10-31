import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { mobileSizeState, messageMapState, selectedMessageState, globalStateState } from "../../../recoil/atoms";
import messagesAPI from "../../../api/messagesAPI";

const useDrag = () => {
  const { clientWidth, clientHeight } = useRecoilValue(mobileSizeState);
  const { isMovable } = useRecoilValue(globalStateState);
  const [selectedMessage, setSelectedMessage] = useRecoilState(selectedMessageState)
  const setMessageMap = useSetRecoilState(messageMapState)


  const handleDragMove = (event: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>) => {
    if (!selectedMessage || !isMovable || !selectedMessage.isDragged) return;
    const { startX, startY } = selectedMessage;
    const { pageX, pageY } = "targetTouches" in event ? event.targetTouches[0] : event;
    const top = selectedMessage.top + (pageY / clientWidth - startY);
    const left = selectedMessage.left + (pageX / clientWidth - startX);
    const origin = 0.8 * 0.5 / 2;
    const width = 0.8 * 0.5;

    setMessageMap(msgMap => {
      const updated = { ...msgMap.get(selectedMessage.id) };
      updated.top = Math.max(Math.min((clientHeight / clientWidth - origin - width), top), -origin);
      updated.left = Math.max(Math.min(clientWidth / clientWidth - origin - width, left), -origin);
      msgMap.set(updated.id, updated);
      return new Map(msgMap);
    })
  }

  const handleDragEnd = () => {
    if (!selectedMessage || !isMovable || !selectedMessage.isDragged) return;

    setMessageMap(msgMap => {
      const updated = { ...msgMap.get(selectedMessage.id) };
      updated.rotate = Math.random() * 20 - 10;

      msgMap.set(updated.id, updated);

      msgMap.forEach(({ top, left, rotate, zindex }, id) => {
        messagesAPI.update({ id, top, left, rotate, zindex });
      })

      return new Map(msgMap);
    })
    setSelectedMessage(dragData => ({ ...dragData, isDragged: false }));
  }
  return { handleDragMove, handleDragEnd }
}

export default useDrag;