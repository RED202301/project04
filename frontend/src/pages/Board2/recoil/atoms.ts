import { atom } from "recoil";
import { MobileSizeType, PlaceableInfo } from "../types/types";

const mobileSizeState = atom<MobileSizeType>({
  key: "mobileSizeState",
  default: { clientWidth: 0, clientHeight: 0 },
})

const isMovableState = atom({
  key: "isMovableState",
  default: true
})

const isEditableState = atom({
  key: 'isEditableState',
  default: false
})

const messagesState = atom<[Map<number, PlaceableInfo>, PlaceableInfo[]]>({
  key: 'messagesState',
  default: [new Map(), []]
})

const selectedMessageState = atom<{
  isDragged: boolean,
  isZoomed: boolean,
  messageId: number | null,
  offsetTop: number,
  offsetLeft: number,
  startX: number,
  startY: number
}>({
  key: 'selectedMessageState',
  default: {
    isDragged: false,
    isZoomed: false,
    messageId: null,
    offsetTop: 0,
    offsetLeft: 0,
    startX: 0,
    startY: 0
  }
})

export { mobileSizeState, isMovableState, isEditableState, messagesState, selectedMessageState };