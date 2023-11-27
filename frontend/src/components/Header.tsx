import React, { useState, useEffect, ReactNode } from "react";
import { Link } from "react-router-dom";
import Close from "/close.png";
import tw from "twin.macro";
import { useRecoilState } from "recoil";
import { mobileSizeState } from "../recoil/atoms";
import Logout from "../pages/Login/Logout";
import Signout from "../pages/Login/Signout";
import zz from "/Logo.gif"

interface MobileSizeState {
    clientWidth: number;
  }

interface HeaderProps {
    children: ReactNode;
    children2: ReactNode;
}


const Header: React.FC<HeaderProps> = (props) => {
    // 모달 오픈
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    // 넓이 관련
  const [{ clientWidth }] = useRecoilState<MobileSizeState>(mobileSizeState);
    // 로그인 URI 관련
  const back_base_URL = import.meta.env.VITE_BACK_SERVER_URL;
  const REDIRECT_URI = window.location.href; // redirect 주소
  const KAKAO_AUTH_URI = `${back_base_URL}/oauth2/authorization/kakao?redirect_uri=${REDIRECT_URI}`;
    // 로그인 유무 확인
  const isLogin = window.localStorage.getItem('accessToken'); // TODO: 로그인 상태를 확인하는 로직을 구현해야 합니다.

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
  }, []);

  // 햄버거 메뉴 토글
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div css={tw`inset-x-0 top-0 z-50 left-0 ml-auto mr-auto`} style={{width: clientWidth}}>
      <nav
        css={[
          tw`border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700`,
        ]}
      >
        <div css={tw`max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4`}>
          <div css={tw`flex justify-between items-center w-full text-xs sm:text-sm lg:text-lg`}>
                {props.children2}
                {props.children}
          {isLogin ? (
                    <div onClick={toggleMenu} css={tw`w-9 sm:w-10 lg:w-11 lg:h-11`}>
                        <img src={zz} alt="profile" css={tw`rounded-full`} />
                    </div>
                ) : (
                    <Link to={KAKAO_AUTH_URI}>로그인</Link>
                )}
          </div>
        </div>

        {/* 햄버거 메뉴 */}
        {isMenuOpen && (
          <div
            css={[
              tw`fixed inset-0 flex items-center justify-end z-40 bg-black bg-opacity-50 ml-auto mr-auto`,
            ]} style={{width: clientWidth}}
          >
            <div css={tw`bg-white p-4 shadow-md ml-auto h-full`}>
              <div css={tw`flex justify-end`}>
                <div onClick={toggleMenu} css={tw`w-10`}>
                  <img src={Close} alt="Close" />
                </div>
              </div>
              <ul css={tw`mt-4`}>
                {isLogin ? (
                  <>
                    <li css={tw`p-[10px]`}>
                      <Logout/>
                    </li>
                    <li css={tw`p-[10px]`}>
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
      </nav>
    </div>
  );
};

export default Header;
