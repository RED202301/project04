import { Fragment } from "react";
import { useRecoilValue } from "recoil";
import tw from "twin.macro"
import messagesState from "../../../../recoil/messagesState";
import Stickynote from "../Board/components/Stickynote";
import Polaroid from "../Board/components/Polaroid";

const Messages = () => {
  const messages = useRecoilValue(messagesState)

  // const tw_main = [
  //   tw`z-10`,
  //   tw`flex-1`,
  //   tw`flex flex-wrap justify-around items-center`,
  //   css`
  //   white-space:pre-wrap;
  //   ::-webkit-scrollbar { display: none; }
  //   -ms-overflow-style: none;
  //   scrollbar-width: none;
  //   `,
  //   css({
  //     overflowY:"scroll"
  //   })
  // ]

  return <Fragment>
    <p css={tw`absolute left-[center] top-0 text-white text-2xl bg-[rgba(0,0,0,0.5)] w-[100%] text-center z-20`}>메세지 모아보기</p>
    {messages.map(message => {
      if(message.type === 1) return <div {...{css:tw`m-1 z-10`, key:message.id}}><Stickynote {...{...message, sizeRatio:.3 }} /></div>
      if(message.type === 2) return <div {...{css:tw`m-1 z-10`, key:message.id}}><Polaroid {...{...message, sizeRatio:.3 }} /></div>
    })}
  </Fragment>
}

export default Messages