
import { Global } from "@emotion/react";
import { css } from "twin.macro";

const GlobalStyles = () => (
  <Global styles={
    css`
      *{
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -o-user-select: none;
        user-select: none;
        -webkit-user-drag: none;
        -khtml-user-drag: none;
        -moz-user-drag: none;
        -o-user-drag: none;
        user-drag: none;
      }
    `
  }/>
)
export default GlobalStyles;