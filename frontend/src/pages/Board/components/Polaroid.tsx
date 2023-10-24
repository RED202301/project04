import tw from "twin.macro";
import { PolaroidProps } from "../types/types"
import Placing from "./Placing";
import { css } from "@emotion/react";
import { bgcolors } from "../Styles/bgcolors";
import { textures } from "../Styles/texture";
import Ratio from "../Styles/ratios";
import { useRecoilState } from "recoil";
import { windowSizeState } from "../recoil/atoms";

const Polaroid: React.FC<PolaroidProps> = ({ ...props }) => {
  const { id, top, left, rotate, zindex, src, content, type } = props;
  const [windowSize] = useRecoilState(windowSizeState);
  const twStyles = [tw`w-36 h-36 drop-shadow-md p-4 font-['Cafe24Supermagic']`, bgcolors[0], textures[0]]
  const undraggable = css`
      -webkit-user-drag: none;
      -khtml-user-drag: none;
      -moz-user-drag: none;
      -o-user-drag: none;
      user-drag: none;
  `
  
  return (
    <Placing {...{ id, top, left, rotate, zindex, twStyles, type }}>
      <img {...{ src, css: [tw`select-none`, undraggable] }} alt="사진" />
      <div {...{ css: [tw`select-none`], style:{height: Ratio.fontSize * 2 * windowSize.width } }} >{content}</div>
    </Placing>
  )

}

export default Polaroid