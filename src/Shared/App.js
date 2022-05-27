import React from "react";
import { Route } from "react-router-dom";
import CreateDebate from "../Pages/CreateDebate";
import DebateRoom from "../Pages/DebateRoom";
import Main from "../Pages/Main";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configStore";
import UserCheck from "../Pages/UserCheck";
import Login from "../Pages/Login";
import KakaoLogin from "../Pages/KakaoLogin";
import Header from "../Shared/Header";
import Header2 from "../Shared/header2"
import SaveDebate from "../Pages/SaveDebate";
import UserProfile from "../Pages/UserProfile";
import DebateDetail from "../Pages/DebateDetail";
import LiveChat from "../Components/chat/LiveChat";
import jwt_decode from "jwt-decode";

// import Test from "../Pages/Test";


function App() {
  
  return (
    <React.Fragment>
      <ConnectedRouter history={history}>
        <Header></Header>
        <Route path="/" exact component ={Main}/>
        <Route path="/debate/:roomId" exact component ={DebateRoom}/>
        <Route path="/createRoom" exact component ={CreateDebate}/>
        <Route path="/userCheck/:roomId" exact component ={UserCheck}/>
        <Route path="/login" exact component={Login}/>
        <Route path="/user/kakao/callback" exact component={KakaoLogin}/>
        <Route path="/savedebate/:roomId" exact component={SaveDebate}/>
        <Route path="/userprofile/:useremail" exact component={UserProfile}/>
        <Route path="/detailed/:debateId" exact component={DebateDetail}/>
        <Route path="/livechat" exact component={LiveChat}/>
      </ConnectedRouter>
    </React.Fragment>
  );
}

export default App;
