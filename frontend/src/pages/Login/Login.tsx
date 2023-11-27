import React, {useEffect} from "react";
import kakaoImg from "/kakao_login_large_narrow.png";
import tw from "twin.macro";
import Logo from "/Logo.gif"
// import useLongPressBlocker from "../../components/useLongPressBlocker";

const front_base_URL = import.meta.env.VITE_FRONT_SERVER_URL;
const back_base_URL = import.meta.env.VITE_BACK_SERVER_URL;
const Login: React.FC = () => {
  const REDIRECT_URI = `${front_base_URL}/oauth/redirect`; // redirect 주소
  const KAKAO_AUTH_URI = `${back_base_URL}/oauth2/authorization/kakao?redirect_uri=${REDIRECT_URI}`;

  useEffect(() => {
    let vh = 0;
    const setVh = () => {
      vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVh();

    window.addEventListener('resize', setVh);
    return () => {
      window.removeEventListener('resize', setVh);
    };
  }, []);

  const handleLogin = () => 
  {
    window.location.href = KAKAO_AUTH_URI;
  };
  // const twStyles = [tw`bg-gray-100 h-[100vh] bg-[url("https://transparenttextures.com/patterns/grid-me.png")]`]
  const twStyles = [tw`bg-gray-100 h-[100vh]`]
  return (
    <div css={twStyles} style={{
    maxWidth: "500px",
    minWidth: "200px",
    // maxHeight: window.innerHeight,
    // height: window.innerHeight, 
    height: 'calc(var(--vh, 1vh) * 100)',
    minHeight: '500px',
    marginLeft: "auto", 
    marginRight: "auto",
    backgroundColor:"#59B379",
    userSelect: 'none',
    }}
    // onTouchStart={handleTouchStart}
    // onTouchMove={handleTouchMove}
    // onTouchEnd={handleTouchEnd}
    >
      {/* <GlobalStyles></GlobalStyles> */}       
      <div css={tw`flex-wrap`}>
        <img css={tw`flex justify-center rounded ml-[5%] pt-[10%]`} src={Logo} width={"90%"} alt=""></img>
      </div>
      <div css={tw`relative w-full`} style={{paddingTop: '75%'}}>
      <a href={KAKAO_AUTH_URI} onClick={handleLogin}>
      <img css={tw`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-[420px] w-[90%] h-auto`} src={kakaoImg}/>
      </a>
      <p css={tw`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-2/4 text-xs mt-20 text-gray-800 sm:text-sm  max-w-[420px] w-[90%] h-auto`}>시작할 경우, Send2U의 서비스 이용약관과 개인정보 보호정책에 동의하게 됩니다.</p>
      </div>
    </div>
  );
};

export default Login;
