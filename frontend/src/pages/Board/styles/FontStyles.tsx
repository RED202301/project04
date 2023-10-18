import { Global, css } from "@emotion/react";

const FontStyles:React.FC = () => {
  return (
    <Global
      styles={css`
      @import url(//fonts.googleapis.com/earlyaccess/nanumbrushscript.css);

      .nanumbrushscript * {
       font-family: 'Nanum Brush Script', cursive;
      }

      @font-face {
        font-family: 'Bbang_gunimom';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_01@1.0/Bbang_gunimom.woff') format('woff');
        font-weight: normal;
        font-style: normal;
      }
       
      @font-face {
          font-family: "Cafe24Supermagic";
          src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2307-2@1.0/Cafe24Supermagic-Bold-v1.0.woff2")
            format("woff2");
          font-weight: 700;
          font-style: normal;
        }

      `}
    />
  );
}

export default FontStyles;
