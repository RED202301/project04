import { useNavigate, useParams, Route, Routes } from "react-router-dom";
import users_api from "../../api/users";
import { Fragment, useEffect, useState } from "react";
import Header from "./components/Header";
import { Board, Mailbox, Post } from "./routes"
import tw from "twin.macro";
// import Footer from "./components/Footer";
import FloatingButton from "./components/FloatingButton";
import Detail from "./routes/Detail/Detail";
import PolaroidForm from "./routes/Post/routes/PolaroidForm";
import SticknoteForm from "./routes/Post/routes/StickyNoteForm";
import FontStyles from "./styles/FontStyles";
import ModalContainer from "./routes/Board/components/ModalContainer";


const View = () => {
  const userId = parseInt(useParams()?.userId || "");
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
    handleNavigate()
  }, [])
  
  // const tw_main = tw`flex-1`

  return (
    <Fragment>
      <FontStyles />
      <section {...{ css: tw`w-full h-full flex flex-col bg-yellow-100 font-[omyuPretty]` }}>
        <Header {...{ userId, username }} />
        <Board {...{ userId }} />
        
        <FloatingButton />
        
        <Routes>
          <Route path="/mailbox/*" element={
            <ModalContainer>
              <Mailbox />
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
          <Route path="/mailbox/detail/:messageId" element={
            <ModalContainer {...{ isOverlayed: true }}>
              <Detail />
            </ModalContainer>
          } />
        </Routes>
        {/* <Footer/> */}
      </section>
    </Fragment>
  );
};

export default View;