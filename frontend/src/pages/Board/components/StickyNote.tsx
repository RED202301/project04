import React, { MouseEventHandler, TouchEventHandler } from "react";
import { useRecoilState } from "recoil";
import tw from "twin.macro";
import { isEditState, stickyNoteInfosState } from "../atoms/States";
import { StickyNoteProps } from "../atoms/Props";

const StickyNoteCSS = [tw`w-36 h-36 absolute select-none drop-shadow-md p-4 font-['Nanum Brush Script'] bg-[url("https://transparenttextures.com/patterns/polaroid.png")]`]

const StickyNote: React.FC<StickyNoteProps> = ({ children, css, onMouseDown, onTouchStart, zIndex, ...props }) => {
  
  const [isEdit] = useRecoilState(isEditState) 
  const setStickyNoteInfos = useRecoilState(stickyNoteInfosState)[1];
  const newOnMouseDown:MouseEventHandler = (e) => {
    onMouseDown(e);
    if (!isEdit) return;
    setStickyNoteInfos((stickyNoteInfos) =>
      stickyNoteInfos.map(stickyNoteInfo => {
        const newStickyNoteInfo = { ...stickyNoteInfo };
        if (newStickyNoteInfo.zIndex > zIndex) newStickyNoteInfo.zIndex -= 1;
        else if (newStickyNoteInfo.zIndex === zIndex) newStickyNoteInfo.zIndex = stickyNoteInfos.length;
        return newStickyNoteInfo
      })
    )
  }
  const newOnTouchStart:TouchEventHandler = (e) => {
    onTouchStart(e);
    if (!isEdit) return;
    setStickyNoteInfos((stickyNoteInfos) =>
      stickyNoteInfos.map(stickyNoteInfo => {
        const newStickyNoteInfo = { ...stickyNoteInfo };
        if (newStickyNoteInfo.zIndex > zIndex) newStickyNoteInfo.zIndex -= 1;
        else if (newStickyNoteInfo.zIndex === zIndex) newStickyNoteInfo.zIndex = stickyNoteInfos.length;
        return newStickyNoteInfo
      })
    )
  }
  
  return (
    <div {...{ ...props, css: [...StickyNoteCSS, ...(css ? css : [])], onMouseDown: newOnMouseDown, onTouchStart: newOnTouchStart }}>
      {children}
    </div>
  );
}

export default StickyNote;