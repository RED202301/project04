import { PropsWithChildren} from "react"
import { useNavigate } from "react-router-dom"
import tw, { css } from "twin.macro"

const ModalContainer = ({children, isOverlayed}:PropsWithChildren&{isOverlayed?:boolean}) => {
  const navigate = useNavigate()
  // const tw_header = [
  //   isOverlayed ? tw`z-20`:tw`z-10`,
  //   tw`bg-white w-full`,
  //   tw`bg-[rgba(1, 1, 1, .5)]`,
  // ]
  const tw_fullsize = [
    tw`w-full h-screen`,
    // css({
    //   height:`${mobileSize.height - mobileSize.width * .12}px`
    // })
  ]
  const tw_container = [
    isOverlayed ? tw`z-10`:tw``,
    // tw`flex flex-col flex-wrap justify-around items-center`,
    tw`flex flex-col justify-center items-center`,
  ]
  const tw_dimmed = [
    ...tw_container,
    tw`bg-[rgba(1, 1, 1, .5)]`,
    css({
      backdropFilter:`blur(2px)`
    })
  ]
  const tw_abs = tw`absolute`
  return (
    <div {...{ css: [tw_container, tw_fullsize, tw_abs] }}>
      <div {...{
        css: [
          tw_container,
          tw`w-full h-screen`,
        ]
      }}>
        <div {...{
          css: [tw_dimmed, tw_fullsize, tw_abs],
          onPointerUpCapture: () => {
            navigate(-1)
          },
        }}> 
        </div>
        {children}
      </div>
    </div>
 ) 
}

export default ModalContainer