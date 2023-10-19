import tw from "twin.macro";
import { PolaroidProps } from "../types/types"
import Placing from "./Placing";
import { css } from "@emotion/react";

const Polaroid: React.FC<PolaroidProps> = ({ ...props }) => {
  const { id, top, left, rotate, zIndex, src, content } = props;
  const twStyles = [tw`w-36 h-36 absolute select-none drop-shadow-md p-4 font-['Nanum Brush Script'] bg-[url("https://transparenttextures.com/patterns/polaroid.png")] bg-white`]
  const undraggable = css`
      -webkit-user-drag: none;
      -khtml-user-drag: none;
      -moz-user-drag: none;
      -o-user-drag: none;
      user-drag: none;
  `
  
  return <Placing {...{ id, top, left, rotate, zIndex, twStyles }}>
    <img {...{ src, css: [tw`pb-2 select-none`, undraggable] }} alt="사진" />
    <div {...{ css: [tw`pb-2 select-none`] }} >{content}</div>
  </Placing>
}

export default Polaroid