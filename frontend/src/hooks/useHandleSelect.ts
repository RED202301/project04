import { MutableRefObject } from "react"
import { useRecoilState, useSetRecoilState } from "recoil";
import { dragTimeoutState, isDraggedState, selectedMessageIdState, selectedRefObjectState } from "../recoil/atoms";
import messagesState from "../recoil/messagesState";

const useHandleSelect = (ref: MutableRefObject<HTMLElement>, messageId?: number) => {
  const setDragTimeout = useSetRecoilState(dragTimeoutState);
  const [isDragged, setIsDragged] = useRecoilState(isDraggedState);
  const setSelectedRefObject = useSetRecoilState(selectedRefObjectState);
  const setMessages = useSetRecoilState(messagesState)
  const setSelectedMessageId = useSetRecoilState(selectedMessageIdState)

  const handleSelect = () => {
    setSelectedRefObject(ref)
    const dragTimeout = setTimeout(() => setIsDragged(true), 200);
    setDragTimeout(dragTimeout);
    if (messageId) {
      setSelectedMessageId(messageId);
      setMessages(messages => (
        [...messages]
          .map(message => {
            if (message.id === messageId) return { ...message, zindex: messages.length + 1 }
            else return message
          })
          .sort((a, b) => a.zindex - b.zindex)
          .map((message, zindex) => ({ ...message, zindex }))
      ))
    }
  }

  const handleUnselect = () => {
    if (isDragged) return
    setSelectedRefObject(null);
    setSelectedMessageId(null);
  }

  return [handleSelect, handleUnselect]
}

export default useHandleSelect