import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { stateAtom } from "./recoil/stateAtom";
import Login from "./pages/Login/Login";
import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./pages/Login/NotFound";
import LoginRedirect from "./pages/Login/LoginRedirect";
import Rolling from "./pages/Rolling";
import RollingCreate from "./pages/RollingCreate";
import RollingDetail from "./pages/RollingDetail";
import Board from "./pages/Board/Board";

const App: React.FC = () => {
  const state = useRecoilValue(stateAtom).id
  return (
    <React.Fragment>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/oauth/redirect" element={<LoginRedirect />} />
        <Route path="/rolling" element={<PrivateRoute state={state} authenticated={1} component={[<Rolling key="Rolling-component"/>]}/>}/>
        <Route path="/rollingcreate" element={<PrivateRoute state={state} authenticated={1} component={[<RollingCreate key="Rollingcreate-component"/>]}/>}/>
        <Route path="/rollingdetail" element={<PrivateRoute state={state} authenticated={1} component={[<RollingDetail key="Rollingdetail-component"/>]}/>}/>
        <Route path="/board" element={<PrivateRoute state={state} authenticated={1} component={[<Board key="Board-component"/>]}/>}/>
        <Route path="/*" element={<NotFound key="notfound"/>} />
      </Routes>
      </Router>
    </React.Fragment>
  )
}

export default App;
