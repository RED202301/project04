import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyles from "./styles/global";
import { ResetStyles } from "./styles";
import ScreenContainer from "./components/ScreenContainer";
import MobileScreen from "./components/MobileScreen";
import { Auth, Login, NotFound, View } from "./routes";
import MainArticle from "./routes/Article/MainArticle";
import CreateArticle from "./routes/Article/CreateArticle";
import Article from "./routes/Article/Article";
import UpdateArticle from "./routes/Article/UpdateArticle";

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
              <Route path="/article" element={<MainArticle/>}/>
              <Route path="/article/:id" element={<Article/>}/>
              <Route path="/article/Create" element={<CreateArticle/>}/>
              <Route path="/article/update/:id" element={<UpdateArticle/>}/>
              <Route path="/*" element={<NotFound/>}/>
              
            </Routes>
          </BrowserRouter>

        </MobileScreen>
      </ScreenContainer>
      
    </React.Fragment>
  )
}

export default App;
