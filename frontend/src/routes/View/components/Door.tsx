import { css } from "@emotion/react"
import tw from "twin.macro"
import mobileSizeState from "../../../recoil/mobileSizeState"
import { useRecoilValue } from "recoil"
import door from "/door.png"

interface DoorProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handle: (value: any) => void;
  }

const Door: React.FC<DoorProps> = ({handle}) => {
  const mobileSize = useRecoilValue(mobileSizeState)
  return (
    <div>
    <div css={tw`absolute left-0 top-0 h-screen opacity-[40%]`} style={{width: mobileSize.width, backgroundColor: 'black'}} onClick={handle}>
    </div>
        <img src={door} width={"80%"} alt="" css={tw`absolute left-[10%] top-[12%] rounded-md`} />
    </div>
  );
}

export default Door;