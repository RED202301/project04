import React from "react";
import kakaoImg from "/kakao_login_large_narrow.png";

const base_URL = import.meta.env.VITE_SERVER_URL;
const Login: React.FC = () => {
  // const Backserver_URI = 'http://192.168.30.201:8080';
  const Backserver_URI = base_URL;
  // const REDIRECT_URI = "http://127.0.0.1:5173/oauth/redirect"; // redirect 주소
  const REDIRECT_URI = `${base_URL}/oauth/redirect`; // redirect 주소
  // const KAKAO_AUTH_URI = `${Backserver_URI}/oauth2/authorization/kakao?redirect_uri=${REDIRECT_URI}`;
  const KAKAO_AUTH_URI = `http://192.168.30.124:8080/oauth2/authorization/kakao?redirect_uri=http://localhost:5173/oauth/redirect`;

  const handleLogin = () => {
    window.location.href = KAKAO_AUTH_URI;
  };

  return (
    <div className="">
      <div className="p-[50px]"></div>
      <div className="flex justify-center ml-[10%] w-[80vw] h-[50vh]">
      </div>
      <div className="">로그인페이지
      </div>
      <div className="fixed top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 overflow-hidden rounded-xl w-[70%] sm:w-[70%] md:w-[50%] lg:w-[30%]">
        <a href={KAKAO_AUTH_URI} onClick={handleLogin}>
          <img src={kakaoImg} width={"100%"} alt=""></img>
        </a>
      </div>
    </div>
  );
};

export default Login;
