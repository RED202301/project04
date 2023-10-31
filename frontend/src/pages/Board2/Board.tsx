import tw, { css } from "twin.macro"
import React, { useState, useEffect } from "react"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { globalStateState, isEditableState, isOnTransitionState, messageMapState, mobileSizeState, selectedMessageState} from "./recoil/atoms"
import StickyNote from "./components/StickyNote"
import messagesAPI from "./api/messagesAPI"
import ModalBackground from "./components/ModalBackGround"
import useDrag from "./hooks/useDrag"
import useHandleModal from "./hooks/useHandleModal"

import {IoAdd} from "react-icons/io5"
import { useParams } from "react-router-dom"

const front_base_URL = import.meta.env.VITE_FRONT_SERVER_URL;

const Section: React.FC = () => {
  const [msgMap, setMessageMap] = useRecoilState(messageMapState)
  const [selectedMessage, setSelectedMessage] = useRecoilState(selectedMessageState)
  const setIsEditable = useSetRecoilState(isEditableState);

  const { receiverId } = useParams()
  const [receiverName, setReceiverName] = useState('')

  const getUserNAme = async() => {
    const userName = await messagesAPI.getUserName(parseInt(receiverId));
    setReceiverName(userName)
  }

  const getAllMessages = async () => {
    const msgs = await messagesAPI.search({receiverId});
    setMessageMap(msgMap => {
      msgs.forEach(msg => msgMap.set(msg.id, msg))
      return new Map(msgMap);
    })
  }
  useEffect(() => {
    getUserNAme()
    getAllMessages()
  }, []);

  const { clientWidth, clientHeight } = useRecoilValue(mobileSizeState); const [CW, CH] = [clientWidth, clientHeight];
  const bg_board = tw`bg-orange-200 bg-[url("https://transparenttextures.com/patterns/polaroid.png")]`
  const size_mobile = css`width: ${CW}px; height: ${CH}px;`

  const BUTTON_SIZE_RATIO = 0.10;
  const tw_button = [
    tw`absolute rounded-full bg-white`,
    css`
      width: ${CW * BUTTON_SIZE_RATIO}px;
      height: ${CW * BUTTON_SIZE_RATIO}px;
      right: ${CW * BUTTON_SIZE_RATIO}px;
      bottom: ${CW * BUTTON_SIZE_RATIO}px;
    `
  ]

  const { isModalOpen } = useRecoilValue(globalStateState);
  const { openModal } = useHandleModal()
  return (
    <div {...{ css: [size_mobile, bg_board, tw`m-auto font-['IMHyeminBold']`, ] }}>
      <div {...{ css: [size_mobile, tw`absolute`] }}>
        <h1>{receiverName}</h1>
        <button {...{
          onClick: () => {
            const content = `${front_base_URL}/rolling/${receiverId}`;
            navigator.share({
              title: `[SEND2U]`,
              text: `${receiverName}님에게 글 남기기`,
              url: content
            })
        }}}>현재 링크를 클립보드에 저장</button>
        {[...msgMap.values()]
          .sort((a, b) => a.zindex - b.zindex)
          .map((msg) => <StickyNote {...{ ...msg, key: msg.id }} />)
        }
        
        {!isModalOpen && <IoAdd {...{
          css: tw_button, onClick: () => {
            openModal()
            setIsEditable(true);
            setSelectedMessage(prev=>({...prev, id:-1}));
        }}}/>}
        {isModalOpen && selectedMessage.id === -1 && <StickyNote {...{
          id: -1,
          receiverId: 1,
          top: (clientHeight / clientWidth - .8) / 2,
          left: (clientWidth / clientWidth - .8) / 2,
          rotate: Math.random() * 20 - 10,
          zindex: msgMap.size + 1,
          type: 1,
          content: "",
          bgcolor: 0,
          key: "form",
          createdAt:""
  }} />}
      </div>
    </div>
  );
}



const Board: React.FC = () => {
  const [{ clientWidth }] = useRecoilState(mobileSizeState)
  const { isModalOpen } = useRecoilValue(globalStateState)
  const isOnTransition = useRecoilValue(isOnTransitionState)
  
  const w_mobile = css`width: ${clientWidth}px`
  const bg_board = tw`bg-orange-300 bg-[url("https://transparenttextures.com/patterns/polaroid.png")]`

  const {handleDragMove, handleDragEnd } = useDrag();
  return (
    <div {...{
      css: [tw`m-auto h-screen flex`, w_mobile, bg_board],
      onMouseMove: handleDragMove,
      onMouseUp: handleDragEnd,
      onTouchMove: handleDragMove,
      onTouchEnd: handleDragEnd
    }}>
      <Section />
      {isModalOpen || isOnTransition ? <ModalBackground /> : null}
    </div>
  )
}

export default Board