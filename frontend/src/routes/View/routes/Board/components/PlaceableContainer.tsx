import useHandleSelect from "../../../../../hooks/useHandleSelect";
import {useRef, MutableRefObject, PropsWithChildren} from 'react'
import tw, { css } from "twin.macro";
import { Message_Position } from "../../../../../api/messages/types";
import { useRecoilValue } from "recoil";
import mobileSizeState from "../../../../../recoil/mobileSizeState";

const PlaceableContainer = ({messageId, top, left, rotate, children}: PropsWithChildren & Message_Position & {messageId?:number}) => {
  const ref = useRef()  as MutableRefObject<HTMLDivElement>;
  const mobileSize = useRecoilValue(mobileSizeState)
  const [handleSelect, handleUnselect] = useHandleSelect(ref, messageId);
  const tw_message_position = [
    tw`absolute`,
    tw`drop-shadow-2xl`,
    css({
      top: `${top * mobileSize.width}px`,
      left: `${left * mobileSize.width}px`,
      rotate: `${rotate}deg`,
    })
  ]

  return (
    <div {...{
      ref,
      onPointerDown: handleSelect,
      onPointerOut: handleUnselect,
      css:tw_message_position
    }}>
      {children}
    </div>
  );
}

export default PlaceableContainer