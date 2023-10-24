import React, { PropsWithChildren, useEffect } from "react"
import { useOnDragMove, useOnDragEnd } from "./hooks";
import { placeableInfoMapState, placeableInfoListState, draggingState, windowSizeState } from "./recoil/atoms";
import { useRecoilState } from "recoil";
import { PlaceableInfo, DummyPlaceableInfo } from "./types/types";
import Placeable from "./components/Placeable";
import tw from "twin.macro";
import FontStyles from "./Styles/fonts";
// import CreatePlaceableForm from "./components/CreatePlaceableForm";
import { textures } from "./Styles/texture";
import ModalComponent from "./components/d/Modal";


const datas: PlaceableInfo[] = [
  DummyPlaceableInfo.StickyNote({content:"포스트잇 입니당", bgcolor:1}),
  DummyPlaceableInfo.StickyNote({content:"포스트잇 입니당", bgcolor:2}),
  DummyPlaceableInfo.StickyNote({content:"포스트잇 입니당", bgcolor:3}),
  DummyPlaceableInfo.StickyNote({content:"포스트잇 입니당", bgcolor:1}),
  DummyPlaceableInfo.StickyNote({content:"포스트잇 입니당", bgcolor:2}),
  DummyPlaceableInfo.StickyNote({content:"포스트잇 입니당", bgcolor:3}),
  DummyPlaceableInfo.StickyNote({content:"포스트잇 입니당", bgcolor:3}),
  DummyPlaceableInfo.StickyNote({content:"포스트잇 입니당", bgcolor:0}),
  DummyPlaceableInfo.StickyNote({content:"포스트잇 입니당", bgcolor:1}),
  DummyPlaceableInfo.StickyNote({content:"포스트잇 입니당", bgcolor:2}),
  DummyPlaceableInfo.StickyNote({content:"포스트잇 입니당", bgcolor:3}),
  DummyPlaceableInfo.StickyNote({content:"포스트잇 입니당", bgcolor:3}),
  DummyPlaceableInfo.StickyNote({content:"포스트잇 입니당", bgcolor:0}),
  DummyPlaceableInfo.StickyNote({content:"포스트잇 입니당", bgcolor:1}),
  DummyPlaceableInfo.StickyNote({content:"포스트잇 입니당", bgcolor:2}),
  DummyPlaceableInfo.Polaroid({
    content: "갬성 사진", 
    src: "https://cdn.thescoop.co.kr/news/photo/202102/42527_61056_1017.jpg",
    thumbnail: "https://cdn.thescoop.co.kr/news/photo/202102/42527_61056_1017.jpg",
  }),
  DummyPlaceableInfo.Polaroid({
    content: "", 
    src: "https://www.cuonet.com/data/file/community2/3553229414_qIAgixUu_17231e24cd42385d7ad5c98f147ece8a37da2544.gif",
    thumbnail: "https://www.cuonet.com/data/file/community2/3553229414_qIAgixUu_17231e24cd42385d7ad5c98f147ece8a37da2544.gif",
  }),
  DummyPlaceableInfo.Polaroid({
    content: "갬성 사진", 
    src: "https://mblogthumb-phinf.pstatic.net/MjAxODAzMjBfMTUw/MDAxNTIxNDg4NDQ1NzUz.nJAZpVQEen0mR_oasedsz-G1bbEPel_akhowP-N-uSYg.0UsO5f-TAjYZ3cQJ3lCOubAlESCLUMiqZJjnRFgdd5Ug.GIF.uprrsse/%EA%B0%AC%EC%84%B1_%EB%8F%8B%EB%8A%94_%EC%95%A0%EB%8B%88_%EC%9B%80%EC%A7%A4_%EB%AA%A8%EC%9D%8C__%28212%29.gif?type=w800",
    thumbnail: "https://mblogthumb-phinf.pstatic.net/MjAxODAzMjBfMTUw/MDAxNTIxNDg4NDQ1NzUz.nJAZpVQEen0mR_oasedsz-G1bbEPel_akhowP-N-uSYg.0UsO5f-TAjYZ3cQJ3lCOubAlESCLUMiqZJjnRFgdd5Ug.GIF.uprrsse/%EA%B0%AC%EC%84%B1_%EB%8F%8B%EB%8A%94_%EC%95%A0%EB%8B%88_%EC%9B%80%EC%A7%A4_%EB%AA%A8%EC%9D%8C__%28212%29.gif?type=w800",
  }),
  DummyPlaceableInfo.Polaroid({
    content: "가나다라마가나다라마", 
    src: "https://cdn.eyesmag.com/content/uploads/posts/2020/05/08/city-pop-playlist-6-main-31cf461b-a668-4a92-aff5-abd6470d955c.gif",
    thumbnail: "https://cdn.eyesmag.com/content/uploads/posts/2020/05/08/city-pop-playlist-6-main-31cf461b-a668-4a92-aff5-abd6470d955c.gif",
  }),
  DummyPlaceableInfo.StickyNote({content:"가나다라마가나다라마가나다라마가나다라마가나다라마가나다라마가나다라마가나다라마가나다라마가나다라마가나다라마가나다라마", bgcolor:3}),
  // DummyPlaceableInfo.Sticker({src:"💗"}),
  // DummyPlaceableInfo.Sticker({src:"🍕"}),
  // DummyPlaceableInfo.Sticker({src:"🍟"}),
  // DummyPlaceableInfo.Sticker({src:"🌸"}),
  // DummyPlaceableInfo.Sticker({src:"🥕"}),
  // DummyPlaceableInfo.Sticker({src:"📌"}),
  // DummyPlaceableInfo.Sticker({src:"📌"}),
  // DummyPlaceableInfo.Sticker({src:"📌"}),
  // DummyPlaceableInfo.Sticker({src:"📌"}),
]; 

