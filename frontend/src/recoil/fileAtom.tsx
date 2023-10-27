import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export interface file {
    sourceFile : File
    thumbnailFile : File
    type : number
}

export const fileAtom = atom<file | null>({
  key: "fileAtom",
  default: {
    sourceFile : null,
    thumbnailFile : null,
    type : 1
  },
  effects_UNSTABLE: [persistAtom],
});
