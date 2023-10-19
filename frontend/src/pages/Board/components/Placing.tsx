import { PlacingProps } from "../types/types";
import { useOnDragStart } from "../hooks";

const Placing: React.FC<PlacingProps> = ({ children, id, top, left, rotate, twStyles }) => {
  const onDragStart = useOnDragStart(id);
  return <div

    {...{
      onMouseDown:onDragStart,
      onTouchStart: onDragStart,
      css:[ ...twStyles ],
      style: {top, left, transform:`rotate(${rotate}deg)`},
  }}
  >{children}</div>
}

export default Placing