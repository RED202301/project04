import { atom } from "recoil";

interface MobileSize {
  width: number,
  height: number,
}

const mobileSizeState = atom<MobileSize>({
  key: "mobileSizeState",
  default: { width: window.innerWidth, height: window.innerHeight }
})

export default mobileSizeState


