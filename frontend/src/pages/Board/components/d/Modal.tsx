import { useRecoilState } from "recoil"
import { windowSizeState } from "../../recoil/atoms"
import tw, { css } from "twin.macro"
import { MutableRefObject, useEffect, useRef, useState } from "react"
import { textures } from "../../Styles/texture"
import { bgcolors } from "../../Styles/bgcolors"


const StickyNoteForm: React.FC = () => {
  const [{ width, height }] = useRecoilState(windowSizeState)

  const [bgcolor, setBgcolor] = useState(0)

  const [textInput, setTextInput] = useState("");
  const twcss = [
    tw`absolute`,
    css`
      background-color: rgba(1, 1, 1, .5);
      display: flex;
    `
  ];
  const style = { width, height };


  const ref = useRef() as MutableRefObject<HTMLDivElement>;
  const [windowSize] = useRecoilState(windowSizeState);
  useEffect(() => {
    setTimeout(() => {
      ref.current.style.backgroundColor = ""
      ref.current.style.transition
        = "scale 0.4s ease-in-out, background-color 0.4s ease-in-out"
      ref.current.style.backgroundColor = "white"
      ref.current.style.scale = "1"
      setTimeout(() => { ref.current.style.transition = "" }, 400)
    } , 1)
  }, []);

  return (
    <section {...{ css: twcss, style }}>
      <div {...{ css:[tw`m-auto`] }}>
        <div {...{ css:[css`display: flex`, tw`p-4 place-content-around`] }}>
          {bgcolors.map((bgcolor, index) =>
            <label>
              <div {...{ css: [
              textures[0], bgcolor, tw`w-12 h-12 rounded-full`] }}>
                <input
                  {...{
                    css: [tw`hidden`],
                    onClick: () => {
                      setBgcolor(index);
                      const b= ["#FFFFFF", "#FDE047", "#FCA5A5", "#93C5FD"]
                      ref.current.style.backgroundColor = b[index];
                    }
                  }}
                  type="radio" name="bgcolor" />
              </div>
            </label>)
          }
          <div{...{ css: [tw`w-12 h-12 rounded-full bg-white flex text-center`] }}>제출</div>
        </div>
        <div
          {...{
            ref,
            css: [
              textures[0],
              bgcolors[bgcolor],
              tw`m-auto font-['Cafe24Supermagic']`,
              css`
          width:${windowSize.width * 0.8}px;
          height:${windowSize.width * 0.8}px;
          scale: 0;
          display: flex;
          `],
          }}
        >
          <div {...{ css: [tw`m-auto`] }}>
            <textarea
              {...{
                spellCheck: false,
                maxLength: 60,
                placeholder: "내용을 입력해주세용.\n(공백 포함 최대 60자)",
                value: textInput,
                onChange: (e) => setTextInput(e.target.value),
                css: [
                  tw`resize-none`,
                  css`
                    background: none;
                    width:${windowSize.width * (0.8 - 0.096)}px;
                    height:${windowSize.width * (0.8 - 0.096)}px;
                    font-size: ${windowSize.width * 0.08}px;
                    overflow: hidden;
                  `
                ],
              }}
            />
          </div>

        </div>
      </div>
      
    </section>
  );
}

const ModalComponent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div>
      {!isOpen
        ? <button onClick={()=>setIsOpen(true)}> 열기 </button>
        : <div>
          <button onClick={()=>setIsOpen(false)}> 닫기 </button>
          <StickyNoteForm />
        </div>
    
      }
      
    </div>
  );
}

export default ModalComponent