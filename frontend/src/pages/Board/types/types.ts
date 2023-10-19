import { TwStyle } from "twin.macro";

enum PlaceableType {
  Sticker = "sticker",
  StickyNote = "stickynote",
  PolaroidVideo = "video",
  PolaroidPhoto = "photo",
}

interface PlacingInfo {
  id: number;
  top: number;
  left: number;
  rotate: number;
  zIndex: number;
}

interface _PlaceableInfo extends PlacingInfo {
  type: PlaceableType;
  userId: number;
  authorId: number;
}

interface StickerInfo extends _PlaceableInfo {
  type: PlaceableType.Sticker;
  src: string;
}

interface StickyNoteInfo extends _PlaceableInfo {
  type: PlaceableType.StickyNote;
  color: number;
  content: string;
}

interface PolaroidInfo extends _PlaceableInfo {
  type: PlaceableType.PolaroidPhoto | PlaceableType.PolaroidVideo;
  thumbnail: string;
  src: string;
  content?: string;
}


type PlaceableInfo = StickerInfo | StickyNoteInfo | PolaroidInfo;

interface DraggingInfo {
  isDrag: boolean;
  placeableId: number;
  offsetTop: number;
  offsetLeft: number;
  startX: number;
  startY: number;
}

interface PlacingProps extends PlacingInfo, React.PropsWithChildren {
  twStyles: TwStyle[]
}
interface StickerProps extends StickerInfo, React.PropsWithChildren { }
interface StickyNoteProps extends StickyNoteInfo, React.PropsWithChildren { }
interface PolaroidProps extends PolaroidInfo, React.PropsWithChildren { }

type PlaceableProps = StickerProps | StickyNoteProps | PolaroidProps;


class DummyPlaceableInfo {
  static AUTO_INCREMENT: number = 1;
  static Sticker({ src }: { src: string }): StickerInfo {
    return {
      id: this.AUTO_INCREMENT,
      userId: this.AUTO_INCREMENT,
      authorId: this.AUTO_INCREMENT,
      zIndex: this.AUTO_INCREMENT++,
      top: 0,
      left: 0,
      rotate: 0,
      src,
      type: PlaceableType.Sticker,
    }
  }
  static StickyNote({ content, color }: { content: string, color: number }): StickyNoteInfo {
    return {
      id: this.AUTO_INCREMENT,
      userId: this.AUTO_INCREMENT,
      authorId: this.AUTO_INCREMENT,
      zIndex: this.AUTO_INCREMENT++,
      top: 0,
      left: 0,
      rotate: 0,
      content,
      color,
      type: PlaceableType.StickyNote,
    }
  }
  static Polaroid({ content, src, thumbnail }: { content: string, src: string, thumbnail: string }): PolaroidInfo {
    return {
      id: this.AUTO_INCREMENT,
      userId: this.AUTO_INCREMENT,
      authorId: this.AUTO_INCREMENT,
      zIndex: this.AUTO_INCREMENT++,
      top: 0,
      left: 0,
      rotate: 0,
      content,
      src,
      thumbnail,
      type: PlaceableType.PolaroidPhoto,
    }
  }
}

export {
  PlaceableType,
  DummyPlaceableInfo,
}

export type {

  StickerInfo,
  StickyNoteInfo,
  PolaroidInfo,
  PlaceableInfo,

  DraggingInfo,

  PlacingProps,
  StickerProps,
  StickyNoteProps,
  PolaroidProps,
  PlaceableProps
}