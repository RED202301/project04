import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import messagesAPI from "../api/messagesAPI";
import useHandleModal from "./useHandleModal";
import { messageMapState, mobileSizeState, selectedMessageState } from "../recoil/atoms";

const useHandleCreate = () => {
  const { clientWidth, clientHeight } = useRecoilValue(mobileSizeState);
  const [msgMap, setMessageMap] = useRecoilState(messageMapState);
  const setSelectedMessage = useSetRecoilState(selectedMessageState);
  const { closeModal } = useHandleModal();

  const basicMessage = {
    receiverId: 3101440165,
    top: (clientHeight / clientWidth - .8) / 2,
    left: (clientWidth / clientWidth - .8) / 2,
    rotate: Math.random() * 20 - 10,
    zindex: msgMap.size + 1,

    type: 1,
    content: "",
    bgcolor: 1,
  };

  const handleCreate = ({ content, bgcolor }) => {
    (async () => {
      const newMessage = { ...basicMessage, content, bgcolor }
      const msg = await messagesAPI.create(newMessage)
      setMessageMap(msgMap => {
        msgMap.set(msg.id, msg);
        return new Map(msgMap);
      })
      closeModal();
      setSelectedMessage(null);
    })();
  }

  return handleCreate;
}

export default useHandleCreate