import { useSetRecoilState } from "recoil";
import messagesAPI from "../api/messagesAPI";
import { messageMapState, selectedMessageState } from "../recoil/atoms";
import useHandleModal from "./useHandleModal";

const useHandleDelete = (id) => {
  const setMessageMap = useSetRecoilState(messageMapState);
  const { closeModal } = useHandleModal()
  const setSelectedMessage = useSetRecoilState(selectedMessageState);

  const handleDelete = () => {
    const asyncFunction = async () => {
      await messagesAPI.remove(id)
      setMessageMap(msgMap => {
        msgMap.delete(id)
        return new Map(msgMap);
      })
      setSelectedMessage(null)
      closeModal();
    }

    asyncFunction();
  }

  return handleDelete
}

export default useHandleDelete