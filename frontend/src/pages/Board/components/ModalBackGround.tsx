import { useState, useEffect } from "react"
import { useRecoilValue } from "recoil";
import tw, { css } from "twin.macro";
import { globalStateState, mobileSizeState } from "../../../recoil/atoms";
import useHandleModal from "../hooks/useHandleModal";


const ModalBackground: React.FC = () => {
  const [isRendered, setIsRendered] = useState(false);
  const { isMovable } = useRecoilValue(globalStateState);
  const { clientWidth } = useRecoilValue(mobileSizeState);
  const { closeModal } = useHandleModal();

  useEffect(() => { setIsRendered(true) }, []);

  const transitionCSS = css`
    transition: background-color .5s ease-in-out;
    background-color: ${(isRendered && !isMovable) ? "rgba(1, 1, 1, .5)" : "rgba(1, 1, 1, 0)"};
    `

  return <div {...{
    onClick: closeModal,
    css: [
      tw`absolute h-screen`,
      css`width: ${clientWidth}px`,
      transitionCSS
    ],
  }}></div>
}

export default ModalBackground