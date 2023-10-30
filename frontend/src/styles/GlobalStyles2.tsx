import React, { useEffect } from "react";
import { Global } from "@emotion/react";
import tw, { css, theme, GlobalStyles as BaseStyles } from "twin.macro";
import { atom, useRecoilState, useSetRecoilState } from "recoil";

const mobileSizeState = atom({
  key: "mobileSizeState",
  default: { clientWidth: 0, clientHeight: 0 },
})

const useHandleResize = () => {
  const setMobileSize = useSetRecoilState(mobileSizeState);
  const handleResize = () => {
    let [clientWidth, clientHeight] = [window.innerWidth, window.innerHeight]
    const { innerHeight } = window
    if (clientWidth < clientHeight) {
      clientHeight = (clientWidth / 9) * 16;
      clientHeight = clientHeight < innerHeight ? clientHeight : innerHeight;
      clientWidth = (clientHeight / 16) * 9;
    }
    else {
      clientWidth = (clientHeight / 16) * 9;
    }
    setMobileSize(() => ({ clientWidth, clientHeight }));
  };
  return handleResize;
}

const GlobalStyles = () => {
  
  const [{ clientWidth, clientHeight }] = useRecoilState(mobileSizeState);
  const handleResize = useHandleResize();

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [])

  const customStyles2 = css({
    body: {
      WebkitTapHighlightColor: theme`colors.purple.500`,
      ...tw`antialiased`,
      overflowX: "hidden",
      width: clientWidth,
      height: clientHeight,
      marginLeft: "auto", 
      marginRight: "auto",
    },
  });

  return <>
    <BaseStyles />
    <Global styles={customStyles2} />
  </>
};
export default GlobalStyles;