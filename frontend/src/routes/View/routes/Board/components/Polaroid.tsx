import { useRecoilValue } from "recoil";
import mobileSizeState from "../../../../../recoil/mobileSizeState";
import tw, { css } from "twin.macro";
import { useNavigate } from "react-router-dom";
import { isDraggedState } from "../../../../../recoil/atoms";
import { Res_Message } from "../../../../../api/messages/types";
import {useState, useEffect} from "react"

const min_ratio = 10 / 16
const max_ratio = 16 / 10

const Polaroid = ({ id, sourceFileUrl, thumbnailFileUrl, content, sizeRatio, isOverlayed, type}:Res_Message &{sizeRatio:number, isOverlayed?:boolean}) => {
  const mobileSize = useRecoilValue(mobileSizeState)

  // const buttonInnerRadius = mobileSize.width * .08;
  // const buttonPadding = buttonInnerRadius / 8
  // const buttonRadius = buttonInnerRadius + buttonPadding * 2;
  const [image, setImage] = useState<{ url: string, width: number, height: number }>();


  const width = mobileSize.width * sizeRatio 
  const innerWidth = width * 4 /5
  const padding = width / 10
  const fontSize = innerWidth / 10;


  const tw_article = [
    isOverlayed? tw`z-30`:tw``,
    tw`bg-white text-black`,
    css({
      width: `${innerWidth}px`,
      padding: `${padding}px`,
      fontSize: `${fontSize}px`
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
    tw`select-none`,
    css({
      width: `${image?.width}px`,
      height: `${image?.height}px`,
    })
  ]

  const tw_p = [
    css`
    white-space:pre-wrap;
    ::-webkit-scrollbar { display: none; }
    -ms-overflow-style: none;
    scrollbar-width: none;
    `,
    css({
      width: `${innerWidth}px`,
      height: `${innerWidth/4}px`,
      overflowY:"scroll"
    })
  ]
  const navigate = useNavigate()
  const isDragged = useRecoilValue(isDraggedState);
  const handlePointerUpCapture = () => {
    if (isDragged || isOverlayed) return;
    navigate(`./detail/${id}`)
  }

  useEffect(() => {
    const img = new Image()
    img.src = thumbnailFileUrl
    img.onload = () => {
      const ratio = img.height/img.width;
      if (ratio < min_ratio) {
        const width = innerWidth
        const height = width * ratio;
        setImage({url:sourceFileUrl, width, height})
      }
      else if (ratio < max_ratio) {
        const width = innerWidth
        const height = width * ratio;
        setImage({url:sourceFileUrl, width, height})
      }
      else if (max_ratio < ratio) {
        const height = innerWidth * max_ratio
        const width = height / ratio;
        setImage({url:sourceFileUrl, width, height})
      }
    }
  }, [innerWidth])

  if (image)
    return (
      <article {...{
        css: tw_article,
        onPointerUpCapture: handlePointerUpCapture,
        // onMouseUpCapture:handlePointerUpCapture,
        // onTouchEndCapture:handlePointerUpCapture,
      }}>
        <div {...{ css: tw_photo_container }}>
          {isOverlayed
            ? (type === 3
              ? < video {...{ css: tw_photo, src: sourceFileUrl, autoPlay:true, controls:true, }} />
              : < img {...{ css: tw_photo, src: sourceFileUrl }} />
            )
            : < img {...{ css: tw_photo, src: thumbnailFileUrl }} />
          }
          
        </div>
        {content && <p {...{ css: tw_p }}>{content}</p>}
      </article>
    );
}

export default Polaroid