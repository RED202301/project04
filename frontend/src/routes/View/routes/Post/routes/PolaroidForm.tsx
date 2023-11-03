import { useState, Fragment } from "react"
import { useNavigate, useParams } from "react-router-dom";
import tw, { css } from "twin.macro"
import messages_api from "../../../../../api/messages";
import { useRecoilState, useRecoilValue } from "recoil";
import mobileSizeState from "../../../../../recoil/mobileSizeState";
import {AiFillEdit} from "react-icons/ai"
import messagesState from "../../../../../recoil/messagesState";

const PolaroidForm = () => {
  const navigate = useNavigate()
  const { userId } = useParams();
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File>()
  const mobileSize = useRecoilValue(mobileSizeState);
  const [messages, setMessages] = useRecoilState(messagesState)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) setFile(file)
  }

  const handleSubmit = async () => {
    await messages_api.create({
      receiverId: parseInt(userId!),
      type: 2,
      rotate: Math.random() * 20 - 10,
      top: .5,
      left: .5,
      zindex: messages.length,
      content,
      sourceFile: file,
      thumbnailFile: file,
    })
    
    const updatedMessage = await messages_api.search(parseInt(userId!));
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
    tw`bg-white`,
    css({
      width: `${innerWidth}px`,
      padding: `${padding}px`,
      resize: "none"
    })
  ]

  const tw_photo = [
    css({
      width: `${innerWidth}px`,
      marginBottom: `${padding / 2}px`
    })
  ]

  const tw_placeholder = [
    tw`bg-[rgba(1, 1, 1, .1)]`,
    tw`flex justify-center items-center`,
    css({
      width: `${innerWidth}px`,
      height: `${innerWidth * 3 / 5}px`,
      marginBottom: `${padding / 2}px`
    })
  ]

  const tw_textarea = [
    tw`bg-transparent focus:bg-[rgba(1, 1, 1, .1)]`,
    tw`border-none outline-none resize-none`,
    tw`font-[omyuPretty]`,
    css({
      fontSize: `${fontSize}px`,
      width: `${innerWidth}px`,
      height: `${innerWidth / 3}px`,
    })
  ]

  const tw_filepicker = [
    tw`z-10`,
    tw`flex justify-around items-center`,
    tw`bg-[rgba(1, 1, 1, .5)] rounded-full`,
    tw`text-white`,
    css({
      width: `${width}px`,
      height: `${buttonRadius * 1.5}px`
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
      bottom: `0px`,
      transition: `rotate .3s ease-in-out, right .3s ease-in-out`,
      padding: `${buttonPadding}px`,
    })
  ]


  return (
    <Fragment>
      <section {...{ css: tw_filepicker }}>
        <label>
          미디어 파일 업로드
          <input {...{
            type: "file",
            accept: `image/*`,
            css: tw`hidden`,
            onChange: handleFileChange
          }} />
        </label>
      </section>
      <article {...{ css: tw_article }}>
        {
          file
            ? <img {...{css:tw_photo, src:URL.createObjectURL(file)}} />
            : <div {...{ css: tw_placeholder }}>미디어 파일 업로드</div>
        }
        <textarea {...{
          css: tw_textarea,
          spellCheck: false,
          value: content, onChange: (e) => setContent(e.target.value)
        }}></textarea>
      </article>
      <section {...{ css: tw_submit }}>
        <div {...{ css: tw`flex justify-around items-center`, }}>
          <label htmlFor="isSecretCheck">비밀편지로 보내기</label>
          <input type="checkbox" id="isSecretCheck" />
        </div>
        <AiFillEdit {...{ css: [tw_button], onClick: handleSubmit }} />
      </section>
    </Fragment>
  );
};

export default PolaroidForm;