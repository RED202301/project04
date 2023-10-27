import { useState, useEffect } from "react"
import { useRecoilState } from "recoil";
import tw, { css } from "twin.macro";
import { formVisibilityState, isAnimatedState, isEditableState, isMovableState, selectedMessageState } from "../recoil/atoms";


const ModalBackground: React.FC = () => {
  const [isRendered, setIsRendered] = useState(false);
  const [, setSelectedMessage] = useRecoilState(selectedMessageState)
  const [isMovable, setIsMovable] = useRecoilState(isMovableState);
  const [, setIsAnimated] = useRecoilState(isAnimatedState);
  const [, setFormVisibility] = useRecoilState(formVisibilityState)
  const [, setIsEditable] = useRecoilState(isEditableState);
  const twcss = [
    tw`absolute w-screen h-screen`,
    css`
      transition: background-color .5s ease-in-out;
      background-color: ${(isRendered && !isMovable) ? "rgba(1, 1, 1, .5)" : "rgba(1, 1, 1, 0)"};
    `
  ]
  useEffect(() => { setIsRendered(true) }, []);
  return <div {...{
    css: twcss,
    onClick: () => {
      setSelectedMessage(prev => ({ ...prev, isZoomed: false }))
      setIsMovable(() => true);
      setIsAnimated(() => true);
      setFormVisibility(() => false);
      setIsEditable(()=>false)
      setTimeout(() => {
        setIsAnimated(()=>false);
      }, 500);
    }
  }}></div>
}

export default ModalBackground