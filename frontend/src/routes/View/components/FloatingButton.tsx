import { MutableRefObject, useState, useRef } from "react";
import {AiOutlineInbox, AiOutlineHome, AiOutlineEdit, AiOutlineMenu} from "react-icons/ai"
import { useNavigate } from "react-router-dom";
import tw, { css } from "twin.macro";
import useHandleSelect from "../../../hooks/useHandleSelect";
import { useRecoilValue } from "recoil";
import { isDraggedState } from "../../../recoil/atoms";
import mobileSizeState from "../../../recoil/mobileSizeState";

const FloatingButton = () => {
  const ref = useRef() as MutableRefObject<HTMLDivElement>;
  const mobileSize = useRecoilValue(mobileSizeState);

  const navigate = useNavigate();

  const buttonInnerRadius = mobileSize.width * .08;
  const buttonPadding = buttonInnerRadius / 8;
  const buttonRadius = buttonInnerRadius + buttonPadding*2;
  
  const [isActive, setIsActive] = useState(false);
  const tw_button = [
    tw`absolute bg-white rounded-full`,
    css({
      width: `${buttonInnerRadius}px`,
      height: `${buttonInnerRadius}px`,
      bottom:`0px`,
      transition: `rotate .3s ease-in-out, right .3s ease-in-out`,
      padding: `${buttonPadding}px`,
    })
  ]
  const isDragged = useRecoilValue(isDraggedState)
  const handleSelect = useHandleSelect(ref);
  const handleClick = () => {
    if (isDragged) return
    setIsActive(isActive=>!isActive)
  }

  return (
    <div {...{
      ref, css: [tw`absolute`, css({
        height: `${buttonRadius * 1}px`,
      })],
      style: {
        top: `${mobileSize.height - buttonRadius * 3}px`,
        left: `${mobileSize.width - buttonRadius}px`,
      }
    }}>
      <AiOutlineInbox {...{
        css: [tw_button, css({ ["right"]: isActive? `${buttonRadius*3}px` : `0px`})],
        onClick: () => {
          setIsActive(isActive => !isActive)
          navigate("./mailbox")
        },
    }} />
      <AiOutlineHome {...{
        css: [tw_button, css({ ["right"]: isActive?`${buttonRadius*2}px`:`0px`})],
        onClick: () => {
          setIsActive(isActive => !isActive)
          navigate("./")
        },
    }} />
      <AiOutlineEdit {...{
        css: [tw_button, css({ ["right"]: isActive?`${buttonRadius*1}px`:`0px`})],
        onClick: () => {
          setIsActive(isActive => !isActive)
          navigate("./post")
        },
    }} />

      <AiOutlineMenu {...{
        onMouseDown: handleSelect,
        onTouchStart: handleSelect,
        onMouseUp: handleClick,
        onTouchEnd: handleClick,
        css: [tw_button, css({ ["right"]: `0px`, rotate: isActive? `90deg`:`0deg`})]
      }} />
    </div>
  )
}

export default FloatingButton;