import { TwStyle } from "twin.macro";
import { SerializedStyles } from "@emotion/react/macro"

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
  zindex: number;
}

interface _PlaceableInfo extends PlacingInfo {
  type: PlaceableType;
  receiverId: number;
  senderId: number;
}

interface StickerInfo extends _PlaceableInfo {
  type: PlaceableType.Sticker;
  src: string;
}

interface StickyNoteInfo extends _PlaceableInfo {
  type: PlaceableType.StickyNote;
  bgcolor: number;
  content: string;
}

interface PolaroidInfo extends _PlaceableInfo {
  type: PlaceableType.PolaroidPhoto | PlaceableType.PolaroidVideo;
  thumbnail: string;
  src: string;
  content?: string;
}

type PlaceableInfo = StickerInfo | StickyNoteInfo | PolaroidInfo;

interface PlaceableInfo2 {
  id: number;
  top: number;
  left: number;
  rotate: number;
  zindex: number;

  type: PlaceableType; // number
  receiverId: number;
  senderId: number;

  texture: number | null;
  bgcolor: number | null;
  font: number | null;
  content: string | null;
  thumbnail: string | null;
  src: string | null;
}


interface DraggingInfo {
  isDrag: boolean;
  placeableId: number;
  offsetTop: number;
  offsetLeft: number;
  startX: number;
  startY: number;
}

interface PlacingProps extends PlacingInfo, React.PropsWithChildren {
  twStyles: (TwStyle | SerializedStyles)[];
  type: PlaceableType;
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
      receiverId: this.AUTO_INCREMENT,
      senderId: this.AUTO_INCREMENT,
      zindex: this.AUTO_INCREMENT++,
      top: 0,
      left: 0,
      rotate: 0,
      src,
      type: PlaceableType.Sticker,
    }
  }
  static StickyNote({ content, bgcolor }: { content: string, bgcolor: number }): StickyNoteInfo {
    return {
      id: this.AUTO_INCREMENT,
      receiverId: this.AUTO_INCREMENT,
      senderId: this.AUTO_INCREMENT,
      zindex: this.AUTO_INCREMENT++,
      top: 0,
      left: 0,
      rotate: 0,
      content,
      bgcolor,
      type: PlaceableType.StickyNote,
    }
  }
  static Polaroid({ content, src, thumbnail }: { content: string, src: string, thumbnail: string }): PolaroidInfo {
    return {
      id: this.AUTO_INCREMENT,
      receiverId: this.AUTO_INCREMENT,
      senderId: this.AUTO_INCREMENT,
      zindex: this.AUTO_INCREMENT++,
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

  PlaceableInfo2,

  DraggingInfo,

  PlacingProps,
  StickerProps,
  StickyNoteProps,
  PolaroidProps,
  PlaceableProps
}