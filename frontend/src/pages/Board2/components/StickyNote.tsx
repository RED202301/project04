import React, { useRef, useState, useEffect } from "react"
import { useRecoilState } from "recoil";
import { formVisibilityState, isAnimatedState, isEditableState, isMovableState, messagesState, mobileSizeState, selectedMessageState } from "../recoil/atoms";
import useZoom from "../hooks/useZoom";
import useDoubleTap from "../hooks/useDoubleTap";
import tw, { css } from "twin.macro";
import useSelect from "../hooks/useSelect";
import { StickyNoteInfo } from "../types/types";
import messagesAPI from "../api/messagesAPI";




const StickyNote: React.FC = (_msgData) => {
  const msgData = _msgData as StickyNoteInfo;

  const ref = useRef() as React.MutableRefObject<HTMLDivElement>;
  
  const [isRendered, setIsRendered] = useState(false);
  const [{ clientWidth, clientHeight }] = useRecoilState(mobileSizeState);
  const [isEditable] = useRecoilState(isEditableState);
  
  const { handleSelect } = useSelect(msgData.id);
  
  const [{isZoomed, messageId}] = useRecoilState(selectedMessageState)
  const { handleZoom } = useZoom();
  const [handleDoubleTap] = useDoubleTap(handleZoom)
  const [isAnimated] = useRecoilState(isAnimatedState)


  
  const [content, setContent] = useState(msgData.content)

  const [[,msgList], setMessages] = useRecoilState(messagesState)

  const bgcolors = [tw`bg-yellow-300`, tw`bg-red-300`, tw`bg-blue-300`]
  const twcss = [
    tw`absolute text-7xl flex drop-shadow-md`,
    bgcolors[msgData.bgcolor],
    tw`bg-[url("https://transparenttextures.com/patterns/polaroid.png")]`,
    css`
      width: ${clientWidth * 0.8}px; 
      min-height: ${clientWidth * 0.8}px;
      scale: ${(isZoomed && messageId === msgData.id) ? 1 : isRendered ? .4 : 0};
      transition: ${isAnimated
        ?
        `scale .5s ease-in-out,
        rotate .5s ease-in-out,
        top .5s ease-in-out, 
        left .5s ease-in-out;`
        :
        `scale .5s ease-in-out,
        rotate .3s ease-in-out;`
      }
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
      min-height: ${clientWidth * (0.8 - 0.096)}px;
      font-size: ${clientWidth * 0.08}px;
    `,
  ];

  useEffect(() => {
    setTimeout(() => setIsRendered(true), 100 * msgData.zindex)
  }, [])


  const [, setSelectedMessage] = useRecoilState(selectedMessageState);
  const [,setIsMovable] = useRecoilState(isMovableState)
  const [,setFormVisibility] =useRecoilState(formVisibilityState)
  const [,setIsEditable] = useRecoilState(isEditableState)
  const [,setIsAnimated] = useRecoilState(isAnimatedState)

  const buttonTW = tw`w-8 h-8 rounded-full bg-white`
  return <div {...{
    style: {
      position: "absolute",
      zIndex: (isZoomed || isAnimated) && messageId === msgData.id ? 1 : 0
    }
  }}>
    {isEditable && messageId === msgData.id
      ? <div {...{
        css: buttonTW, onClick: () => {
          (async () => {
            const msg = await messagesAPI.create(
              {
                receiverId: 1,
                top: (clientHeight/clientWidth - .8) / 2,
                left: (clientWidth/clientWidth - .8) / 2,
                rotate: Math.random() *20-10,
                zindex: msgList.length+1,
                type: 1,
              
                content,
                bgcolor: 1,
              }
            )
            setMessages(([msgMap]) => {
              msgMap.set(msg.id, msg);
              return [msgMap, [...msgMap.values()]]
            })


            setSelectedMessage(prev => ({ ...prev, isZoomed: false }))
            setIsMovable(() => true);
            setIsAnimated(() => true);
            setFormVisibility(() => false);
            setIsEditable(()=>false)
            setTimeout(() => {
              setIsAnimated(()=>false);
            }, 500);
          })()
          
      } }}>생성</div> : null}
    <div {...{
      ref,
      css: [...twcss],
      style: {
        top: `${(isZoomed && messageId === msgData.id) ? (clientHeight - clientWidth * 0.8) / 2 :msgData.top * clientWidth}px`,
        left: `${(isZoomed && messageId === msgData.id) ? (clientWidth - clientWidth * 0.8) / 2 :msgData.left * clientWidth}px`,
        rotate: `${(isZoomed && messageId === msgData.id) ? 0 : msgData.rotate}deg`,  
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
        placeholder:"내용을 입력해주세용.\n(공백 포함 최대 60자)",
        onChange: (e) => setContent(e.target.value),
      }}/>
    </div>
  </div>
}

export default StickyNote