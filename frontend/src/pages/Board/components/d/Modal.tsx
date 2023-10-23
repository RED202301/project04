import { useRecoilState } from "recoil"
import { placeableInfoListState, windowSizeState } from "../../recoil/atoms"
import tw, { css } from "twin.macro"
import Placeable from "../Placeable"
import Ratio from "../../Styles/ratios"

`포스트잇 작성 모달
전체보기 모달
  - 무작위
  - 검색 (작성자, 타입, 태그)
  - 순서
  - tag
  page 기준으로 ratio

편지작성`

const ModalComponent: React.FC = () => {
  const [{ width, height }] = useRecoilState(windowSizeState)
  const [placeableInfoList] = useRecoilState(placeableInfoListState)
  return <section
    {...{
      css: [
        tw`absolute`,
        css`
          background-color: rgba(1, 1, 1, .5)
        `
      ],
      style: {
        width,
        height,
      }
    }}
  >
    {[...placeableInfoList]
      .sort((a,b)=>a.zindex-b.zindex)
      .map((placeableInfo) => {
        return <div
          {...{
            style: {
              height: Ratio.modal.height * width
            }
          }}
        >
          <Placeable {...{ ...placeableInfo, key: placeableInfo.id }}></Placeable>
        </div>
        
    })}
  </section>
}

export default ModalComponent