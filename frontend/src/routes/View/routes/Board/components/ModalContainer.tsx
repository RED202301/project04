import { PropsWithChildren} from "react"
import { useNavigate } from "react-router-dom"
import tw from "twin.macro"

const ModalContainer = ({children, isOverlayed}:PropsWithChildren&{isOverlayed?:boolean}) => {
  const navigate = useNavigate()
  const tw_fullsize = [
    isOverlayed ? tw`z-10`:tw``,
    tw`absolute`,
    tw`w-full h-full`,
    tw`flex flex-col justify-around items-center`,
  ]
  const tw_dimmed = [
    ...tw_fullsize,
    tw`bg-[rgba(1, 1, 1, .5)]`,
  ]
  return (
    <div {...{ css: tw_fullsize }}>
      <div {...{ css: tw_dimmed, onClick: () => navigate(-1) }}></div>
      {children}
    </div>
 ) 
}

export default ModalContainer