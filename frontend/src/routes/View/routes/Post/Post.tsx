import { Link, useNavigate } from "react-router-dom"
import tw, { css } from "twin.macro"
import { Fragment, useEffect } from "react"
import { useRecoilValue } from "recoil"
import mobileSizeState from "../../../../recoil/mobileSizeState"

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
  const tw_link = tw`w-[80%] h-[20%] bg-white z-10 flex justify-around items-center`
  return (
    <Fragment>
      <Link {...{ to: "../stickynote", css: [tw_link, fontSize] }}>
        <div>메모</div>
        <div>마음이 담긴 메모</div>
      </Link>
      <Link {...{ to: "../polaroid", css: [tw_link, fontSize] }}>
        <div>사진/영상</div>
        <div>추억이 담긴 사진/영상</div>
      </Link>
      
    </Fragment>
  );
}

export default Post