import { useRecoilState, useSetRecoilState } from "recoil";
import { globalStateState, isEditableState } from "../../../recoil/atoms";
import useTransition from "./useTransition";

const useHandleModal = () => {
  const [{ isModalOpen }, setGlobalState] = useRecoilState(globalStateState)
  const setIsEditable = useSetRecoilState(isEditableState);
  const setTransition = useTransition();

  const openModal = () => {
    setGlobalState({ isModalOpen: true, isMovable: false })
    setTransition(500);
  }

  const closeModal = () => {
    setIsEditable(false);
    setGlobalState({ isModalOpen: false, isMovable: true });
    setTransition(500);
  }

  const toggleModal = () => {
    isModalOpen ? closeModal() : openModal()
  }

  return { openModal, closeModal, toggleModal }
}

export default useHandleModal