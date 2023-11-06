import { useRecoilValue } from "recoil";
import mobileSizeState from "../../../../../recoil/mobileSizeState";
import tw, { css } from "twin.macro";
import { useNavigate } from "react-router-dom";
import { isDraggedState } from "../../../../../recoil/atoms";
import { Res_Message } from "../../../../../api/messages/types";

const Polaroid = ({ id, sourceFileUrl, content, sizeRatio, isOverlayed}:Res_Message &{sizeRatio:number, isOverlayed?:boolean}) => {
  const mobileSize = useRecoilValue(mobileSizeState)

  // const buttonInnerRadius = mobileSize.width * .08;
  // const buttonPadding = buttonInnerRadius / 8
  // const buttonRadius = buttonInnerRadius + buttonPadding * 2;

  const width = mobileSize.width * sizeRatio 
  const innerWidth = width * 4 /5
  const padding = width / 10
  const fontSize = innerWidth / 10;


  const tw_article = [
    isOverlayed? tw`z-30`:tw``,
    tw`bg-white`,
    css({
      width: `${innerWidth}px`,
      padding: `${padding}px`,
      fontSize: `${fontSize}px`
    })
  ]

  const tw_photo = [
    css({
      width: `${innerWidth}px`,
      marginBottom: `${padding / 2}px`
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
    if (isDragged) return;
    navigate(`./detail/${id}`)
  }

  return (
    <article {...{
      css: tw_article,
      onMouseUpCapture:handlePointerUpCapture,
      onTouchEndCapture:handlePointerUpCapture,
    }}>
      <img {...{ src: sourceFileUrl, css: tw_photo }} />
      {content && <p {...{css:tw_p}}>{content}</p>}
    </article>
  );
}

export default Polaroid