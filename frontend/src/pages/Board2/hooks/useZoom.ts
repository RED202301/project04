import { useState } from "react"
import { useRecoilState } from "recoil";
import { isEditableState, isMovableState, selectedMessageState } from "../recoil/atoms";


const useZoom = (ref: React.MutableRefObject<HTMLDivElement>) => {
  const [, setIsMovable] = useRecoilState(isMovableState);
  const [isZoomed, setIsZoomed] = useState(false);
  const [, setSelectedMessage] = useRecoilState(selectedMessageState)
  const [, setIseisEditable] = useRecoilState(isEditableState);
  const handleZoom = () => {
    setIseisEditable(isEditable => !isEditable);
    ref.current.style.transition = `
      scale .5s ease-in-out, 
      rotate .5s ease-in-out,
      top .5s ease-in-out, 
      left .5s ease-in-out
    `
    setTimeout(() => ref.current.style.transition = "", 500);

    if (isZoomed) {
      setIsZoomed(() => false)
      setSelectedMessage((selectedMessage) => ({ ...selectedMessage, isZoomed: false }))
      setIsMovable(() => true)
    } else {
      setIsZoomed(() => true)
      setSelectedMessage((selectedMessage) => ({ ...selectedMessage, isZoomed: true }))
      setIsMovable(() => false)
    }
  };
  return { isZoomed, handleZoom }
}

export default useZoom