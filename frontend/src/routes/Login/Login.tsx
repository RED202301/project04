import React from "react";
import kakaoImg from "/kakao_login_large_narrow.png";
import tw from "twin.macro";
import Logo from "/Logo.gif"

const front_base_URL = import.meta.env.VITE_FRONT_SERVER_URL;
const back_base_URL = import.meta.env.VITE_BACK_SERVER_URL;

const Login: React.FC = () => {
  const REDIRECT_URI = `${front_base_URL}/oauth/redirect`; // redirect 주소
  const KAKAO_AUTH_URI = `${back_base_URL}/oauth2/authorization/kakao?redirect_uri=${REDIRECT_URI}`;

    
  return (
    <div css={tw`flex flex-col h-full justify-around items-center bg-[#59B379]`}>
      <img src={Logo} width={"90%"} alt="센드 투 유"></img>
      <a href={KAKAO_AUTH_URI} css={tw`flex justify-center`}>
        <img {...{src:kakaoImg, css:tw`w-[90%]`,alt:"카카오 로그인" }}/>
      </a>
      <p css={tw`text-sm mt-2 text-gray-800 w-[90%]`}>
        시작할 경우, Send2U의 서비스 이용약관과 개인정보 보호정책에 동의하게 됩니다.
      </p>
    </div>
  );
};

export default Login;
