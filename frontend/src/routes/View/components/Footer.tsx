import { css } from "@emotion/react"
import { useRecoilValue } from "recoil"
import tw from "twin.macro"
import mobileSizeState from "../../../recoil/mobileSizeState"
import { Link } from "react-router-dom"
import {AiOutlineInbox, AiOutlineHome, AiOutlineEdit} from "react-icons/ai"

const Footer = () => {
  const mobileSize = useRecoilValue(mobileSizeState)
  return (
    <footer {...{
      css: [
        tw`h-[4rem] flex justify-around items-center text-[2rem] bg-white text-gray-100`,
        css`
        height: ${mobileSize.width * 0.12}px;
        font-size: ${mobileSize.width * 0.06}px;
      `
      ]
    }}>
      <Link to="mailbox"><AiOutlineInbox/></Link>
      <Link to="./"><AiOutlineHome/></Link>
      <Link to="post"><AiOutlineEdit/></Link>
    </footer>
  );
}

export default Footer