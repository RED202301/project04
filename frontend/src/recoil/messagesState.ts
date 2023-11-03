import { atom } from "recoil"

const messagesState = atom<Res_Messages[]>({
  key: "messagesState",
  default: []
})

export default messagesState