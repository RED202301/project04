import { atom } from "recoil"
import { Res_Message } from "../api/messages/types"

const messagesState = atom<Res_Message[]>({
  key: "messagesState",
  default: []
})

export default messagesState