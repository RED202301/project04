import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyles from "./styles/global";
import { ResetStyles } from "./styles";
import ScreenContainer from "./components/ScreenContainer";
import MobileScreen from "./components/MobileScreen";
import { Auth, Login, NotFound, View } from "./routes";
import users_api from "./api/users";
import { useSetRecoilState } from "recoil";
import myInfoState from "./recoil/myInfo";
import {useEffect} from "react"

const App: React.FC = () => {
  const setMyInfo = useSetRecoilState(myInfoState);
  const fetch_myInfo = async () => {
    const myInfo = await users_api.getUserByToken()
    if (myInfo) setMyInfo(myInfo);
  }

  useEffect(() => {
    fetch_myInfo()
  }, [])


  return (
    <React.Fragment>
      <ResetStyles/>
      <GlobalStyles />
      <ScreenContainer>
        <MobileScreen>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login/>}/>
              <Route path="/oauth/redirect" element={<Auth/>}/>
              <Route path="/view/:userId/*" element={<View/>}/>
              <Route path="/*" element={<NotFound/>}/>
            </Routes>
          </BrowserRouter>
        </MobileScreen>
      </ScreenContainer>
    </React.Fragment>
  )
}

export default App;
