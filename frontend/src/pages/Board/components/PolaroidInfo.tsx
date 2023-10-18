import { TwStyle } from "twin.macro";
import StickyNoteInfo from "./StickyNoteInfo";

enum ArticleType{
  StickyNote = "StickyNote",
  Polaroid = "Polaroid"
}

class PolaroidInfo extends StickyNoteInfo{
  type: ArticleType = ArticleType.Polaroid;
  imgUrl: string;
  constructor({ content, css, imgUrl } :{content?:string, css?:TwStyle, imgUrl?:string}) {
    super({ content, css })
    this.imgUrl = imgUrl || "";
  }
}

export default PolaroidInfo;