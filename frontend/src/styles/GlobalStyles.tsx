// src/styles/GlobalStyles.tsx
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import { Global } from "@emotion/react";
import tw, { css, theme, GlobalStyles as BaseStyles } from "twin.macro";

const customStyles = css({
  body: {
    WebkitTapHighlightColor: theme`colors.purple.500`,
    ...tw`antialiased`,
    overflowX: "hidden",
    // maxWidth: "500px",
    // minWidth: "200px",
    // marginLeft: "auto", 
    // marginRight: "auto",
  },
});

const GlobalStyles = () => (
  <>
    <BaseStyles />
    <Global styles={customStyles} />
  </>
);
export default GlobalStyles;