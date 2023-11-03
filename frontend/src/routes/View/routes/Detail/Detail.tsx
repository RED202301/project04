import { useState, useEffect, Fragment} from "react"
import { useParams } from "react-router-dom"
import Stickynote from "../Board/components/Stickynote"
import messages_api from "../../../../api/messages"
import Polaroid from "../Board/components/Polaroid"

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
  return (
    <Fragment>
      {message?.type === 1 && <Stickynote {...{ ...message!, sizeRatio:.6, isOverlayed:true }} />}
      {message?.type === 2 && <Polaroid {...{ ...message!, sizeRatio:.6, isOverlayed:true }} />}
    </Fragment>
  )
}

export default Detail