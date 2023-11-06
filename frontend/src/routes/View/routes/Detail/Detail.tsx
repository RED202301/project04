import { useState, useEffect, Fragment} from "react"
import { useParams } from "react-router-dom"
import Stickynote from "../Board/components/Stickynote"
import messages_api from "../../../../api/messages"
import Polaroid from "../Board/components/Polaroid"
import { Res_Message } from "../../../../api/messages/types"
import tw from "twin.macro"

const Detail = () => {
  const { messageId } = useParams()
  const [message, setMessage] = useState<Res_Message>();
  const fetchMessage = async () => {
    console.log(messageId)
    const message = await messages_api.fetch(parseInt(messageId!)) as Res_Message;
    console.log(message)
    setMessage(message);
  }
  useEffect(() => {
    fetchMessage()
  }, [])
  console.log(message)
  return (
    <Fragment>
      <div {...{ css: tw`w-full` }}></div>
      <div {...{ css: tw`w-full` }}></div>
      <div {...{ css: tw`z-30 w-[60%] flex justify-between text-white` }}>
        <div {...{ css: tw`z-30` }}>{message?.createdAt}</div>
        <button></button>
      </div>
      {message?.type === 1 && <Stickynote {...{ ...message!, sizeRatio: .6, isOverlayed: true }} />}
      {message?.type === 2 && <Polaroid {...{ ...message!, sizeRatio: .6, isOverlayed: true }} />}
      
      <div {...{ css: tw`z-30 w-[60%] flex justify-end text-white` }}>
        <div>From. {message?.senderName}</div>
      </div>
      <div {...{ css: tw`w-full` }}></div>
      <div {...{ css: tw`w-full` }}></div>
    </Fragment>
  )
}

export default Detail