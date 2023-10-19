import tw from "twin.macro";
import { StickerProps } from "../types/types";
import Placing from "./Placing";

const Sticker: React.FC<StickerProps> = ({src, ...props}) => {
  
  const { id, top, left, rotate, zIndex } = props;
  const twStyles = [tw`absolute select-none text-7xl`]

  return <Placing {...{ id, top, left, rotate, zIndex, twStyles}}>
    {src}
  </Placing>
}

export default Sticker;