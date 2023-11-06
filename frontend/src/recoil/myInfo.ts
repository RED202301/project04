import { atom } from "recoil";
// import { recoilPersist } from "recoil-persist";
// const { persistAtom } = recoilPersist();

const myInfoState = atom<
  {
    userId: string,
    userName: string,
    userProfileImageUrl: string
  } | null
>({
  key: "myInfoState",
  default: null,
  // effects_UNSTABLE: [persistAtom],
})

export default myInfoState