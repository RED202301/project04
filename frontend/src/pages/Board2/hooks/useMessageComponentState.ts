import { useRecoilValue } from "recoil";
import { globalStateState, isEditableState, isOnTransitionState, selectedMessageState } from "../recoil/atoms";

const useMessageComponentState = (id) => {
  const selectedMessage = useRecoilValue(selectedMessageState);
  const { isModalOpen } = useRecoilValue(globalStateState);
  const isOnTransition = useRecoilValue(isOnTransitionState);
  const _isEditable = useRecoilValue(isEditableState)

  const isSelected = selectedMessage?.id === id;
  const isFocused = isSelected && isModalOpen;
  const isAnimated = isSelected && isOnTransition;
  const isDragged = isSelected && selectedMessage.isDragged;
  const isEditable = isSelected && _isEditable;
  return { isSelected, isFocused, isAnimated, isDragged, isEditable }
}

export default useMessageComponentState;