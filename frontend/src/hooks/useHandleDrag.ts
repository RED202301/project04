import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { dragStateState, dragTimeoutState, isDraggedState, selectedMessageIdState, selectedRefObjectState } from "../recoil/atoms";
import mobileSizeState from "../recoil/mobileSizeState";
import messagesState from "../recoil/messagesState";
import messages_api from "../api/messages";

const useHandleDrag = () => {
  const dragTimeout = useRecoilValue(dragTimeoutState);
  const [dragState, setDragState] = useRecoilState(dragStateState);
  const [selectedRefObject, setSelectedRefObject] = useRecoilState(selectedRefObjectState);
  const [isDragged, setIsDragged] = useRecoilState(isDraggedState);
  const mobileSize = useRecoilValue(mobileSizeState);
  const setMessages = useSetRecoilState(messagesState);
  const [selectedMessageId, setSelectedMessageId] = useRecoilState(selectedMessageIdState);

  const handleDragMove = (event: React.TouchEvent | React.MouseEvent) => {
    if (!isDragged || !selectedRefObject) return;
    const { pageX, pageY } = "touches" in event ? event.touches[0] : event
    const { offsetWidth, offsetHeight } = selectedRefObject.current
    const [width, height] = [offsetWidth / mobileSize.width, offsetHeight / mobileSize.height]
    let _top, _left;

    if (dragState) {
      const { prevTop, prevLeft, startX, startY } = dragState;
      _top = prevTop + (pageY / mobileSize.width - startY);
      _left = prevLeft + (pageX / mobileSize.width - startX);
    } else {
      const { offsetTop, offsetLeft } = selectedRefObject.current
      const prevTop = offsetTop / mobileSize.width
      const prevLeft = offsetLeft / mobileSize.width
      const startX = pageX / mobileSize.width
      const startY = pageY / mobileSize.width
      setDragState({ prevTop, prevLeft, startX, startY });

      _top = prevTop + (pageY / mobileSize.width - startY);
      _left = prevLeft + (pageX / mobileSize.width - startX);
    }
    const top = Math.max(Math.min(mobileSize.height / mobileSize.width - height * 2, _top), .15);
    const left = Math.max(Math.min(mobileSize.width / mobileSize.width - width * 7 / 6, _left), .05);
    selectedRefObject.current.style.top = `${top * mobileSize.width}px`
    selectedRefObject.current.style.left = `${left * mobileSize.width}px`

  }
  const handleDragEnd = () => {
    if (selectedRefObject && selectedMessageId) {
      const updatedTop = selectedRefObject.current.offsetTop / mobileSize.width;
      const updatedLeft = selectedRefObject.current.offsetLeft / mobileSize.width;
      const updatedRotate = Math.random() * 20 - 10
      selectedRefObject.current.style.rotate = `${updatedRotate}deg`;

      setMessages(messages => {
        return messages.map(message => {
          if (message.id === selectedMessageId) {
            const updatedMessage = { ...message, top: updatedTop, left: updatedLeft, rotate: updatedRotate }
            const { id, top, left, rotate, zindex } = updatedMessage;
            messages_api.update(id, { top, left, rotate, zindex });
            return updatedMessage
          } else {
            const { id, top, left, rotate, zindex } = message;
            messages_api.update(id, { top, left, rotate, zindex });
            return message;
          }
        })
      })
    }
    clearTimeout(dragTimeout);
    setIsDragged(false)
    setSelectedRefObject(null);
    setSelectedMessageId(null);
    setDragState(null)
  }

  return { handleDragMove, handleDragEnd }
}

export default useHandleDrag