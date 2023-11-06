import { atom } from "recoil"

const isActiveFloatingState = atom({
  key: "sActiveFloatingState",
  default: false
})

export default isActiveFloatingState