import { PropsWithChildren} from "react"
import { useNavigate } from "react-router-dom"
import { useRecoilValue } from "recoil"
import tw, { css } from "twin.macro"
import mobileSizeState from "../../../../../recoil/mobileSizeState"

const ModalContainer = ({children, isOverlayed}:PropsWithChildren&{isOverlayed?:boolean}) => {
  const mobileSize = useRecoilValue(mobileSizeState)
  const navigate = useNavigate()
  const tw_header = [
    isOverlayed ? tw`z-20`:tw`z-10`,
    tw`bg-white w-full`,
    tw`bg-[rgba(1, 1, 1, .5)]`,
    css`height: ${mobileSize.width * 0.12}px;`
  ]
  const tw_fullsize = [
    tw`w-full`,
    css({
      height:`${mobileSize.height - mobileSize.width * .12}px`
    })
  ]
  const tw_container = [
    isOverlayed ? tw`z-10`:tw``,
    tw`flex flex-wrap justify-around items-center`,
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
      <div {...{ css: tw_header }}></div>
      <div {...{
        css: [
          tw_container,
          tw`w-full`,
          css`height: ${mobileSize.height - mobileSize.width * .12}px`,
          css`
            white-space:pre-wrap;
            ::-webkit-scrollbar { display: none; }
            -ms-overflow-style: none;
            scrollbar-width: none;
          `,
          css({ overflowY: 'scroll' })
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