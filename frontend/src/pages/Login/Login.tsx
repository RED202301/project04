import React from "react";
import kakaoImg from "/kakao_login_large_narrow.png";
import tw from "twin.macro";
import GlobalStyles from "../../styles/GlobalStyles";
import Logo from "/Logo.gif"

const base_URL = import.meta.env.VITE_SERVER_URL;
const Login: React.FC = () => {
  // const Backserver_URI = 'http://192.168.30.201:8080';
  const Backserver_URI = base_URL;
  // const REDIRECT_URI = "http://127.0.0.1:5173/oauth/redirect"; // redirect 주소
  const REDIRECT_URI = `${base_URL}/oauth/redirect`; // redirect 주소
  // const KAKAO_AUTH_URI = `${Backserver_URI}/oauth2/authorization/kakao?redirect_uri=${REDIRECT_URI}`;
  const KAKAO_AUTH_URI = `http://192.168.30.218:8080/oauth2/authorization/kakao?redirect_uri=http://localhost:5173/oauth/redirect`;

  const handleLogin = () => 
  {
    window.location.href = KAKAO_AUTH_URI;
  };
  // const twStyles = [tw`bg-gray-100 h-[100vh] bg-[url("https://transparenttextures.com/patterns/grid-me.png")]`]
  const twStyles = [tw`bg-gray-100 h-[100vh] `]
  return (
    <div css={twStyles} style={{    
    maxWidth: "500px",
    minWidth: "200px",
    marginLeft: "auto", 
    marginRight: "auto",
    backgroundColor:"#59B379",
    }}>
      {/* <GlobalStyles></GlobalStyles> */}
      <div css={tw``}></div>  
      <div className="flex justify-center ml-[10%] w-[80vw] h-[50vh]">
      </div>
      <div className="">
      </div>
      <img css={tw`flex justify-center rounded ml-[5%] pt-[10%]`} src={Logo} width={"90%"} alt=""></img>
      <div css={tw`fixed top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 overflow-hidden rounded-xl w-[77%] sm:w-[60%] md:w-[40%] lg:w-[27%]`}>
        <a css={tw`flex justify-center`} href={KAKAO_AUTH_URI} onClick={handleLogin}>
          <img css={tw`rounded shadow-xl mr-2 ml-2`} src={kakaoImg} width={"100%"} alt=""></img>
        </a>
        <p css={tw`text-sm mt-2`}>시작할 경우, Sand2U의 서비스 이용약관과 개인정보 보호정책에 동의하게 됩니다.</p>
      </div>
    </div>
  );
};

export default Login;
