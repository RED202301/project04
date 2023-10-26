import MobileScreen from "./MobileScreen"
import tw, { css } from "twin.macro"
import React, { useEffect } from "react"
import { useRecoilState } from "recoil"
import { messagesState, mobileSizeState} from "./recoil/atoms"
import StickyNote from "./components/StickyNote"
import useDrag from "./hooks/useDrag"
import messagesAPI from "./api/messagesAPI"

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
  return (
    <div {...{ css: [...twcss, ...bgTwcss, tw`m-auto`] }}>
      <div {...{
        css: [...twcss, tw`absolute`],
        onMouseMove: handleDragMove,
        onMouseUp: handleDragEnd,
        onTouchMove: handleDragMove,
        onTouchEnd: handleDragEnd
      }}>
        { [...msgList]
            .sort((a, b) => a.zindex - b.zindex)
            .map((msg) => <StickyNote {...{ ...msg, key: msg.id }} />)
        }
      </div>
    </div>
  );
}

const ModalComponent: React.FC = () => {

  return (
    <>
      {/* {isZoomed ? <ModalBackground /> : null}
      {messageId? <StickyNote {...{...msgMap.get(messageId!)!}} /> : null} */}
  </>
  )
}

const Board: React.FC = () => {
  const [{ clientWidth }] = useRecoilState(mobileSizeState)
  const twcss = [
    tw`m-auto h-screen bg-orange-200 flex`,
    tw`bg-[url("https://transparenttextures.com/patterns/polaroid.png")]`,
    css`width: ${clientWidth}px`];
  return <MobileScreen>
    <div {...{css: twcss}}>
      <Section/>
    </div>
    <ModalComponent/>
  </MobileScreen>
}

export default Board