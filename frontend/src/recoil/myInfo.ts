import { atom } from "recoil";

const myInfoState = atom<
  {
    userId: string,
    userName: string,
    userProfileImageUrl: string
  } | null
>({
  key: "myInfoState",
  default: null
})

export default myInfoState