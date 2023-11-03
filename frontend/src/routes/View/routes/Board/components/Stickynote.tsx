import { useRecoilValue } from "recoil";
import mobileSizeState from "../../../../../recoil/mobileSizeState";
import tw, { css } from "twin.macro";
import { isDraggedState } from "../../../../../recoil/atoms";
import { useNavigate } from "react-router-dom";


const Stickynote = ({ id, bgcolor, content, sizeRatio, isOverlayed}:Res_Message &{sizeRatio:number, isOverlayed?:boolean}) => {
  
  const mobileSize = useRecoilValue(mobileSizeState)
  const bgcolors = [tw`bg-yellow-200`, tw`bg-red-200`, tw`bg-blue-200`, tw`bg-green-200`]

  // const buttonInnerRadius = mobileSize.width * .08;
  // const buttonPadding = buttonInnerRadius / 8
  // const buttonRadius = buttonInnerRadius + buttonPadding * 2;

  const innerWidth = mobileSize.width * sizeRatio
  const padding = innerWidth / 8
  // const width = innerWidth + padding * 2
  const fontSize = innerWidth / 10;


  const tw_article = [
    isOverlayed? tw`z-30`:tw``,
    bgcolors[bgcolor],
    css({
      width: `${innerWidth}px`,
      height: `${innerWidth}px`,
      padding: `${padding}px`,
      fontSize: `${fontSize}px`
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
      width:innerWidth,
      height: innerWidth,
      overflowY:"scroll"
    })
  ]

  const navigate = useNavigate()
  const isDragged = useRecoilValue(isDraggedState);
  const handleClick = () => {
    if (isDragged) return;
    navigate(`./detail/${id}`)
  }
  return (
    <article {...{
      css: tw_article,
      onMouseUp: handleClick,
      onTouchEnd: handleClick,
    }}>
      <p {...{css:tw_p}}>{content}</p>
    </article>
  );
}

export default Stickynote