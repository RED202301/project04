import { PropsWithChildren} from "react"
import { useNavigate } from "react-router-dom"
import { useRecoilValue } from "recoil"
import tw, { css } from "twin.macro"
import mobileSizeState from "../../../../../recoil/mobileSizeState"

const ModalContainer = ({children, isOverlayed}:PropsWithChildren&{isOverlayed?:boolean}) => {
  const navigate = useNavigate()
  // const tw_header = [
  //   isOverlayed ? tw`z-20`:tw`z-10`,
  //   tw`bg-white w-full`,
  //   tw`bg-[rgba(1, 1, 1, .5)]`,
  // ]

  const mobileSize = useRecoilValue(mobileSizeState)
  const tw_mobilesize = [
    css({width: `${mobileSize.width}px`, height:`${mobileSize.height}px`})
  ]
  const tw_fullsize = [
    tw`w-full`,
    css({
      height:`${window.innerHeight * 2}px`
    })
  ]
  const tw_container = [
    isOverlayed ? tw`z-10`:tw``,
    // tw`flex flex-col flex-wrap justify-around items-center`,
    tw`flex flex-col justify-center items-center`,
  ]
  const tw_dimmed = [
    isOverlayed ? tw`z-10`:tw``,
    tw`bg-[rgba(1, 1, 1, .5)]`,
    css({
      backdropFilter:`blur(2px)`
    })
  ]
  const tw_abs = tw`absolute`
  return (
    <div {...{ css: [tw_container, tw_mobilesize, tw_abs] }}>
      <div {...{
        css: [
          tw_container,
          // tw`w-full h-screen`,
          tw_mobilesize,
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