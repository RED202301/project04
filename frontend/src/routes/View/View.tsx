import { useNavigate, useParams, Route, Routes } from "react-router-dom";
import users_api from "../../api/users";
import { Fragment, useEffect, useState } from "react";
import Header from "./components/Header";
import { Board, Messages, Post, SecretMessages } from "./routes"
import tw from "twin.macro";
// import Footer from "./components/Footer";
import FloatingButton from "./components/FloatingButton";
import Detail from "./routes/Detail/Detail";
import PolaroidForm from "./routes/Post/routes/PolaroidForm";
import SticknoteForm from "./routes/Post/routes/StickynoteForm";
import FontStyles from "./styles/FontStyles";
import ModalContainer from "./routes/Board/components/ModalContainer";


const View = () => {
  const userId = useParams()?.userId || "";
  const navigate = useNavigate();
  const [username, setUsername] = useState("")
  
  const handleNavigate = async () => {
    if (userId) {
      const userInfo = await users_api.getUsernameById(userId);
      if (userInfo) setUsername(userInfo.userName);
      else navigate(`../`);
    }
    else navigate(`../`);
  }

  useEffect(() => {
    window.scrollY = 0
    handleNavigate()
  }, [userId])
  
  // const tw_main = tw`flex-1`

  return (
    <Fragment>
      <FontStyles />
      {/* <section {...{ css: tw`w-full h-full flex flex-col bg-yellow-100 font-[omyuPretty]` }}> */}
      {/* <section {...{ css: tw`w-full h-full flex flex-col font-[omyuPretty] bg-[#e8c292] bg-[url("https://transparenttextures.com/patterns/black-felt.png")]` }}> */}
      {/* <section {...{ css: tw`w-full h-full flex flex-col font-[omyuPretty] bg-[#005244] bg-[url("https://transparenttextures.com/patterns/grid-me.png")]` }}> */}
      <section {...{ css: tw`w-full h-full flex flex-col font-[omyuPretty] bg-[#d6efff] bg-[url("https://transparenttextures.com/patterns/inspiration-geometry.png")]` }}>
      {/* <section {...{ css: tw`w-full h-full flex flex-col font-[omyuPretty] bg-[#ffffff] bg-[url("https://transparenttextures.com/patterns/lined-paper.png")]` }}> */}
      {/* <section {...{ css: tw`w-full h-full flex flex-col font-[omyuPretty] bg-[#ffffff] bg-[url("https://transparenttextures.com/patterns/lined-paper-2.png")]` }}> */}
        <Header {...{ userId, username }} />
        <Board {...{ userId }} />
        
        <FloatingButton />
        
        <Routes>
          <Route path="/messages/*" element={
            <ModalContainer>
              <Messages />
            </ModalContainer>
          } />
          <Route path="/secretMessages/*" element={
            <ModalContainer>
              <SecretMessages {...{userId}} />
            </ModalContainer>
          } />
          <Route path="/post" element={
            <ModalContainer>
              <Post />
            </ModalContainer>
          } />
          <Route path="/stickynote" element={
            <ModalContainer>
              <SticknoteForm />
            </ModalContainer>
          } />
          <Route path="/polaroid" element={
            <ModalContainer>
              <PolaroidForm />
            </ModalContainer>
          } />
        </Routes>
        <Routes>
          <Route path="/detail/:messageId" element={
            <ModalContainer {...{ isOverlayed: true }}>
              <Detail />
            </ModalContainer>
          } />
          <Route path="/messages/detail/:messageId" element={
            <ModalContainer {...{ isOverlayed: true }}>
              <Detail />
            </ModalContainer>
          } />
          <Route path="/secretMessages/detail/:messageId" element={
            <ModalContainer {...{ isOverlayed: true }}>
              <Detail {...{isSecret:true}} />
            </ModalContainer>
          } />
        </Routes>
        {/* <Footer/> */}
      </section>
    </Fragment>
  );
};

export default View;