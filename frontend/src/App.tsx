import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { stateAtom } from "./recoil/stateAtom";
import Login from "./pages/Login/Login";
import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./pages/Login/NotFound";
import MainArticle from "./routes/Article/MainArticle";
import CreateArticle from "./routes/Article/CreateArticle";
import Article from "./routes/Article/Article";
import UpdateArticle from "./routes/Article/UpdateArticle";
import LoginRedirect from "./pages/Login/LoginRedirect";
import Rolling from "./pages/Rolling";
import RollingCreate from "./pages/RollingCreate";
import RollingDetail from "./pages/RollingDetail";
import AIphoto from "./routes/AIphoto/AIphoto";

const App: React.FC = () => {
  const state = useRecoilValue(stateAtom).id
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
              <Route path="/aiphoto" element={<AIphoto/>}/>
              <Route path="/*" element={<NotFound/>}/>
              
            </Routes>
          </BrowserRouter>

        </MobileScreen>
      </ScreenContainer>
      
    </React.Fragment>
  )
}

export default App;