const Board: React.FC<PropsWithChildren> = () => {
  const onDragMove = useOnDragMove();
  const onDragEnd = useOnDragEnd();
  const [dragging] = useRecoilState(draggingState);
  const [placeableInfoList, setPlaceableInfoList] = useRecoilState(placeableInfoListState);
  const [, setPlaceableInfoMap] = useRecoilState(placeableInfoMapState);

  const [windowSize, setWindowSize] = useRecoilState(windowSizeState);
  const handleResize = () => {
    setWindowSize({
      // width: window.innerWidth,
      width: window.innerWidth >= 500 ? 500 : window.innerWidth,
      height: window.innerHeight,
    }) 
  }

  const init = () => {
    setPlaceableInfoList(() => datas);
    setPlaceableInfoMap((placeableInfoMap) => {
      datas.forEach(data => { placeableInfoMap.set(data.id, data) });
      return placeableInfoMap
    })
  }

  const updatePlaceableInfoMap = () => {
    if (dragging && !dragging?.isDrag) {
      setPlaceableInfoMap((placeableInfoMap) => {
        placeableInfoList.forEach(placeableInfo => {
          placeableInfoMap.set(placeableInfo.id, placeableInfo)
        })
        return placeableInfoMap;
      })
    }
  }

  useEffect(init, [])
  useEffect(updatePlaceableInfoMap, [dragging])
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return ()=> window.removeEventListener("resize", handleResize); 
  })

  const props = {
    onMouseMove: onDragMove,
    onMouseUp: onDragEnd,
    onMouseLeave: onDragEnd,

    onTouchMove: onDragMove,
    onTouchEnd: onDragEnd,
  }

  const twStyles = [tw`bg-orange-200`, textures[0]]
  return (
    <section {...{
      ...props,
      css: twStyles,
      style: {
        width: windowSize.width,
        height: windowSize.height,
        marginLeft: "auto", 
        marginRight: "auto",
      }
    }}>
      <div
        {...{
          css: [
            tw`absolute`
          ],
          style: {
            width: windowSize.width,
            height: windowSize.height,
          }
        }}
      >
        <FontStyles />
        {[...placeableInfoList]
          .sort((a,b)=>a.zindex-b.zindex)
          .map((placeableInfo) => {
          return <Placeable {...{...placeableInfo, key:placeableInfo.id}}></Placeable>
          })}
        <ModalComponent/>
      </div>
      {/* <CreatePlaceableForm></CreatePlaceableForm> */}
    </section>
  );
  
}

export default Board;