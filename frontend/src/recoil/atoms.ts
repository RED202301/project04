import { atom } from "recoil"
import { MutableRefObject } from "react"

const dragStateState = atom<
  { prevTop: number, prevLeft: number, startX: number, startY: number } | null
>({
  key: "dragStateState",
  default: null
});
const selectedMessageIdState = atom<number | null>({
  key: "selectedMessageId",
  default: null
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

export { dragStateState, selectedRefObjectState, isDraggedState, dragTimeoutState, selectedMessageIdState };