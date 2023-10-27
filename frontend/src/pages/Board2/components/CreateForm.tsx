import { useRecoilState } from "recoil";
import { formVisibilityState, isEditableState, isMovableState, selectedMessageState } from "../recoil/atoms";


const WriteButton: React.FC = () => {
  const [, setSelectedMessage] = useRecoilState(selectedMessageState);
  const [, setIsMovable] = useRecoilState(isMovableState);
  const [, setFormVisibility] = useRecoilState(formVisibilityState);
  const [, setIsEditable] = useRecoilState(isEditableState)
  return <div {...{
    onClick: () => {
      setSelectedMessage(prev => ({ ...prev, isZoomed: true, messageId: -1 }))
      setIsMovable(() => false);
      setFormVisibility(() => true)
      setIsEditable(()=>true)
  }}}>생성</div>
}

export {WriteButton}