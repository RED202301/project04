import {useEffect} from "react";
import kakaoImg from "/kakao_login_large_narrow.png";
import tw from "twin.macro";
import Logo from "/Logo.gif"
import { useRecoilValue } from "recoil";
import myInfoState from "../../recoil/myInfo";
import { useNavigate } from "react-router-dom";
import insta from "/insta.gif";

const front_base_URL = import.meta.env.VITE_FRONT_SERVER_URL;
const back_base_URL = import.meta.env.VITE_BACK_SERVER_URL;

const Login = () => {
  const REDIRECT_URI = `${front_base_URL}/oauth/redirect`; // redirect 주소
  const KAKAO_AUTH_URI = `${back_base_URL}/oauth2/authorization/kakao?redirect_uri=${REDIRECT_URI}`;

  const myInfo = useRecoilValue(myInfoState)
  const navigate = useNavigate()
  useEffect(() => {
    if(myInfo) navigate(`./view/${myInfo.userId}`) 
  }, [myInfo])
    
  return (
    <div css={tw`flex flex-col h-full justify-around items-center bg-[#59B379]`}>
      <img src={Logo} width={"90%"} alt="센드 투 유"></img>
      <a href={KAKAO_AUTH_URI} css={tw`flex justify-center`}>
        <img {...{src:kakaoImg, css:tw`w-[90%]`,alt:"카카오 로그인" }}/>
      </a>
      <div css={tw`mt-2 text-gray-800 w-[90%] text-xs flex-wrap justify-center items-center pb-10`}>
        <p css={tw`flex justify-center ml-5 mr-5`}>
          '수능생 응원 롤링페이퍼' SEND2U
          </p>
          <p css={tw`flex justify-center ml-5 mr-5`}>
        시작할 경우, Send2U의 서비스 이용약관과 
          </p>
          <p css={tw`flex justify-center ml-5 mr-5`}>
        개인정보 보호정책에 동의하게 됩니다.      
          </p>
        <a href='https://www.instagram.com/send2u__' css={tw`flex justify-center`}>
          <img {...{src:insta, css:tw`w-[10%]`,alt:"인스타" }}/>
        </a>
      </div>
    </div>
  );
};

export default Login;
