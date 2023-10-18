import tw, { TwStyle } from "twin.macro";

enum ArticleType{
  StickyNote = "StickyNote",
  Polaroid = "Polaroid"
}

class StickyNoteInfo {
  static AUTO_INCREMENT: number = 1;
  id: number;
  userId: number;
  authorId: number;
  content: string;
  css: TwStyle;
  type: ArticleType = ArticleType.StickyNote;
  
  top: number = 0;
  left: number = 0;
  rotateZ: number = 0;
  zIndex: number;

  constructor({ content, css } :{content?:string, css?:TwStyle}) {
    this.id = StickyNoteInfo.AUTO_INCREMENT;
    this.userId = StickyNoteInfo.AUTO_INCREMENT;
    this.authorId = StickyNoteInfo.AUTO_INCREMENT;
    this.zIndex = StickyNoteInfo.AUTO_INCREMENT;
    StickyNoteInfo.AUTO_INCREMENT++;

    this.content = content || "";
    this.css = css || [tw`bg-yellow-300`, tw`bg-blue-300`, tw`bg-red-300`][Math.floor(Math.random()*3)]
  }
}

export default StickyNoteInfo;