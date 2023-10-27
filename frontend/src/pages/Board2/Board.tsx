import MobileScreen from "./MobileScreen"
import tw, { css } from "twin.macro"
import React, { useEffect } from "react"
import { useRecoilState } from "recoil"
import { formVisibilityState, isAnimatedState, messagesState, mobileSizeState, selectedMessageState} from "./recoil/atoms"
import StickyNote from "./components/StickyNote"
import useDrag from "./hooks/useDrag"
import messagesAPI from "./api/messagesAPI"
import ModalBackground from "./components/ModalBackGround"
import { WriteButton } from "./components/CreateForm"



const Section: React.FC = () => {
  const [[,msgList], setMessages] = useRecoilState(messagesState)
  const [{ clientWidth, clientHeight }] = useRecoilState(mobileSizeState)
  const bgTwcss = [
    tw`bg-orange-200`,
    tw`bg-[url("https://transparenttextures.com/patterns/polaroid.png")]`,
  ]
  const twcss = [css`width: ${clientWidth}px; height: ${clientHeight}px;`]
 
  useEffect(() => {
    (async () => {
      const msgs = await messagesAPI.getAll();
      setMessages(([msgMap]) => {
        msgs?.forEach(msg => msgMap.set(msg.id, msg))
        return [msgMap, [...msgMap.values()]]
      })
    })();
  }, [])
  const {handleDragMove, handleDragEnd } = useDrag();
  const [formVisibility] = useRecoilState(formVisibilityState)
  return (
    <div {...{ css: [...twcss, ...bgTwcss, tw`m-auto`] }}>
      <div {...{
        css: [...twcss, tw`absolute`],
        onMouseMove: handleDragMove,
        onMouseUp: handleDragEnd,
        onTouchMove: handleDragMove,
        onTouchEnd: handleDragEnd
      }}>
      <WriteButton/>
        { [...msgList]
            .sort((a, b) => a.zindex - b.zindex)
            .map((msg) => <StickyNote {...{ ...msg, key: msg.id }} />)
        }
        
        {formVisibility ? <StickyNote {...{
          ...msgList[0],
          key: "form",
          id: -1,
          zindex: 0,
          content:"",
          top: (clientHeight / clientWidth - .8) / 2,
          left: (clientWidth / clientWidth - .8) / 2,
        }} /> : null}
      </div>
    </div>
  );
}



const Board: React.FC = () => {
  const [{ clientWidth }] = useRecoilState(mobileSizeState)
  const [{ isZoomed }] = useRecoilState(selectedMessageState);
  const [isAnimated] = useRecoilState(isAnimatedState)
  const twcss = [
    tw`m-auto h-screen bg-orange-200 flex`,
    tw`bg-[url("https://transparenttextures.com/patterns/polaroid.png")]`,
    css`width: ${clientWidth}px`];
  return <MobileScreen>
    <div {...{css: twcss}}>
      <Section />
    </div>
    {isZoomed || isAnimated ? <ModalBackground /> : null}
  </MobileScreen>
}

export default Board