import { useState } from "react";
import { useRecoilState } from "recoil";
import { placeableInfoListState } from "../recoil/atoms";
import { DummyPlaceableInfo } from "../types/types";
import tw from "twin.macro";
import { bgcolors } from "../Styles/bgcolors";
import { textures } from "../Styles/texture";

const CreatePlaceableForm = () => {
  const [, setPlaceableInfoList] = useRecoilState(placeableInfoListState);
  const [content, setContent] = useState("")
  const [bgcolor, setBgcolor] = useState(0)
  const onSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    setPlaceableInfoList(placeableInfoList => {
      return [...placeableInfoList, DummyPlaceableInfo.StickyNote({ content, bgcolor})];
    })
  }

  return <div {...{css:[tw`w-64 h-64`]}}>
    <form {...{onSubmit}}>
      
      <div {...{css:tw`flex place-content-around p-4`}}>
        {bgcolors
          .map((bgcolor, i) => {
            return <label htmlFor={`bgcolor-${i}`}>
              <div {...{
                css: [
                  tw`w-8 h-8 rounded-full drop-shadow-md`,
                  bgcolor,
                  textures[0]
                ]
              }}>
                <input
                  {...{
                    type: "radio",
                    name: "bgcolor",
                    id: `bgcolor-${i}`,
                    onChange: () => setBgcolor(i), css: tw`hidden`
                  }} />
              </div>
            </label>
          })
        }
        <input type="submit" value="제출" />
      </div>
      <div {...{
        css: [
          tw`w-72 px-4 py-4 drop-shadow-md`,
          bgcolors[bgcolor],
          textures[0],              
        ]
      }}>

        <textarea
            {...{
              css: [
                tw`w-64 h-64 resize-none`,
                bgcolors[bgcolor],
                textures[0],              
              ],
              value: content,
              onChange: ({ target }) => setContent(target.value)
            }}
          />
      </div>
    </form>
  </div>
}

export default CreatePlaceableForm;