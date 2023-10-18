import { atom } from "recoil"
import PolaroidInfo from "../components/PolaroidInfo"
import tw from "twin.macro"

const isEditState = atom({
  key: "isEditState",
  default: false
})

const stickyNoteInfosState = atom({
  key: "stickyNoteInfosState",
  default:  [
    new PolaroidInfo({content:"노랑노랑", css:tw`bg-yellow-300`}),
    new PolaroidInfo({content:"파랑파랑", css:tw`bg-blue-300`}),
    new PolaroidInfo({content:"빨강빨강", css:tw`bg-red-300`}),
    new PolaroidInfo({content:"갬성사진", css:tw`bg-white`, imgUrl: "https://cdn.thescoop.co.kr/news/photo/202102/42527_61056_1017.jpg"}),
  ]
})

export {isEditState, stickyNoteInfosState}