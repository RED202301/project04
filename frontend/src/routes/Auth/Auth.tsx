import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import tw from "twin.macro";
import users_api from "../../api/users";
import { useSetRecoilState } from "recoil";
import myInfoState from "../../recoil/myInfo";


const twStyles = [tw`bg-gray-100 h-[100vh] `]

const Auth: React.FC = () => {
  const navigate = useNavigate();
  const setMyInfo = useSetRecoilState(myInfoState);
  const handleNavigate = async () => {
    const token = new URL(window.location.href).searchParams.get("token");
    if (token) localStorage.setItem("accessToken", token);
    const userInfo = await users_api.getUserByToken();
    if (userInfo) setMyInfo(userInfo)
    navigate("/")
  }

  useEffect(() => {
    handleNavigate()
  })

  return (
    <div css={twStyles} style={{
      maxWidth: "500px",
      minWidth: "200px",
      marginLeft: "auto",
      marginRight: "auto",
      backgroundColor: "#59B379",
    }}>
      {/* <GlobalStyles></GlobalStyles> */}
      <div css={tw``}></div>
      <div>
        {/* <h2 css={tw`flex justify-center`}>로그인 리다이렉트 페이지</h2> */}
        <Link to="/" css={tw`flex justify-center`}>돌아가기</Link>
      </div>
      <div className="">
      </div>
    </div>
  );
};

export default Auth;
