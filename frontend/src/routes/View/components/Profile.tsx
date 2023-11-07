import React, { useState, useEffect, ReactNode } from "react";
import { Link } from "react-router-dom";
import Close from "/close.png";
import tw from "twin.macro";
import { useRecoilState } from "recoil";
import mobileSizeState from "../../../recoil/mobileSizeState"
import Logout from "./Logout";
import Signout from "./Signout";
import myInfoState from "../../../recoil/myInfo";



const Profile: React.FC = (props) => {
    // 모달 오픈
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    // 넓이 관련
  const [{ width }] = useRecoilState(mobileSizeState);
    // 로그인 URI 관련
  const back_base_URL = import.meta.env.VITE_BACK_SERVER_URL;
  const REDIRECT_URI = window.location.href; // redirect 주소
  const KAKAO_AUTH_URI = `${back_base_URL}/oauth2/authorization/kakao?redirect_uri=${REDIRECT_URI}`;
    // 로그인 유무 확인
  const isLogin = window.localStorage.getItem('accessToken'); // TODO: 로그인 상태를 확인하는 로직을 구현해야 합니다.
  const [myInfo] = useRecoilState(myInfoState)

  useEffect(() => {
    if (!isLogin){
    const accessToken = new URL(window.location.href).searchParams.get("token");
        if(accessToken != null){
            window.localStorage.setItem("accessToken", accessToken);}
        if (accessToken){
        const currentURL = window.location.href;
        const newURL = currentURL.split("?")[0]; // ?token 이후의 부분을 제거
        window.history.replaceState({}, document.title, newURL);
    }
} 
// console.log(userProfileImageUrl)
  }, []);

  // 햄버거 메뉴 토글
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
          <div>
          {isLogin ? (
              <div onClick={toggleMenu} css={tw`w-7 sm:w-10 lg:w-11 lg:h-11`}>
                        {myInfo&&<img src={myInfo.userProfileImageUrl} alt="profile" css={tw`rounded-full w-[100%]`} />}
                    </div>
                ) : (
                    <Link to={KAKAO_AUTH_URI}>로그인</Link>
                    )}
          </div>

        {/* 햄버거 메뉴 */}
        {isMenuOpen && (
            <div
            css={[
                tw`fixed inset-0 flex items-center justify-end z-40 bg-black bg-opacity-50 ml-auto mr-auto`,
            ]} style={{width: width}}
            >
            <div css={tw`bg-white p-4 shadow-md ml-auto h-full`}>
              <div css={tw`flex justify-end`}>
                <div onClick={toggleMenu} css={tw`mt-2 w-7 sm:w-10 lg:w-11 lg:h-11`}>
                  <img src={Close} alt="Close" css={tw`w-[100%]`} />
                </div>
              </div>
              <ul css={tw`mt-4`}>
                {isLogin ? (
                    <>
                    <li css={tw`p-[10px] text-black`}>
                      <Logout/>
                    </li>
                    <li css={tw`p-[10px] text-black`}>
                      <Signout/>
                    </li>
                  </>
                ) : (
                    <li css={tw`p-[10px]`}>
                    <Link to={KAKAO_AUTH_URI}>로그인</Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        )}
        </div>
  );
};

export default Profile;
