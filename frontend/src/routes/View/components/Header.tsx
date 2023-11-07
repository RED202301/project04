import tw from "twin.macro";
import { AiOutlinePaperClip, AiOutlineMenu, AiOutlineShareAlt } from "react-icons/ai"
import { css } from "@emotion/react";
import { useRecoilValue } from "recoil";
import mobileSizeState from "../../../recoil/mobileSizeState";
import Profile from "./Profile";

const front_base_URL = import.meta.env.VITE_FRONT_SERVER_URL;

const Header = ({userId, username}:{userId:string, username:string}) => {
  const mobileSize = useRecoilValue(mobileSizeState)
  const isMobile = (/iphone|ipad|ipod|android/i.test(navigator.userAgent.toLowerCase()));
  const share = () => {
    if (isMobile) {
      navigator.share({
        title: "[Send2U]",
        text: `${username}님에게 글을 남겨주세요.`,
        url: `${front_base_URL}/board/${userId}}`
      })
    } else {
      navigator.clipboard.writeText(`${front_base_URL}/board/${userId}}`) 
      alert("현재 링크가 클립보드에 저장되었습니다!")
    }
  }

  return (
    <header {...{
      css: [
        tw`h-[4rem] flex justify-between items-center text-[2rem] bg-white text-black`,
        css`
          height: ${mobileSize.width * 0.12}px;
          font-size: ${mobileSize.width * 0.04}px;
          `
      ]
    }}>
      <div id="share"  {...{ css: css` margin: ${mobileSize.width * 0.03}px`, onClick: share }}>
        {isMobile
          ?<AiOutlineShareAlt />
          : <AiOutlinePaperClip />
        }
        
      </div>
      <div {...{ css: tw`text-black` }}>{username || ""}님의 페이지</div>
      <div {...{css: css`margin: ${mobileSize.width * 0.03}px`}}>
        {/* <AiOutlineMenu /> */}
        <Profile/>
      </div>
      
    </header>
  )
}

export default Header;