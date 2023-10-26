import React, { useRef, useState, useEffect } from "react"
import { useRecoilState } from "recoil";
import { isEditableState, mobileSizeState } from "../recoil/atoms";
import useZoom from "../hooks/useZoom";
import useDoubleTap from "../hooks/useDoubleTap";
import tw, { css } from "twin.macro";
import ModalBackground from "./ModalBackGround";
import useSelect from "../hooks/useSelect";
import { StickyNoteInfo } from "../types/types";

const StickyNote: React.FC = (_msgData) => {
  const msgData = _msgData as StickyNoteInfo;
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>;
  
  const [isRendered, setIsRendered] = useState(false);
  const [{ clientWidth, clientHeight }] = useRecoilState(mobileSizeState);
  const [isEditable] = useRecoilState(isEditableState);
  
  const { handleSelect } = useSelect(msgData.id);
  
  const {isZoomed, handleZoom} = useZoom(ref);
  const [handleDoubleTap] = useDoubleTap(handleZoom)

  const [content, setContent] = useState(msgData.content)
  
  const bgcolors = [tw`bg-yellow-300`, tw`bg-red-300`, tw`bg-blue-300`]
  const twcss = [
    tw`absolute text-7xl flex drop-shadow-md`,
    bgcolors[msgData.bgcolor],
    tw`bg-[url("https://transparenttextures.com/patterns/polaroid.png")]`,
    css`
      width: ${clientWidth * 0.8}px; 
      height: ${clientWidth * 0.8}px;
      scale: ${isZoomed ? 1 : isRendered ? .4 : 0};
      transition: 
        scale .5s ease-in-out,
        rotate .3s ease-in-out;
    `,
    css`
      -webkit-user-drag: none;
      -khtml-user-drag: none;
      -moz-user-drag: none;
      -o-user-drag: none;
      user-drag: none;
    `
  ]
  const textareaTwcss = [
    tw`
      m-auto
      bg-transparent
      resize-none outline-none select-none
      font-['Cafe24Supermagic']
    `,
    css`
      width: ${clientWidth * (0.8 - 0.096)}px; 
      height: ${clientWidth * (0.8 - 0.096)}px;
      font-size: ${clientWidth * 0.08}px;
    `,
  ];

  useEffect(() => {
    setTimeout(()=>setIsRendered(true), 100*msgData.zindex)
  }, [])

  return <>
    {isZoomed? <ModalBackground/> : null}
    <div {...{
      ref,
      css: twcss,
      style: {
        top: `${isZoomed ? (clientHeight - clientWidth * 0.8) / 2 :msgData.top * clientWidth}px`,
        left: `${isZoomed ? (clientWidth - clientWidth * 0.8) / 2 :msgData.left * clientWidth}px`,
        rotate: `${isZoomed? 0 : msgData.rotate}deg`
      },
      
      onMouseDown: handleSelect,
      onTouchStart:handleSelect,

      onDoubleClick: handleZoom,
      onTouchEnd: handleDoubleTap
    }}>
      <textarea {...{
        css: textareaTwcss,
        readOnly: isEditable ? false : true,
        value: content,
        onChange: (e) => setContent(e.target.value),
      }}></textarea>
    </div>
  </>
}

export default StickyNote