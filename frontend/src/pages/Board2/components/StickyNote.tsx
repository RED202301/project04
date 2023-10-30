import React, { useState, useEffect } from "react"
import { useRecoilValue } from "recoil";
import { mobileSizeState } from "../recoil/atoms";
import useDoubleTap from "../hooks/useDoubleTap";
import tw, { css } from "twin.macro";
import useSelect from "../hooks/useSelect";
import { StickyNoteInfo } from "../types/types";
import useHandleModal from "../hooks/useHandleModal";
import useMessageComponentState from "../hooks/useMessageComponentState";
import useHandleDelete from "../hooks/useHandleDelete";
import useHandleCreate from "../hooks/useHandleCreate";
import {IoTrashOutline, IoCreateOutline} from "react-icons/io5"

const WIDTH_RATIO = 0.8;
const HEIGHT_RATIO = WIDTH_RATIO;
const PADDING_RATIO = 0.06;
const FONT_SIZE_RATIO = 0.07;
const BUTTON_SIZE_RATIO = 0.10;

const StickyNote: React.FC = (_msgData) => {
  const msgData = _msgData as StickyNoteInfo;
  

  const [isRendered, setIsRendered] = useState(false);
  const { isFocused, isAnimated, isDragged, isEditable } = useMessageComponentState(msgData.id);
  
  const { clientWidth, clientHeight } = useRecoilValue(mobileSizeState);
  const [CW, CH] = [clientWidth, clientHeight]
  const WIDTH = CW * WIDTH_RATIO;
  const HEIGHT = CW * HEIGHT_RATIO;
  const FONT_SIZE = CW * FONT_SIZE_RATIO;
 

  const [content, setContent] = useState(msgData.content)
  const [bgcolorIndex, setBgcolorIndex] = useState(msgData.bgcolor);

  const tw_zindex= css`z-index: ${isAnimated || isFocused ? 1 : 0};`
  
  
  const tw_bgcolors = [tw`bg-yellow-300`, tw`bg-red-300`, tw`bg-blue-300`, tw`bg-green-300`] 
  const tw_texture = tw`bg-[url("https://transparenttextures.com/patterns/polaroid.png")]`
  const tw_msg = [
    tw`absolute text-7xl flex`,
    tw_bgcolors[bgcolorIndex],
    tw_zindex,
    tw_texture,
    isDragged ? tw`drop-shadow-2xl` : tw`drop-shadow-md`,
    css`
      width: ${WIDTH}px; 
      min-height: ${HEIGHT}px;
      scale: ${isRendered ? isFocused ? 1 : .4 : 0};
    `,
    css`
      top: ${isFocused ? (CH - HEIGHT) / 2 : msgData.top * CW}px;
      left: ${isFocused ? (CW - WIDTH) / 2 : msgData.left * CW}px;
      rotate: ${isFocused ? 0 : msgData.rotate}deg;
    `,
    css`
      transition:
      background-color .3s ease-in-out,
      scale .5s ease-in-out, rotate .5s ease-in-out, filter .5s ease-in-out
      ${isAnimated && `, top .5s ease-in-out, left .5s ease-in-out`};
    `,
    css`
      -webkit-user-drag: none;
      -khtml-user-drag: none;
      -moz-user-drag: none;
      -o-user-drag: none;
      user-drag: none;
    `
  ]

  const tw_content = [
    tw`m-auto bg-transparent resize-none outline-none select-none`,
    tw_zindex,
    css`
      width: ${WIDTH * (1 - PADDING_RATIO * 2)}px; 
      min-height: ${HEIGHT * (1 - PADDING_RATIO * 2)}px;
      font-size: ${FONT_SIZE}px;
    `,
  ]

  const tw_button = [
    tw`rounded-full bg-white`,
    tw_zindex,
    css`
      width: ${CW * BUTTON_SIZE_RATIO}px;
      height: ${CW * BUTTON_SIZE_RATIO}px;
    `
  ]

  const tw_bottom_right = css`
    right: ${CW * BUTTON_SIZE_RATIO}px;
    bottom: ${CW * BUTTON_SIZE_RATIO}px;
  `

  useEffect(() => {
    setTimeout(() => setIsRendered(true), 50* msgData.zindex)
    // if (isEditable) setTimeout(() => setIsRendered(true), 100)
    // else setTimeout(() => setIsRendered(true), 100 * msgData.zindex)
  }, [])
  


  const handleCreate = useHandleCreate();
  const handleDelete = useHandleDelete(msgData.id);
  const handleSelect = useSelect(msgData.id);
  const { toggleModal } = useHandleModal();
  const handleDoubleTap = useDoubleTap(toggleModal)

  const [date, time] = (msgData.createdAt || "aa").split("T")
  const [year, mon, day] = (date||"").split("-")
  const [hour, min] = (time||"").split(":")

  return <>
      {isFocused && isEditable && <>
      <IoCreateOutline {...{
        css: [tw_button, tw_bottom_right, tw`absolute`],
        onClick: () =>{ handleCreate({ content, bgcolor: bgcolorIndex }) }
      }} />
      <div {...{
        css: [
          tw`absolute flex place-content-around`,
          css`
            width: ${CW}px;
            heigth: ${CW * BUTTON_SIZE_RATIO}px;
            top: ${CH*(1 - WIDTH_RATIO)/2}px;
          `]
        }}>
          {tw_bgcolors
            .map((tw_bgcolor, index) => <label {...{
              css: [ tw_button, tw_bgcolor, tw_texture ]
            }}>
              <input {...{
                css: tw`hidden`,
                type: "radio", name: "bgcolor", onClick: () => setBgcolorIndex(index)
              }} />
            </label>)}
        </div>
      </>}
      {isFocused && !isEditable && <IoTrashOutline {...{
        css: [tw_button, tw_bottom_right, tw`absolute`],
        onClick: handleDelete
      }} />}
    
      <div {...{
        css: tw_msg,
        onMouseDown: handleSelect,
        onTouchStart: handleSelect,
        onDoubleClick: !isEditable ? toggleModal : undefined,
        onTouchEnd: !isEditable ? handleDoubleTap : undefined
      }}>
        {isEditable
          ? <>
            <textarea {...{
              css: tw_content, value: content,
              placeholder: "내용을 입력해주세용.\n(공백 포함 최대 60자)",
              onChange: (e) => setContent(e.target.value),
            }} />
          </>
          : <div {...{ css: tw_content }}>{content}</div>
        }
      </div>
      {isFocused && !isEditable && <>
        <div {...{ css: [tw`absolute bg-white`, tw_zindex] }}>
          <div>작성자: {msgData.senderId} </div>
          <div>작성 날짜: {`${year}년 ${mon}월 ${day}일`} </div>
          <div>작성 시간: {`${hour}시 ${min}분`} </div>
        </div>
      </>}
  </>
}
export default StickyNote