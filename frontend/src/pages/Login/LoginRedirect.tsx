import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import tw from "twin.macro";

import { useRecoilValue, useSetRecoilState } from "recoil";
import { useRecoilState } from "recoil";

// const base_URL = import.meta.env.VITE_SERVER_URL;

const twStyles = [tw`bg-gray-100 h-[100vh] `]
const Login2: React.FC = () => {
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
    <div>
    <h2 css={tw`flex justify-center`}>로그인 리다이렉트 페이지</h2>
      <Link to="/" css={tw`flex justify-center`}>돌아가기</Link>
    </div>
    <div className="">
    </div>
  </div>
);
};

export default Login2;
