import { Fragment } from "react";
import tw, { css } from "twin.macro"
import Stickynote from "../Board/components/Stickynote";
import Polaroid from "../Board/components/Polaroid";
import { useEffect } from "react"
import secretMessages_api from "../../../../api/secretMessages";
import { useRecoilState, useRecoilValue } from "recoil";
import myInfoState from "../../../../recoil/myInfo";
import secretMessagesState from "../../../../recoil/secretMessagesState";
import mobileSizeState from "../../../../recoil/mobileSizeState";

const SecretMessages = ({userId}:{userId:string}) => {
  const myInfo = useRecoilValue(myInfoState);
  const [secretMessages, setSecretMessages] = useRecoilState(secretMessagesState);
  const fetchSecretMessages = async () => {
    const _secretMessages = await secretMessages_api.search(userId)
    const secretMessages = _secretMessages.filter((secretMessage) => {
      return secretMessage.receiverId === myInfo.userId || secretMessage.senderId === myInfo.userId
    })
    setSecretMessages(secretMessages);
  }
  
  useEffect(() => {
    fetchSecretMessages()
  }, [])

  const mobileSize = useRecoilValue(mobileSizeState);
  const tw_header = [
    tw`text-center flex items-center z-10 text-white`,
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
    <div {...{ css: tw_header }}>예약 편지 모아보기</div>
    <div {...{ css: tw_container }}>
      
    {secretMessages.map(message => {
      if(message.type === 1) return <div {...{css:tw`m-1 z-10`, key:message.id}}><Stickynote {...{...message, sizeRatio:.3 }} /></div>
      if(message.type === 2 || message.type === 3) return <div {...{css:tw`m-1 z-10`, key:message.id}}><Polaroid {...{...message, sizeRatio:.3 }} /></div>
    })}
    </div>
    
  </Fragment>
}

export default SecretMessages