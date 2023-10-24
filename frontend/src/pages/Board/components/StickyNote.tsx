import tw from "twin.macro";
import { StickyNoteProps } from "../types/types"
import Placing from "./Placing";
import { bgcolors } from "../Styles/bgcolors";
import { textures } from "../Styles/texture";

const StickyNote: React.FC<StickyNoteProps> = ({ ...props }) => {
  const { content, id, top, left, rotate, zindex, bgcolor, type } = props;
  
  const twStyles = [
    tw`drop-shadow-md p-4 font-['Cafe24Supermagic']`,
    bgcolors[bgcolor],
    textures[0],
  ]
  return <Placing {...{ id, top, left, rotate, zindex, twStyles, type}}>
      {content}
  </Placing>
}

export default StickyNote