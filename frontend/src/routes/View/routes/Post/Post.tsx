import { Link, useNavigate } from "react-router-dom"
import tw, { css } from "twin.macro"
import { Fragment, useEffect } from "react"
import { useRecoilValue } from "recoil"
import mobileSizeState from "../../../../recoil/mobileSizeState"
import {BsPencilFill, BsCameraFill} from 'react-icons/bs'

const Post = () => {
  const navigate = useNavigate()
  const mobileSize = useRecoilValue(mobileSizeState);
  const fontSize = css({ fontSize: `${mobileSize.width * .05}px` })
  useEffect(() => {
    if (! window.localStorage.getItem('accessToken')){
      alert('로그인 유저만 메세지를 작성할 수 있습니다.')
      navigate(-1);
    }
  }, [])
  const tw_header = [
    tw`flex text-center items-center z-10 text-white `,
    css`
    height: ${mobileSize.width * 0.12}px;
    font-size: ${mobileSize.width * 0.04}px;
    `
  ]
  const tw_link = [
    tw`w-[80%] h-[20%] bg-white z-10 flex justify-around items-center rounded-md text-black hover:text-black`,
    css`
      box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset
    `
  ];
  const tw_container = [
    tw`w-full flex-1 flex flex-col flex-wrap justify-around items-center`,
  ]
  const Memo = BsPencilFill
  const Camera = BsCameraFill
  return (
    <Fragment>
      <div {...{ css: tw_header }}>메세지 작성</div>
      <div {...{ css: tw_container }}>
        <div></div>
        <Link {...{ to: "../stickynote", css: [tw_link, fontSize] }}>
          <div css={tw`flex`}><Memo css={tw`mr-2`} />마음이 담긴 메모</div>
        </Link>
        <Link {...{ to: "../polaroid", css: [tw_link, fontSize] }}>
          <div css={tw`flex`}><Camera css={tw`mr-2`} />추억이 담긴 사진/영상</div>
        </Link>
        <div></div>
      </div>
    </Fragment>
  );
}

export default Post