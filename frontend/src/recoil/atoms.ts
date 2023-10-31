import { atom } from "recoil";
import { MessageGetType, MobileSizeType } from "../pages/Board/types/types";

const mobileSizeState = atom<MobileSizeType>({
  key: "mobileSizeState",
  default: { clientWidth: 0, clientHeight: 0 },
})

const messageMapState = atom<Map<number, MessageGetType>>({
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
    ref: React.MutableRefObject<HTMLElement>,
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