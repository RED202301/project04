import { Fragment } from "react";
import tw from "twin.macro"
import Stickynote from "../Board/components/Stickynote";
import Polaroid from "../Board/components/Polaroid";
import { useEffect } from "react"
import secretMessages_api from "../../../../api/secretMessages";
import { useRecoilState, useRecoilValue } from "recoil";
import myInfoState from "../../../../recoil/myInfo";
import secretMessagesState from "../../../../recoil/secretMessagesState";

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

  return <Fragment>
    {secretMessages.map(message => {
      if(message.type === 1) return <div {...{css:tw`m-1 z-10`, key:message.id}}><Stickynote {...{...message, sizeRatio:.3 }} /></div>
      if(message.type === 2) return <div {...{css:tw`m-1 z-10`, key:message.id}}><Polaroid {...{...message, sizeRatio:.3 }} /></div>
    })}
    
  </Fragment>
}

export default SecretMessages