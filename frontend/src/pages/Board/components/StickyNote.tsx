import tw from "twin.macro";
import { StickyNoteProps } from "../types/types"
import Placing from "./Placing";

const StickyNote: React.FC<StickyNoteProps> = ({ ...props }) => {
  const { content, id, top, left, rotate, zIndex, color } = props;
  const twColors =[
    tw`bg-white`,
    tw`bg-yellow-300`,
    tw`bg-red-300`,
    tw`bg-blue-300`,
  ]
  const twColor = twColors[color]
  const twStyles = [tw`w-36 h-36 absolute select-none drop-shadow-md p-4 font-['Nanum Brush Script'] bg-[url("https://transparenttextures.com/patterns/polaroid.png")]`, ...(twColor?[twColor]:[])]
  return <Placing {...{ id, top, left, rotate, zIndex, twStyles }}>
      {content}
  </Placing>
}

export default StickyNote