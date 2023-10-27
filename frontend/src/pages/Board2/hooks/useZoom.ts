import { useRecoilState } from "recoil";
import { isAnimatedState, isEditableState, isMovableState, selectedMessageState } from "../recoil/atoms";


const useZoom = () => {
  const [, setIsMovable] = useRecoilState(isMovableState);
  const [{ isZoomed }, setSelectedMessage] = useRecoilState(selectedMessageState)
  const [, setIseisEditable] = useRecoilState(isEditableState);
  const [, setIsAnimated] = useRecoilState(isAnimatedState);
  const handleZoom = () => {
    setIseisEditable(isEditable => !isEditable);
    setIsAnimated(() => true)
    setTimeout(() => setIsAnimated(() => false), 500);

    if (isZoomed) {
      setSelectedMessage((selectedMessage) => ({ ...selectedMessage, isZoomed: false }))
      setIsMovable(() => true)
    } else {
      setSelectedMessage((selectedMessage) => ({ ...selectedMessage, isZoomed: true }))
      setIsMovable(() => false)
    }

  };
  return { handleZoom }
}

export default useZoom