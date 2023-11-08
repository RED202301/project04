import { Fragment } from "react";
import { useRecoilValue } from "recoil";
import tw, { css } from "twin.macro"
import messagesState from "../../../../recoil/messagesState";
import Stickynote from "../Board/components/Stickynote";
import Polaroid from "../Board/components/Polaroid";
import mobileSizeState from "../../../../recoil/mobileSizeState";

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
  const mobileSize = useRecoilValue(mobileSizeState);
  const tw_header = [
    tw`text-center flex items-center z-10 text-white `,
    css`
    height: ${mobileSize.width * 0.12}px;
    font-size: ${mobileSize.width * 0.04}px;
    `
  ]
  const tw_container = [
    tw`flex-1 flex flex-wrap justify-around items-center`,
    css`
            white-space:pre-wrap;
            ::-webkit-scrollbar { display: none; }
            -ms-overflow-style: none;
            scrollbar-width: none;
          `,
    css({ overflowY: 'scroll' })

  ]

  return <Fragment>
    <div {...{css:tw_header}}>메세지 모아보기</div>
    <div {...{ css: tw_container }}>
      {messages.map(message => {
        if(message.type === 1) return <div {...{css:tw`m-1 z-10`, key:message.id}}><Stickynote {...{...message, sizeRatio:.3 }} /></div>
        if(message.type === 2 || message.type === 3) return <div {...{css:tw`m-1 z-10`, key:message.id}}><Polaroid {...{...message, sizeRatio:.3 }} /></div>
      })}
      
    </div>
    
  </Fragment>
}

export default Messages