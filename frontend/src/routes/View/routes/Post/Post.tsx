import { Link } from "react-router-dom"
import tw from "twin.macro"
import { Fragment } from "react"

const Post = () => {
  const tw_link = tw`w-[80%] h-[20%] bg-white z-10 flex justify-around items-center`
  return (
    <Fragment>
      <Link {...{ to: "../stickynote", css: tw_link }}>
        <div>메모</div>
        <div>마음이 담긴 메모</div>
      </Link>
      <Link {...{ to: "../polaroid", css: tw_link }}>
        <div>사진</div>
        <div>추억이 담긴 사진/영상</div>
      </Link>
      
    </Fragment>
  );
}

export default Post