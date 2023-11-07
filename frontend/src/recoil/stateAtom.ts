import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export interface state {
  id: number;
}

export const stateAtom = atom<state>({
  key: "stateAtom",
  default: {
    id: 2,
  },
  effects_UNSTABLE: [persistAtom],
});
