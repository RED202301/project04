import { MutableRefObject, useState, useRef } from "react";
import {AiOutlineInbox, AiOutlineMail, AiOutlineHome, AiOutlineEdit, AiOutlineMenu} from "react-icons/ai"
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

  const buttonRadius = mobileSize.width * .06;
  const buttonPadding = buttonRadius/5;
  const buttonInnerRadius = buttonRadius*4/5;
  
  const [isActive, setIsActive] = useState(false);
  const tw_button = [
    tw`absolute rounded-full`,
    css({
      width: `${buttonInnerRadius}px`,
      height: `${buttonInnerRadius}px`,
      bottom:`0px`,
      transition: `
      rotate .3s ease-in-out,
      background-color .3s ease-in-out
      `,
      padding: `${buttonPadding}px`,
    })
  ]
  const isDragged = useRecoilValue(isDraggedState)
  const [handleSelect, handleUnselect] = useHandleSelect(ref);
  const handlePointerUpCapture = () => {
    if (isDragged) return
    setIsActive(isActive=>!isActive)
  }
  const path_icon_dict = {
    "./post": AiOutlineEdit,
    "./secret": AiOutlineMail, 
    "./": AiOutlineHome,
    "./mailbox": AiOutlineInbox,
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
      {Object.keys(path_icon_dict).map(
        (path, index) => {
          const Icon = path_icon_dict[path]
          const Yoffsets = [-1, -1, 1, 1]
          const Xoffsets = [-1, 1, -1, 1]
          const Yorigins = [`bottom`, `bottom`, `top`, `top`]
          const Xorigins = [`right`,`left`,`right`,`left`]
          const unit = (isActive? 2: 1)
          const tw_button = [
            tw`absolute bg-white`,
            css({
              width: `${buttonRadius*unit}px`,
              height: `${buttonRadius*unit}px`,
              transition: `
              top .3s ease-in-out,
              left .3s ease-in-out,
              width .3s ease-in-out,
              height .3s ease-in-out,
              border-radius .3s ease-in-out,
              background-color .3s ease-in-out
              `,
              backgroundColor: `rgba(255, 255, 255, .5)`,
              backdropFilter: `blur(2px)`,
              
              borderRadius: isActive
              ?`
              ${index===0?buttonRadius*unit:0}px
              ${index===1?buttonRadius*unit:0}px
              ${index===3?buttonRadius*unit:0}px
              ${index===2?buttonRadius*unit:0}px
              `
              : `
              ${buttonRadius*unit}px
              ${buttonRadius*unit}px
              ${buttonRadius*unit}px
              ${buttonRadius*unit}px
              `,
              top: isActive
                ? `${buttonRadius * Yoffsets[index]}px`
                : `${buttonInnerRadius/2}px`,
              left: isActive
                ? `${buttonRadius * Xoffsets[index]}px`
                : `${buttonInnerRadius/2}px`,

            })
          ]
          return <div {...{
            key: path,
            css: [tw_button],
            onClick: () => {
              if(!isActive) return
              setIsActive(isActive => !isActive)
              navigate(path)
            },
          }}>
            <Icon {...{
              css: css({
                width:`${buttonRadius * .9}px`,
                height:`${buttonRadius * .9}px`,
                position: `absolute`,
                transition: `
                top .3s ease-in-out,
                left .3s ease-in-out,
                bottom .3s ease-in-out,
                right .3s ease-in-out
                `,
                [Yorigins[index]]: isActive
                  ? `${buttonInnerRadius / 2}px`
                  : `0px`,
                [Xorigins[index]]: isActive
                  ? `${buttonInnerRadius / 2}px`
                  : `0px`,
              })
            }} />
          </div>
        }
      )}
      <AiOutlineMenu {...{
        onMouseDown: handleSelect,
        onTouchStart: handleSelect,
        onPointerLeave: handleUnselect,
        onPointerUpCapture:handlePointerUpCapture,
        // onTouchEndCapture:handlePointerUpCapture,

        css: [tw_button,
          isActive ? tw`bg-gray-300`: tw`bg-white`,
          css({
          top:`${buttonInnerRadius/2}px`,
          left:`${buttonInnerRadius/2}px`,
          rotate: isActive ? `90deg` : `0deg`
        })]
      }} />
    </div>
  )
}

export default FloatingButton;