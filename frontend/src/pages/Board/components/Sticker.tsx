import tw from "twin.macro";
import { StickerProps } from "../types/types";
import Placing from "./Placing";

const Sticker: React.FC<StickerProps> = ({src, ...props}) => {
  
  const { id, top, left, rotate, zindex, type } = props;
  const twStyles = [
    tw`text-7xl`
  ]

  return <Placing {...{ id, top, left, rotate, zindex, twStyles, type }}>
    {src}
  </Placing>
}

export default Sticker;