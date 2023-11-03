import { atom } from "recoil"
import { MutableRefObject } from "react"

const dragStateState = atom({
  key: "dragStateState",
  default: { prevTop: 0, prevLeft: 0, startX: 0, startY: 0 }
})

const selectedRefObjectState = atom<MutableRefObject<HTMLElement> | null>({
  key: "selectedRefObjectState",
  default: null
})

const isDraggedState = atom({
  key: "isDraggedState",
  default: false
})
const dragTimeoutState = atom({
  key: "dragTimeoutState",
  default: 0
})

export { dragStateState, selectedRefObjectState, isDraggedState, dragTimeoutState };