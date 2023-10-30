import { atom } from "recoil";
import { MobileSizeType, PlaceableInfo } from "../types/types";

const mobileSizeState = atom<MobileSizeType>({
  key: "mobileSizeState",
  default: { clientWidth: 0, clientHeight: 0 },
})

const messageMapState = atom<Map<number, PlaceableInfo>>({
  key: 'messageMapState',
  default: new Map()
})

const globalStateState = atom({
  key: "globalstateState",
  default: {
    isMovable: true,
    isModalOpen: false,
  }
})

const selectedMessageState = atom<
  {
    id: number,
    top: number,
    left: number,
    startX: number,
    startY: number,
    isDragged: boolean,
  } | null>({
    key: 'selectedMessageState',
    default: null
  })

const isOnTransitionState = atom({
  key: "isOnTransitionState",
  default: false,
})

const isEditableState = atom({
  key: "isEditableState",
  default: false
})

export {
  mobileSizeState,
  messageMapState,
  selectedMessageState,
  globalStateState,
  isOnTransitionState,
  isEditableState
};