import { Global, css } from "@emotion/react";

function FontStyles() {
  return (
    <Global
      styles={css`
        @font-face {
          font-family: "Cafe24Supermagic";
          src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2307-2@1.0/Cafe24Supermagic-Bold-v1.0.woff2")
            format("woff2");
          font-weight: 700;
          font-style: normal;
        }

        @font-face {
          font-family: "IMHyeminBold";
          src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2106@1.1/IM_Hyemin-Bold.woff2") format("woff");
          font-weight: normal;
          font-style: normal;
        }
      `}
    />
  );
}

export default FontStyles;