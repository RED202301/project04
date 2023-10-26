import { useState, useEffect } from "react"
import { useRecoilState } from "recoil";
import { mobileSizeState } from "../recoil/atoms";
import tw, { css } from "twin.macro";


const ModalBackground: React.FC = (props) => {
  const [isRendered, setIsRendered] = useState(false);
  const [{ clientWidth, clientHeight }] = useRecoilState(mobileSizeState)
  const twcss = [
    tw`absolute`,
    css`
      width: ${clientWidth}px;
      height: ${clientHeight}px;

      transition: background-color .5s ease-in-out;
      background-color: ${isRendered ? "rgba(1, 1, 1, .5)" : "rgba(1, 1, 1, 0)"};
    `
  ]

  useEffect(() => { setIsRendered(true) }, []);

  return <div {...{ css: twcss, ...props }}></div>
}

export default ModalBackground