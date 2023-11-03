import { useRecoilState } from "recoil";
import tw from "twin.macro"
import messagesState from "../../../../recoil/messagesState";
import messages_api from "../../../../api/messages";
import { useEffect } from "react";
import Stickynote from "./components/Stickynote";
import Polaroid from "./components/Polaroid";
import PlaceableContainer from "./components/PlaceableContainer";

const Board = ({ userId }: { userId: number }) => {

  const [messages, setMessages] = useRecoilState(messagesState);
  const fetchMessages = async () => {
    const messages = await messages_api.search(userId);
    setMessages(messages);
  }

  useEffect(() => {
    fetchMessages();
  }, [])

  return <div {...{ css: tw`flex-1 flex flex-wrap` }}>
    {[...messages]
      .sort((a,b)=>a.zindex -b.zindex)
      .map(message => {
      const {id, top, left, rotate, zindex} = message
      return <PlaceableContainer {...{ key: id, top, left, rotate, zindex, messageId:id }}>
        {message.type === 1 && <Stickynote {...{ ...message, sizeRatio: .3 }} />}
        {message.type === 2 && <Polaroid {...{ ...message, sizeRatio: .3 }} />}
      </PlaceableContainer>
    })}
    
  </div>
};

export default Board