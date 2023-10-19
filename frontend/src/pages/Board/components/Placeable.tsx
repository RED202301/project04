import { PlaceableProps, PlaceableType } from "../types/types";
import Sticker from "./Sticker";
import StickyNote from "./StickyNote";
import Polaroid from "./Polaroid";

const Placeable: React.FC<PlaceableProps> = (props) => {
  switch (props.type) {
    case PlaceableType.Sticker:
      return <Sticker {...{ ...(props) }}></Sticker>;
    
    case PlaceableType.StickyNote:
      return <StickyNote {...{ ...props }}></StickyNote>;
    
    case PlaceableType.PolaroidVideo:
      return <Polaroid {...{ ...props }}></Polaroid>;
    
    case PlaceableType.PolaroidPhoto:
      return <Polaroid {...{ ...props }}></Polaroid>;
    
    default:
      return;
  }
}

export default Placeable