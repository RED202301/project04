import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyles from "./styles/global";
import { ResetStyles } from "./styles";
import ScreenContainer from "./components/ScreenContainer";
import MobileScreen from "./components/MobileScreen";
import { Auth, Login, NotFound, View } from "./routes";

const App: React.FC = () => {
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
              {/* <Route path="/article/*" element={<View/>}/> */}
              <Route path="/*" element={<NotFound/>}/>
              
            </Routes>
          </BrowserRouter>

        </MobileScreen>
      </ScreenContainer>
      
    </React.Fragment>
  )
}

export default App;
