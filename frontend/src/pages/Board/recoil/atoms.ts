import { atom } from "recoil"
import { PlaceableInfo } from "../types/types"

interface DraggingInfo {
  isDrag: boolean;
  placeableId: number;
  startX: number;
  startY: number;
}

interface WindowSize {
  width: number,
  height: number,
}

const windowSizeState = atom<WindowSize>({
  key: "windowSizeState",
  default: {
    width: window.innerWidth,
    height: window.innerHeight
  }
})

const draggingState = atom<DraggingInfo>({
  key: "draggingState",
  default: { isDrag: false, placeableId: 0, startX: 0, startY: 0 },
})

const canDragState = atom<boolean>({
  key: "canDragState",
  default: true,
})

const placeableInfoListState = atom<PlaceableInfo[]>({
  key: "placeableInfoListState",
  default: []
})

const placeableInfoMapState = atom<Map<number, PlaceableInfo>>({
  key: "placeableInfoMapState",
  default: new Map<number, PlaceableInfo>(),
})

export {
  windowSizeState,
  draggingState,
  canDragState,
  placeableInfoListState,
  placeableInfoMapState
};