interface MobileSizeType {
  clientWidth: number;
  clientHeight: number;
}

enum PlaceableType {
  Sticker = 0,
  StickyNote = 1,
  PolaroidVideo = 2,
  PolaroidPhoto = 3,
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

export type { MobileSizeType, PlaceableInfo, StickyNoteInfo };