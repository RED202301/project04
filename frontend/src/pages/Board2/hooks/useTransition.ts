import { useSetRecoilState } from "recoil";
import { isOnTransitionState } from "../recoil/atoms";

const useTransition = () => {
  const setIsOnTransition = useSetRecoilState(isOnTransitionState)
  const setTransition = (timeout: number) => {
    setIsOnTransition(true);
    setTimeout(() => setIsOnTransition(false), timeout)
  }
  return setTransition
}

export default useTransition;