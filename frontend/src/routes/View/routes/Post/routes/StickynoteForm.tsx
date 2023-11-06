import { useState, ChangeEvent, Fragment } from "react"
import { useNavigate, useParams } from "react-router-dom";
import tw, { css } from "twin.macro"
import messages_api from "../../../../../api/messages";
import { useRecoilState, useRecoilValue } from "recoil";
import mobileSizeState from "../../../../../recoil/mobileSizeState";
import {AiFillEdit} from "react-icons/ai"
import messagesState from "../../../../../recoil/messagesState";
import secretMessages_api from "../../../../../api/secretMessages";

const SticknoteForm = () => {
  const navigate = useNavigate()
  const { userId } = useParams();
  const [bgcolor, setBgcolor] = useState(0);
  const [content, setContent] = useState("");   
  const mobileSize = useRecoilValue(mobileSizeState);
  const [messages, setMessages] = useRecoilState(messagesState);
  const [isSecret, setIsSecret] = useState(false)

  const bgcolors = [tw`bg-yellow-200`, tw`bg-red-200`, tw`bg-blue-200`, tw`bg-green-200`]
  const selected_bgcolors = [tw`bg-yellow-300`, tw`bg-red-300`, tw`bg-blue-300`, tw`bg-green-300`]

  const handleContentChange = (e:ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
  }
  const handleSubmit = async () => {
    const message = {
      receiverId: userId!,
      type:1,
      rotate: Math.random()*20-10,
      top: .5,
      left: .5,
      zindex: messages.length,
      content,
      bgcolor,
    }
    if (isSecret) await secretMessages_api.create(message)
    else await messages_api.create(message)
    
    const updatedMessage = await messages_api.search(userId!);
    setMessages(updatedMessage)
    navigate(`../`)
  }
  
  const buttonInnerRadius = mobileSize.width * .08;
  const buttonPadding = buttonInnerRadius / 8
  const buttonRadius = buttonInnerRadius + buttonPadding * 2;

  const innerWidth = mobileSize.width * .6
  const padding = innerWidth / 8
  const width = innerWidth + padding * 2
  const fontSize = innerWidth / 10;



  const tw_article = [
    tw`z-10`,
    tw`outline-none border-none`,
    bgcolors[bgcolor],
    css({
      width: `${innerWidth}px`,
      height: `${innerWidth}px`,
      padding: `${padding}px`,
      resize:"none"
    })
  ]

  const tw_textarea = [
    tw`w-full h-full`,
    tw`bg-transparent focus:bg-[rgba(1, 1, 1, .1)]`,
    tw`border-none outline-none resize-none`,
    tw`font-[omyuPretty]`,
    css({fontSize: `${fontSize}px`})
  ]

  const tw_colorpicker = [
    tw`z-10`,
    tw`flex justify-around items-center`,
    tw`bg-[rgba(1, 1, 1, .5)] rounded-full`,
    css({
      width: `${width}px`,
      height: `${buttonRadius * 1.5}px`
    })
  ]

  const tw_colorpick = [
    tw`rounded-full`,
    css({
      width: `${buttonRadius}px`,
      height: `${buttonRadius}px`
    })
  ]

  const tw_submit = [
    tw`z-10`,
    tw`flex justify-around items-center`,
    tw`bg-[rgba(1, 1, 1, .5)] rounded-full`,
    tw`text-white`,
    css({
      width: `${width}px`
    })
  ]

  const tw_button = [
    tw`rounded-full`,
    css({
      width: `${buttonInnerRadius}px`,
      height: `${buttonInnerRadius}px`,
      bottom:`0px`,
      transition: `rotate .3s ease-in-out, right .3s ease-in-out`,
      padding: `${buttonPadding}px`,
    })
  ]


  return (
    <Fragment>
      <section {...{ css: tw_colorpicker }}>
        {bgcolors.map((tw_bg_color, i) => (
          <label {...{
            key: i,
            css: [
              bgcolor === i ? selected_bgcolors[i] : tw_bg_color,
              tw_colorpick
            ],
            onClick: () => setBgcolor(i)
          }}>
              
          </label>
        ))}
      </section>
      <article {...{ css: tw_article }}>
        <textarea {...{
          css: tw_textarea,
          spellCheck:false,
          value: content, onChange: handleContentChange
        }}></textarea>
      </article>
      <section {...{ css: tw_submit }}>
        <div {...{ css: tw`flex justify-around items-center`, }}>
          <label htmlFor="isSecretCheck">비밀편지로 보내기</label>
          <input type="checkbox" id="isSecretCheck" checked={isSecret} onChange={(e)=>setIsSecret(e.target.checked)} />
        </div>
        <AiFillEdit {...{ css: [tw_button], onClick: handleSubmit }} />
      </section>
    </Fragment>
  );
}

export default SticknoteForm;