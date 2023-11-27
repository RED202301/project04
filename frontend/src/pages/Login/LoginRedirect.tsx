import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import tw from "twin.macro";
import messagesAPI from "../../api/messagesAPI";


const twStyles = [tw`bg-gray-100 h-[100vh] `]
const Login2: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = new URL(window.location.href).searchParams.get("token");
    window.localStorage.setItem("accessToken", accessToken);
    
    
    if (window.localStorage.getItem("accessToken")) {
      (async () => {
        navigate(`../rolling/${(await messagesAPI.getUser()).userId}`);
      })()
    }
    else{
      navigate('../')
    }
  })
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
