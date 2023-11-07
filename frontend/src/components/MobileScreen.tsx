import { PropsWithChildren } from "react";
import { useRecoilValue } from "recoil";
import mobileSizeState from "../recoil/mobileSizeState";
import tw, { css } from "twin.macro";

const MobileScreen = ({children}:PropsWithChildren) => {
  const { width } = useRecoilValue(mobileSizeState);
  const twStyles = [ tw`h-screen`, css({ width }) ]
  return (
    <section {...{ css: [twStyles, tw`m-auto`] }}>
      <div {...{ css: [twStyles, tw`absolute`] }}>
        {children}
      </div>
    </section>
  )
}

export default MobileScreen