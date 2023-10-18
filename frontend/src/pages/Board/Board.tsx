import React, { useState, MouseEventHandler, TouchEventHandler } from "react";
import { useRecoilState } from "recoil";
import tw from "twin.macro";
import PolaroidInfo from "./components/PolaroidInfo";
import FontStyles from "./styles/FontStyles";
import { PropsWithChildrenAndCSS } from "./atoms/Props";
import { isEditState, stickyNoteInfosState } from "./atoms/States";
import Polaroid from "./components/Polaroid";

interface SelectedInfo{
  target?: HTMLElement;
  offsetTop: number;
  offsetLeft: number;
  startX: number;
  startY: number;
}

const RoundButton: React.FC<PropsWithChildrenAndCSS> = ({ children, css, ...props }) => {
  return <button {...{...props, css: [tw`rounded-full select-none`, css] }}>{children}</button>
}

const Board: React.FC = () => {

  const [selected, setSelected] = useState<SelectedInfo>();
  const [isEdit, setIsEdit] = useRecoilState(isEditState) 
  const [stickyNoteInfos , setStickyNoteInfos]= useRecoilState(stickyNoteInfosState);

  const onTouchStart: TouchEventHandler = (event) => {
    const { pageX, pageY, target } = event.targetTouches[0];
    if (!isEdit || !(target instanceof HTMLElement)) return;
    const { offsetTop, offsetLeft } = target;
    setSelected(() => { return { target, offsetTop, offsetLeft, startX: pageX, startY: pageY } });
  }

  const onMouseDown: MouseEventHandler = ({ pageX, pageY, target }) => {
    if (!isEdit || !(target instanceof HTMLElement)) return;
    const {offsetTop, offsetLeft} = target
    setSelected(() => { return { target, offsetTop, offsetLeft, startX: pageX, startY: pageY } });
  };
  
  const onMouseMove: MouseEventHandler = ({ pageX, pageY }) => {
    if (!isEdit || !selected?.target) return;
    const { target, offsetTop, offsetLeft, startX, startY } = selected;
    target.style.top = `${offsetTop + pageY - startY}px`; 
    target.style.left = `${offsetLeft + pageX - startX}px`;
  };

  const onTouchMove: TouchEventHandler = (event) => {
    const { pageX, pageY} = event.targetTouches[0];
    if (!isEdit || !selected?.target) return;
    const { target, offsetTop, offsetLeft, startX, startY } = selected;
    target.style.top = `${offsetTop + pageY - startY}px`; 
    target.style.left = `${offsetLeft + pageX - startX}px`;
  };


  const onMouseUp: MouseEventHandler = () => setSelected((selected) => {
    if (!isEdit || !selected?.target) return selected;
    selected.target.style.transform = `rotate(${Math.random() * 10 - 5}deg)`
    return undefined;
  });

  const onTouchEnd: TouchEventHandler = () => setSelected((selected) => {
    if (!isEdit || !selected?.target) return selected;
    selected.target.style.transform = `rotate(${Math.random() * 10 - 5}deg)`
    return undefined;
  });

  return (
    <div {...{
      onMouseMove, onMouseUp,
      onTouchMove, onTouchEnd,
      css: [tw`w-screen h-screen bg-orange-200 bg-[url("https://transparenttextures.com/patterns/cardboard.png")]`],
    }}>
      <FontStyles/>
      {[...stickyNoteInfos]
        .sort((a, b)=>a.zIndex-b.zIndex)
        .map(({ content, css, id, zIndex, imgUrl }) =><Polaroid {...{ key: id, onMouseDown, onTouchStart, css: [...[css, isEdit ? tw`hover:cursor-move` : tw``]], zIndex, imgUrl }}>{content}</Polaroid>
      )}
      <RoundButton {...{
        css: [tw`absolute bg-gray-300 p-5 bottom-20 right-40`],
        onClick: () => { setStickyNoteInfos(prev=>[...prev, new PolaroidInfo({content:"새거"})]) }
      }}>
        생성
      </RoundButton>
      <RoundButton {...{
        css: [tw`absolute bg-gray-300 p-5 bottom-20 right-20`],
        onClick: () => { setIsEdit(isEdit => !isEdit) }
      }}>
        {isEdit? "편집모드" : "읽기모드"}
      </RoundButton>
    </div>
  );
};

export default Board;
