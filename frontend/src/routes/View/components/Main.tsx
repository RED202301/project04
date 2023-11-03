import { useEffect } from "react";
import { useRecoilState } from "recoil";
import tw from "twin.macro"
import messagesState from "../../../recoil/messagesState";
import messages_api from "../../../api/messages";

const front_base_URL = import.meta.env.VITE_FRONT_SERVER_URL;

const Main = ({ userId }: { userId: number }) => {
  const [messages, setMessages] = useRecoilState(messagesState);
  
  const fetchMessages = async () => {
    const messages = await messages_api.search(userId);
    console.log(messages)
    setMessages(messages);
  }
  useEffect(() => {
    fetchMessages();
  }, [])
  
  return (
    <main css={tw`w-full flex-1`}>
      {messages.map(({ id, receiverName, senderName, senderId }) => {
        
        return (
          <div key={id}>
            <div> {receiverName} </div>
            <a {...{ href: `${front_base_URL}/board/${senderId}` }}>
              {senderName}
            </a>
          </div>
        )
      })}
    </main>
  )
}

export default Main;