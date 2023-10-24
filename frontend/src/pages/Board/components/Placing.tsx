import { PlacingProps } from "../types/types";
import { useOnDragStart } from "../hooks";
import tw, { css } from "twin.macro";
import { useRecoilState } from "recoil";
import { windowSizeState } from "../recoil/atoms";
import Ratio from "../Styles/ratios";

const Placing: React.FC<PlacingProps> = ({ children, id, top, left, rotate, twStyles, type }) => {
  const onDragStart = useOnDragStart(id);
  const [windowSize] = useRecoilState(windowSizeState);
  return <div
    {...{
      onMouseDown: onDragStart,
      onTouchStart: onDragStart,
      css:[ ...twStyles, tw`absolute select-none`, css`transition: rotate .3s, top 0s, left 0s`, ],
      style: {
        top: top * windowSize.width,
        left: left * windowSize.width,
        padding: Ratio.padding * windowSize.width,
        rotate: `${rotate}deg`,
        width: Ratio[type].width * windowSize.width,
        height: Ratio[type].height * windowSize.width || "auto",
        fontSize: Ratio.fontSize * windowSize.width
      },
  }}
  >{children}</div>
}

export default Placing