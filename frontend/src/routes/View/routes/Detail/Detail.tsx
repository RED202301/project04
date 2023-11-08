import { useEffect, Fragment} from "react"
import { useNavigate, useParams } from "react-router-dom"
import Stickynote from "../Board/components/Stickynote"
import messages_api from "../../../../api/messages"
import Polaroid from "../Board/components/Polaroid"
import tw, { css } from "twin.macro"
import { useRecoilValue } from "recoil"
import myInfoState from "../../../../recoil/myInfo"
import mobileSizeState from "../../../../recoil/mobileSizeState"
import secretMessagesState from "../../../../recoil/secretMessagesState"
import messagesState from "../../../../recoil/messagesState"
import secretMessages_api from "../../../../api/secretMessages"

const Detail = ({isSecret}:{isSecret?:boolean}) => {
  const mobileSize = useRecoilValue(mobileSizeState)
  const myInfo = useRecoilValue(myInfoState);
  const { messageId } = useParams()
  const messages = useRecoilValue(isSecret ? secretMessagesState : messagesState)
  const message = messages.filter(({ id }) => id === parseInt(messageId))[0]
  const navigate = useNavigate()
  useEffect(() => {
    if(!message) navigate("../")
  })

  const fontSize = css({ fontSize: `${mobileSize.width * .05}px` })
  const trimDate = (createdAt) => {
    if (!createdAt) return
    const [date] = createdAt.split("T")
    const [year, month, day] = date.split("-")
    return `${year}년 ${month}월 ${day}일`
  }
  const trimTime = (createdAt) => {
    if (!createdAt) return
    const [, time] = createdAt.split("T")
    const [hour, minute] = time.split(":")
    return `${hour}시 ${minute}분`
  }

  const handleRemove = async () => {
    if (confirm("삭제하면 복구할 수 없어요! 삭제하시겠습니까?")) {
      if (isSecret) await secretMessages_api.remove(message.id)
      else await messages_api.remove(message.id);
      window.location.reload()
    }
  }

  return (
    <Fragment>
      <div {...{ css: tw`w-full` }}></div>
      <div {...{ css: tw`w-full` }}></div>
      <div {...{ css: tw`z-30 w-[60%] flex justify-between items-center text-white` }}>
        <div {...{ css: [tw`z-30 flex flex-col items-center`, fontSize] }}>
          <div>{trimDate(message?.createdAt)}</div>
          <div>{trimTime(message?.createdAt)}</div>
        </div>
        {myInfo?.userId === message?.senderId || myInfo?.userId === message?.receiverId ? <div {...{onClick:handleRemove, css: fontSize}}>삭제</div>: <div></div>}
      </div>
      {message?.type === 1 && <Stickynote {...{ ...message!, sizeRatio: .6, isOverlayed: true }} />}
      {message?.type === 2 && <Polaroid {...{ ...message!, sizeRatio: .6, isOverlayed: true }} />}
      
      <div {...{ css: tw`z-30 w-[60%] flex justify-end text-white` }}>
        <div {...{css: fontSize}}>From.
          <span {...{onClick:()=>navigate(`/view/${message?.senderId}`)}}>
            {message?.senderName}
          </span>
        </div>
      </div>
      <div {...{ css: tw`w-full` }}></div>
      <div {...{ css: tw`w-full` }}></div>
    </Fragment>
  )
}

export default Detail