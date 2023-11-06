import useHandleSelect from "../../../../../hooks/useHandleSelect";
import {useRef, MutableRefObject, PropsWithChildren} from 'react'
import tw, { css } from "twin.macro";
import { Message_Position } from "../../../../../api/messages/types";
import { useRecoilValue } from "recoil";
import mobileSizeState from "../../../../../recoil/mobileSizeState";
import { selectedMessageIdState } from "../../../../../recoil/atoms";

const PlaceableContainer = ({messageId, top, left, rotate, children}: PropsWithChildren & Message_Position & {messageId?:number}) => {
  const ref = useRef()  as MutableRefObject<HTMLDivElement>;
  const mobileSize = useRecoilValue(mobileSizeState)
  const [handleSelect, handleUnselect] = useHandleSelect(ref, messageId);
  const selectedMessageId = useRecoilValue(selectedMessageIdState)
  const tw_message_position = [
    tw`absolute`,
    tw`drop-shadow-2xl`,
    css({
      top: `${top * mobileSize.width}px`,
      left: `${left * mobileSize.width}px`,
      rotate: `${rotate}deg`,
      filter: selectedMessageId === messageId
        ? `drop-shadow(0 25px 25px rgb(0 0 0 / 0.15))`
        : `drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06))`,
      transition: `rotate .5s ease-in-out, filter .5s ease-in-out`
    })
  ]

  return (
    <div {...{
      ref,
      onMouseDown: handleSelect,
      onTouchStart: handleSelect,

      onMouseLeave: handleUnselect,
      onTouchCancel: handleUnselect,
      
      css:tw_message_position
    }}>
      {children}
    </div>
  );
}

export default PlaceableContainer