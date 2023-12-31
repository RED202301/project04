import { useState, Fragment } from "react"
import { useNavigate, useParams } from "react-router-dom";
import tw, { css } from "twin.macro"
import messages_api from "../../../../../api/messages";
import { useRecoilState, useRecoilValue } from "recoil";
import mobileSizeState from "../../../../../recoil/mobileSizeState";
import {AiFillEdit} from "react-icons/ai"
import messagesState from "../../../../../recoil/messagesState";
import secretMessages_api from "../../../../../api/secretMessages";
import heic2any from "heic2any";


const min_ratio = 10 / 16
const max_ratio = 16 / 10

  //base64 > 파일 변환
const dataURLtoFile = (dataurl: string, fileName: string): File => {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)?.[1];
  const bstr = atob(arr[1]);
  const n = bstr.length;
  const u8arr = new Uint8Array(n);

  for (let i = 0; i < n; i++) {
    u8arr[i] = bstr.charCodeAt(i);
  }

  return new File([u8arr], fileName, { type: mime });
}



const PolaroidForm = () => {
  const navigate = useNavigate()
  const { userId } = useParams();
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File>()
  const [thumnail, setThumnail] = useState<{ src: File|null, width: number, height: number }>({src:null, width:0, height:0})
  const [mediaType, setMediaType] = useState<2 | 3>();

  const mobileSize = useRecoilValue(mobileSizeState);
  const [messages, setMessages] = useRecoilState(messagesState)
  const [isSecret, setIsSecret] = useState(false)
  const [isSending, setIsSending] = useState(false)

  const buttonInnerRadius = mobileSize.width * .08;
  const buttonPadding = buttonInnerRadius / 8
  const buttonRadius = buttonInnerRadius + buttonPadding * 2;

  const width = mobileSize.width * .7
  const innerWidth = width * 9 / 10
  const padding = width / 20
  const fontSize = innerWidth / 10;


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setFile(file)
      setMediaType(file.type.startsWith("video") ? 3 : 2);
      if (file.type.startsWith("video")) {
        const videoElement = document.createElement("video")
        videoElement.src = URL.createObjectURL(file)
        videoElement.currentTime = 2
        videoElement.onloadeddata = () => {
          const canvas = document.createElement("canvas");
          canvas.width = videoElement.videoWidth
          canvas.height = videoElement.videoHeight
          const ctx = canvas.getContext("2d")
          ctx.drawImage(videoElement, 0, 0, videoElement.videoWidth, videoElement.videoHeight)
          const thumnail = dataURLtoFile(canvas.toDataURL(), 'thumbnail.png')
          const ratio = videoElement.videoHeight / videoElement.videoWidth;
          if (ratio < max_ratio) {
            const width = innerWidth
            const height = width * ratio;
            setThumnail({ src: thumnail, width, height })
          }
          else if (max_ratio <= ratio) {
            const height = innerWidth * max_ratio
            const width = height / ratio;
            setThumnail({ src: thumnail, width, height })
          }
        }
      } else if (file.name.split('.').includes('heic')) {
        heic2any({ blob: file, toType: "image/jpeg" }).then((resultBlob) => {
          const file = new File([resultBlob as Blob], "thumbnail.jpeg")
          const img = new Image();
          img.src = URL.createObjectURL(file);
          img.onload = () => {
            const ratio = img.height / img.width;
            if (ratio < max_ratio) {
              const width = innerWidth
              const height = width * ratio;
              setThumnail({ src: file, width, height })
            }
            else if (max_ratio <= ratio) {
              const height = innerWidth * max_ratio
              const width = height / ratio;
              setThumnail({ src: file, width, height })
            }
          }
        })
      } 
      else {
        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = () => {
          const ratio = img.height / img.width;
          if (ratio < max_ratio) {
            const width = innerWidth
            const height = width * ratio;
            setThumnail({ src: file, width, height })
          }
          else if (max_ratio <= ratio) {
            const height = innerWidth * max_ratio
            const width = height / ratio;
            setThumnail({ src: file, width, height })
          }
        
        }
      }
    }
  }


  const handleSubmit = async () => {
    if (!file) {
      alert("미디어 파일을 업로드 해주세요.")
      return
    }
    if (isSending) return;
    setIsSending(true);

    const message = {
      receiverId: userId!,
      type: mediaType,
      rotate: Math.random() * 20 - 10,
      top: .35,
      left: .35,
      zindex: messages.length,
      content,
      sourceFile: file,
      thumbnailFile: thumnail.src,
    }

    if (isSecret) await secretMessages_api.create(message)
    else await messages_api.create(message)
    
    const updatedMessage = await messages_api.search(userId!);
    setMessages(updatedMessage)
    navigate(`../`)
  }


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

  const tw_photo_container = [
    tw`flex justify-center items-center`,
    tw`bg-gray-900`,
    css({
      maxWidth: `${innerWidth}px`,
      minHeight: `${innerWidth * min_ratio}px`,
      maxHeight: `${innerWidth * max_ratio}px`,
      marginBottom: `${padding / 2}px`
    })
  ]
  const tw_photo = [
    css({
      width: `${thumnail?.width}px`,
      height: `${thumnail?.height}px`,
    })
  ]

  const tw_placeholder = [
    tw`bg-[rgba(1, 1, 1, .1)]`,
    tw`flex justify-center items-center`,
    css({
      fontSize: `${fontSize}px`,
      width: `${innerWidth}px`,
      height: `${innerWidth * 10 / 16}px`,
      marginBottom: `${padding / 2}px`
    })
  ]

  const tw_textarea = [
    tw`bg-transparent focus:bg-[rgba(1, 1, 1, .1)]`,
    tw`border-none outline-none resize-none`,
    tw`font-[omyuPretty] text-black`,
    css({
      fontSize: `${fontSize}px`,
      width: `${innerWidth}px`,
      height: `${innerWidth / 4}px`,
    })
  ]

  const tw_filepicker = [
    tw`z-10`,
    tw`flex justify-around items-center`,
    tw`bg-[rgba(1, 1, 1, .5)] rounded-full`,
    tw`text-white`,
    css({
      fontSize: `${fontSize*4/5}px`,
      width: `${width}px`,
      height: `${buttonRadius}px`
    })
  ]

  const tw_submit = [
    tw`z-10`,
    tw`flex justify-around items-center`,
    tw`bg-[rgba(1, 1, 1, .5)] rounded-full`,
    tw`text-white`,
    css({
      fontSize: `${fontSize*4/5}px`,
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
      <div></div>
      <label {...{ css: tw_filepicker }}>
        미디어 파일 업로드
        <input {...{
          type: "file",
          accept: `image/*, video/*`,
          css: tw`hidden`,
          id: "filepicker",
          onChange: handleFileChange
        }} />
      </label>

      <br />
      
      <article {...{ css: tw_article }}>
        <label htmlFor="filepicker">
          {
            thumnail.src
              ? <div {...{ css: tw_photo_container }}>
                < img {...{ css: tw_photo, src: URL.createObjectURL(thumnail.src) }} />
              </div>
              : <div {...{ css: tw_placeholder }}>미디어 파일 업로드</div>
          }
        </label>
        <textarea {...{
          css: tw_textarea,
          spellCheck: false,
          value: content, onChange: (e) => setContent(e.target.value)
        }}></textarea>
      </article>

      <br />
      

      <section {...{ css: tw_submit }}>
        <div {...{ css: tw`flex justify-around items-center`, }}>
          <label htmlFor="isSecretCheck">비밀편지 예약전송</label>
          <input type="checkbox" id="isSecretCheck" checked={isSecret} onChange={(e) => setIsSecret(e.target.checked)} />
        </div>
        <AiFillEdit {...{ css: [tw_button], onClick: handleSubmit }} />
      </section>
      <div></div>
    </Fragment>
  );
};
export default PolaroidForm;