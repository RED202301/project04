import { atom } from "recoil";

const myInfoState = atom<
  {
    userId: number,
    userName: string,
    userProfileImageUrl: string
  } | null
>({
  key: "myInfoState",
  default: null
})

export default myInfoState