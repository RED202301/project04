import { atom } from "recoil"
import { Res_SecretMessage } from "../api/secretMessages/types"

const secretMessagesState = atom<Res_SecretMessage[]>({
  key: "secretMessagesState",
  default: []
})

export default secretMessagesState