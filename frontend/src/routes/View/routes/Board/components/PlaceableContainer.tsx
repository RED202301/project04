import useHandleSelect from "../../../../../hooks/useHandleSelect";
import {useRef, MutableRefObject, PropsWithChildren} from 'react'
import tw from "twin.macro";

const PlaceableContainer = ({children}:PropsWithChildren) => {
  const ref = useRef()  as MutableRefObject<HTMLDivElement>;
  const handleSelect = useHandleSelect(ref);
  

  return (
    <div {...{
      ref,
      onMouseDown: handleSelect,
      onTouchStart: handleSelect,
      css:tw`absolute`
    }}>
      {children}
    </div>
  );
}

export default PlaceableContainer